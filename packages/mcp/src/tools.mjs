import assert from "node:assert/strict";
import { PACKAGES, SERVER_PACKAGE, SERVER_VERSION } from "./constants.mjs";
import { assertPublicRequest, assertPublicResponse, publicErrorMessage } from "./privacy.mjs";

function envelope(handle, data, extra = {}) {
  return {
    package: handle?.name ?? SERVER_PACKAGE,
    layer: handle?.layer ?? "delivery",
    version: handle?.version ?? SERVER_VERSION,
    provenance: handle?.provenance ?? { package: SERVER_PACKAGE, layer: "delivery", version: SERVER_VERSION, source: "mcp-runtime" },
    ...extra,
    data
  };
}

function manifestEntries(manifest) {
  return [
    ...(manifest.components ?? []).map((entry) => ({ ...entry, ownerKind: "component" })),
    ...(manifest.operations ?? []).map((entry) => ({ ...entry, ownerKind: "operation" }))
  ];
}

function allEntries(manifest) {
  return [...(manifest.guides ?? []).map((entry) => ({ ...entry, ownerKind: "guide" })), ...manifestEntries(manifest)];
}

function artifactPath(handle, entry, key) {
  const value = entry[key];
  assert.equal(typeof value, "string", `${entry.id} has no ${key} artifact`);
  return `${handle.agentRoot}/${value.replace(/^\.\//u, "")}`;
}

async function manifest(handle) {
  const value = await handle.readJson(`${handle.agentRoot}/manifest.json`);
  assert.equal(value.package, handle.name);
  assert.equal(value.packageVersion, handle.version);
  return value;
}

async function coverage(handle) {
  const value = await handle.readJson(`${handle.agentRoot}/coverage.json`);
  assert.equal(value.package, handle.name);
  assert.equal(value.packageVersion, handle.version);
  assert.deepEqual(value.failures, []);
  return value;
}

function tokens(value) {
  return new Set(value.toLowerCase().split(/[^a-z0-9]+/u).filter((token) => token.length > 2));
}

function score(query, candidate) {
  const wanted = tokens(query);
  const found = tokens(candidate);
  let total = 0;
  for (const token of wanted) if (found.has(token)) total += 1;
  return total;
}

function intentMatch(query, selection) {
  const positive = `${selection.intent ?? ""} ${selection.use ?? ""}`.trim();
  const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9]+/gu, " ").trim();
  const normalizedPositive = positive.toLowerCase().replace(/[^a-z0-9]+/gu, " ").trim();
  const overlap = score(query, positive);
  const queryTokens = tokens(query);
  const coverage = queryTokens.size ? overlap / queryTokens.size : 0;
  const exactPhrase = normalizedQuery.length >= 4 && normalizedPositive.includes(normalizedQuery);
  const meaningful = exactPhrase || (overlap >= 2 && coverage >= 0.4);
  return meaningful ? { relevance: exactPhrase ? Math.max(overlap, 2) : overlap, confidence: exactPhrase ? 1 : Number(coverage.toFixed(3)) } : undefined;
}

function intentId(guideId, selectionIndex, selection) {
  const slug = String(selection.intent ?? "intent").toLowerCase().replace(/[^a-z0-9]+/gu, "-").replace(/^-|-$/gu, "").slice(0, 64);
  return `${guideId}:${selectionIndex + 1}:${slug}`;
}

async function publicMarkdown(handle) {
  const agentDocs = allEntries(await manifest(handle)).map((entry) => artifactPath(handle, entry, "markdown"));
  if (handle.source === "locked-source") {
    const entry = handle.lockEntry;
    const allowlisted = entry.snapshotFiles.map(({ path }) => path).filter((path) => path.endsWith(".md") && (path === "README.md" || path === "CHANGELOG.md" || path.startsWith("docs/") || agentDocs.includes(path)));
    return [...new Set(allowlisted)].sort();
  }
  const explicitlyPackedDocs = (handle.metadata.files ?? []).filter((path) => typeof path === "string" && path.endsWith(".md") && (path.startsWith("docs/") || path === "README.md" || path === "CHANGELOG.md"));
  return [...new Set(["README.md", "CHANGELOG.md", ...explicitlyPackedDocs, ...agentDocs])].sort();
}

function fencedCode(markdown) {
  const blocks = [];
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  let open;
  for (const line of lines) {
    if (!open) {
      const match = line.match(/^\s*(`{3,}|~{3,})\s*([^\s]*)\s*$/u);
      if (match) open = { marker: match[1][0], length: match[1].length, language: match[2].toLowerCase(), lines: [] };
      continue;
    }
    const closing = new RegExp(`^\\s*${open.marker === "`" ? "`" : "~"}{${open.length},}\\s*$`, "u");
    if (closing.test(line)) {
      blocks.push({ language: open.language, code: open.lines.join("\n").trim() });
      open = undefined;
    } else open.lines.push(line);
  }
  return blocks;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

function canonicalExample(block, handle, owner) {
  if (!/^(?:|js|jsx|ts|tsx|javascript|typescript)$/u.test(block.language)) return false;
  const symbols = owner.publicValueSymbols?.length ? owner.publicValueSymbols : owner.publicSymbols ?? [];
  const allowedSpecifiers = new Set([handle.name, ...(owner.publicSubpaths ?? []).map((subpath) => `${handle.name}/${subpath.slice(2)}`)]);
  const locals = new Set();
  const namedImport = /import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/gu;
  for (const match of block.code.matchAll(namedImport)) {
    if (!allowedSpecifiers.has(match[2])) continue;
    for (const specifier of match[1].split(",")) {
      const parsed = specifier.trim().match(/^([A-Za-z_$][\w$]*)(?:\s+as\s+([A-Za-z_$][\w$]*))?$/u);
      if (parsed && symbols.includes(parsed[1])) locals.add(parsed[2] ?? parsed[1]);
    }
  }
  const namespaceImport = /import\s*\*\s*as\s*([A-Za-z_$][\w$]*)\s*from\s*["']([^"']+)["']/gu;
  for (const match of block.code.matchAll(namespaceImport)) if (allowedSpecifiers.has(match[2])) for (const symbol of symbols) locals.add(`${match[1]}.${symbol}`);
  return [...locals].some((local) => new RegExp(`<${escapeRegExp(local)}(?:\\s|/|>)`, "u").test(block.code));
}

function relationExists(relationships, type, left, right) {
  return relationships.some((relationship) => relationship.type === type && ((relationship.from === left && relationship.to === right) || (type === "siblings" && relationship.from === right && relationship.to === left)));
}

function ruleResult(rule, status, message, evidence = []) {
  return { id: rule.id, severity: rule.level, status, message, evidence, statement: rule.statement };
}

function evaluateRule(rule, composition) {
  const part = (pattern) => composition.parts.find(({ component }) => pattern.test(component));
  if (/-css$/u.test(rule.id) || /load (?:styles|core).*\.css/iu.test(rule.statement)) {
    const hasBase = composition.styles.some((style) => /(?:^|\/)(?:styles|core)\.css$/u.test(style));
    const named = rule.statement.match(/plus ([a-z0-9-]+\.css)/iu)?.[1];
    const hasNamed = !named || composition.styles.some((style) => style.endsWith(named));
    return ruleResult(rule, hasBase && hasNamed ? "pass" : "fail", hasBase && hasNamed ? "Required CSS routes are present." : `Missing ${!hasBase ? "styles.css or core.css" : named}.`, composition.styles);
  }
  if (/accessible-name/u.test(rule.id)) {
    const target = part(/(?:Content|Root|Button|Link)$/u) ?? composition.parts[0];
    const named = target && (typeof target.props["aria-label"] === "string" || typeof target.props["aria-labelledby"] === "string" || composition.relationships.some((relationship) => relationship.type === "labels" && relationship.to === target.id));
    return ruleResult(rule, named ? "pass" : "fail", named ? "A structured native or relationship label is present." : "No aria-label, aria-labelledby, or labels relationship names the owner.");
  }
  if (/sibling-overlay/u.test(rule.id)) {
    const overlay = part(/Overlay$/u);
    const content = part(/Content$/u);
    if (!overlay) return ruleResult(rule, "not-applicable", "No Overlay part was supplied; the conditional sibling invariant does not apply.");
    if (!content) return ruleResult(rule, "fail", "Overlay is present without Content.");
    const siblings = relationExists(composition.relationships, "siblings", overlay.id, content.id);
    return ruleResult(rule, siblings ? "pass" : "fail", siblings ? "Overlay and Content are declared siblings." : "Overlay and Content lack a siblings relationship.");
  }
  if (/one-child/u.test(rule.id)) {
    const owner = composition.parts.find(({ component }) => component === "NotificationBadge");
    const wrapped = owner ? composition.relationships.filter(({ type, from }) => type === "wraps" && from === owner.id) : [];
    return ruleResult(rule, owner && wrapped.length === 1 ? "pass" : "fail", owner && wrapped.length === 1 ? "NotificationBadge wraps exactly one structured child." : "NotificationBadge must wrap exactly one structured child.");
  }
  if (/badge-mode$/u.test(rule.id)) {
    const badge = composition.parts.find(({ component }) => component === "NotificationBadge");
    if (!badge) return ruleResult(rule, "fail", "NotificationBadge part is absent.");
    const dot = badge.props.dot === true;
    const count = badge.props.count;
    const countValid = Number.isInteger(count) && count >= 0;
    const valid = dot ? count === undefined : countValid;
    return ruleResult(rule, valid ? "pass" : "fail", valid ? "Exactly one valid dot/count mode is structured." : "Choose dot=true without count, or a finite non-negative integer count.");
  }
  return ruleResult(rule, "manual", "This canonical rule is not deterministically checkable from the supplied structure; manual review is required.");
}

export class FlowstackTools {
  constructor(repository) { this.repository = repository; }

  async invoke(method, input) {
    try {
      assertPublicRequest(input);
      const data = await this[method](input);
      assertPublicResponse(data);
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }], structuredContent: data };
    } catch (error) {
      const attempted = {
        toolMethod: method,
        package: typeof input?.package === "string" ? input.package : undefined,
        workflow: typeof input?.workflow === "string" ? input.workflow : undefined,
        version: typeof input?.version === "string" ? input.version : undefined,
        versions: input?.versions,
        source: input?.source ?? "auto"
      };
      const data = envelope(undefined, null, { attempted, error: { code: "FLOWSTACK_MCP_ERROR", message: publicErrorMessage(error) } });
      assertPublicResponse(data);
      return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }], structuredContent: data, isError: true };
    }
  }

  async listPackages() {
    const packages = await this.repository.availablePackages();
    return envelope(undefined, packages, { availability: packages.length ? "available" : "unavailable" });
  }

  async listComponents({ package: packageId, version, source = "auto", query }) {
    const handle = await this.repository.resolvePackage(packageId, version, source);
    const value = await manifest(handle);
    const report = await coverage(handle);
    let entries = manifestEntries(value);
    if (query) entries = entries.filter((entry) => JSON.stringify(entry).toLowerCase().includes(query.toLowerCase()));
    return envelope(handle, entries.map(({ id, name, ownerKind }) => ({ package: handle.name, layer: handle.layer, version: handle.version, provenance: handle.provenance, id, name, kind: ownerKind })), {
      coverage: {
        schema: report.schema,
        package: report.package,
        packageVersion: report.packageVersion,
        profile: report.profile,
        summary: report.summary,
        failures: report.failures
      }
    });
  }

  async resolveInterfaceJob({ workflow, job, versions, source = "auto" }) {
    const workflows = {
      finished: { required: "brick", packages: ["brick"], guides: { brick: "layer-selection" } },
      headless: { required: "atom", packages: ["atom"], guides: { atom: "layer-selection" } },
      theming: { required: "theme", packages: ["colors", "theme"], guides: { colors: "colors-system", theme: "theme-system" } }
    };
    const route = workflows[workflow];
    assert.ok(route, `unknown workflow ${workflow}`);
    assert.ok(versions[route.required], `${workflow} workflow requires exact ${PACKAGES[route.required].name} version; cross-layer substitution is forbidden`);
    const matches = [];
    for (const id of route.packages) {
      if (!versions[id]) continue;
      const handle = await this.repository.resolvePackage(id, versions[id], source);
      const value = await manifest(handle);
      const guideEntry = value.guides?.find(({ id: guideId }) => guideId === route.guides[id]);
      assert.ok(guideEntry, `${handle.name}@${handle.version} lacks required workflow guide ${route.guides[id]}`);
      const guide = await handle.readJson(artifactPath(handle, guideEntry, "json"));
      for (let selectionIndex = 0; selectionIndex < (guide.selection ?? []).length; selectionIndex += 1) {
        const selection = guide.selection[selectionIndex];
        const ranked = intentMatch(job, selection);
        if (ranked) matches.push({ package: handle.name, layer: handle.layer, version: handle.version, provenance: handle.provenance, guide: guide.id, selectionId: `${guide.id}:${selectionIndex + 1}`, intentId: intentId(guide.id, selectionIndex, selection), selectionIndex, ...ranked, ...selection });
      }
    }
    matches.sort((a, b) => b.relevance - a.relevance || route.packages.indexOf(Object.values(PACKAGES).find(({ name }) => name === a.package).id) - route.packages.indexOf(Object.values(PACKAGES).find(({ name }) => name === b.package).id) || a.selectionIndex - b.selectionIndex);
    const selected = matches.slice(0, 10);
    if (workflow === "finished" && selected.length && versions.atom) {
      const brick = await this.repository.resolvePackage("brick", versions.brick, source);
      const brickManifest = await manifest(brick);
      const atom = await this.repository.resolvePackage("atom", versions.atom, source);
      const atomOwners = new Set((await manifest(atom)).components?.map(({ id }) => id) ?? []);
      for (const match of selected) {
        const behavior = [];
        for (const destination of match.destinations ?? []) {
          if (destination.kind !== "component") continue;
          const entry = brickManifest.components?.find(({ id }) => id === destination.id);
          if (!entry) continue;
          const guide = await brick.readJson(artifactPath(brick, entry, "json"));
          for (const related of guide.related ?? []) {
            if (typeof related === "object" && related.package === atom.name && atomOwners.has(related.id)) behavior.push({ package: atom.name, layer: atom.layer, version: atom.version, provenance: atom.provenance, id: related.id, relationship: "linked-behavior" });
          }
        }
        match.linkedBehavior = behavior;
      }
    }
    return envelope(undefined, selected, {
      workflow,
      job,
      provenance: { package: SERVER_PACKAGE, layer: "delivery", version: SERVER_VERSION, source: "exact package selection maps", exactVersions: versions },
      availability: selected.length ? "available" : "selection-gap"
    });
  }

  async getPackageGuide({ package: packageId, version, source = "auto", guide }) {
    const handle = await this.repository.resolvePackage(packageId, version, source);
    const entry = (await manifest(handle)).guides?.find(({ id }) => id === guide);
    assert.ok(entry, `${handle.name}@${version} has no package guide ${guide}`);
    return envelope(handle, { id: entry.id, structured: await handle.readJson(artifactPath(handle, entry, "json")), markdown: await handle.readArtifact(artifactPath(handle, entry, "markdown")) });
  }

  async getComponentGuidance({ package: packageId, version, source = "auto", id }) {
    const handle = await this.repository.resolvePackage(packageId, version, source);
    const entry = manifestEntries(await manifest(handle)).find(({ id: ownerId }) => ownerId === id);
    assert.ok(entry, `${handle.name}@${version} has no public component, operation, or Block owner ${id}`);
    return envelope(handle, { id: entry.id, kind: entry.ownerKind, structured: await handle.readJson(artifactPath(handle, entry, "json")), markdown: await handle.readArtifact(artifactPath(handle, entry, "markdown")) });
  }

  async getComponentProps({ package: packageId, version, source = "auto", component }) {
    const handle = await this.repository.resolvePackage(packageId, version, source);
    assert.ok(["atom", "brick"].includes(handle.id), "props apply only to Atom and Brick component packages");
    const owner = (await coverage(handle)).components?.find(({ id }) => id === component);
    assert.ok(owner, `${handle.name}@${version} has no canonical component owner ${component}`);
    const mappings = (owner.publicSubpaths ?? []).map((subpath) => ({ subpath, exported: handle.metadata.exports?.[subpath] }));
    if (handle.source === "locked-source") return envelope(handle, { component, availability: "unavailable", canonicalMapping: { publicSubpaths: owner.publicSubpaths, publicSymbols: owner.publicSymbols }, reason: "The locked public corpus does not include declaration files; use the exact installed package or extend canonical archive ingestion." });
    const mapped = mappings.find(({ exported }) => typeof exported === "object" && typeof exported.types === "string");
    if (!mapped) return envelope(handle, { component, availability: "unavailable", canonicalMapping: { publicSubpaths: owner.publicSubpaths, publicSymbols: owner.publicSymbols }, reason: "No canonical public export route for this owner exposes declarations." });
    return envelope(handle, { component, availability: "available", canonicalMapping: { publicSubpath: mapped.subpath, publicSymbols: owner.publicSymbols }, artifact: mapped.exported.types, declarations: await handle.readArtifact(mapped.exported.types) });
  }

  async getComponentExamples({ package: packageId, version, source = "auto", component, limit = 5 }) {
    const handle = await this.repository.resolvePackage(packageId, version, source);
    const owner = (await coverage(handle)).components?.find(({ id }) => id === component);
    assert.ok(owner, `${handle.name}@${version} has no canonical component owner ${component}`);
    const found = [];
    for (const path of await publicMarkdown(handle)) {
      let markdown;
      try { markdown = await handle.readArtifact(path); } catch { continue; }
      for (const block of fencedCode(markdown)) {
        if (!canonicalExample(block, handle, owner)) continue;
        found.push({ artifact: path, language: block.language || "text", code: block.code });
        if (found.length >= limit) break;
      }
      if (found.length >= limit) break;
    }
    return envelope(handle, found.length ? { component, availability: "available", canonicalMapping: { publicSubpaths: owner.publicSubpaths, publicSymbols: owner.publicSymbols }, examples: found } : { component, availability: "unavailable", canonicalMapping: { publicSubpaths: owner.publicSubpaths, publicSymbols: owner.publicSymbols }, examples: [], reason: "No allowlisted public fenced example canonically imports and renders this owner in the exact artifacts." });
  }

  async getThemeContract({ version, source = "auto" }) {
    const handle = await this.repository.resolvePackage("brick", version, source);
    if (handle.source === "locked-source") return envelope(handle, { availability: "unavailable", reason: "The locked public corpus does not include theme-contract.json; use exact installed Brick or extend canonical archive ingestion." });
    const route = handle.metadata.exports?.["./theme-contract.json"];
    assert.equal(typeof route, "string", `${handle.name}@${version} has no exported theme contract`);
    return envelope(handle, { availability: "available", artifact: route, contract: await handle.readJson(route) });
  }

  async searchDocs({ package: packageId, version, source = "auto", query, limit = 10 }) {
    const handle = await this.repository.resolvePackage(packageId, version, source);
    const results = [];
    const lower = query.toLowerCase();
    for (const path of await publicMarkdown(handle)) {
      let content;
      try { content = await handle.readArtifact(path); } catch { continue; }
      const lines = content.split("\n");
      for (let index = 0; index < lines.length; index += 1) {
        if (!lines[index].toLowerCase().includes(lower)) continue;
        results.push({ artifact: path, line: index + 1, excerpt: lines[index].trim().slice(0, 500) });
        if (results.length >= limit) return envelope(handle, results);
      }
    }
    return envelope(handle, results, { availability: results.length ? "available" : "no-matches" });
  }

  async validateComposition({ package: packageId, version, source = "auto", owner, composition }) {
    const handle = await this.repository.resolvePackage(packageId, version, source);
    const value = await manifest(handle);
    const entry = manifestEntries(value).find(({ id }) => id === owner);
    assert.ok(entry, `${handle.name}@${version} has no exact owner ${owner}`);
    const guide = await handle.readJson(artifactPath(handle, entry, "json"));
    const report = await coverage(handle);
    const canonicalSymbols = new Set((report.components ?? []).flatMap(({ publicSymbols }) => publicSymbols ?? []));
    const findings = [];
    const partIds = new Set();
    if (composition.parts.length === 0) findings.push({ severity: "error", code: "absent-anatomy", message: "No structured parts were supplied; composition cannot be valid." });
    for (const part of composition.parts) {
      if (partIds.has(part.id)) findings.push({ severity: "error", code: "duplicate-part", part: part.id, message: `Duplicate part id ${part.id}.` });
      partIds.add(part.id);
      if (!canonicalSymbols.has(part.component)) findings.push({ severity: "error", code: "unknown-public-symbol", part: part.id, component: part.component, message: `${part.component} is not a canonical public symbol in ${handle.name}@${version}.` });
    }
    for (const relationship of composition.relationships) {
      if (!partIds.has(relationship.from) || !partIds.has(relationship.to)) findings.push({ severity: "error", code: "unknown-relationship-part", relationship, message: "Relationship endpoints must name supplied structured parts." });
    }
    if (handle.id === "brick") {
      for (const specifier of composition.imports) if (specifier === "@flowstack-ui/atom" || specifier.startsWith("@flowstack-ui/atom/")) findings.push({ severity: "error", code: "direct-atom-import", message: "Finished Brick compositions must not bypass Brick with direct Atom imports." });
    }
    const rules = (guide.rules ?? []).map((rule) => evaluateRule(rule, composition));
    const manual = rules.filter(({ status }) => status === "manual");
    const failures = rules.filter(({ status }) => status === "fail");
    const valid = findings.every(({ severity }) => severity !== "error") && failures.length === 0 && !manual.some(({ severity }) => severity === "must");
    return envelope(handle, { owner, valid, status: valid ? "verified" : failures.length || findings.some(({ severity }) => severity === "error") ? "invalid" : "requires-manual-review", canonicalComposition: guide.composition ?? [], structuredComposition: composition, rules, manualValidations: manual, guideValidations: guide.validation ?? [], findings });
  }

  async createGapReport(input) {
    const handle = await this.repository.resolvePackage(input.package, input.version, input.source ?? "auto");
    const value = await manifest(handle);
    const entries = allEntries(value);
    const exactOwners = new Set(entries.map(({ id }) => id));
    const selectionOwners = new Set();
    const selectionArtifacts = new Map();
    for (const guideEntry of value.guides ?? []) {
      const guide = await handle.readJson(artifactPath(handle, guideEntry, "json"));
      for (const selection of guide.selection ?? []) for (const destination of selection.destinations ?? []) if (destination.id) {
        selectionOwners.add(destination.id);
        const paths = selectionArtifacts.get(destination.id) ?? new Set();
        paths.add(artifactPath(handle, guideEntry, "json"));
        paths.add(artifactPath(handle, guideEntry, "markdown"));
        selectionArtifacts.set(destination.id, paths);
      }
    }
    for (const searched of input.searchedOwners) assert.ok(exactOwners.has(searched) || selectionOwners.has(searched), `${searched} is not an exact manifest owner or package selection destination in ${handle.name}@${handle.version}`);
    const artifacts = new Map(entries.map((entry) => [entry.id, new Set([artifactPath(handle, entry, "json"), artifactPath(handle, entry, "markdown")])]));
    for (const evidence of input.evidence) {
      assert.ok(input.searchedOwners.includes(evidence.owner), `evidence owner ${evidence.owner} was not listed in searchedOwners`);
      const expected = artifacts.get(evidence.owner) ?? selectionArtifacts.get(evidence.owner);
      assert.ok(expected?.has(evidence.artifact), `evidence artifact ${evidence.artifact} does not belong to ${evidence.owner}`);
    }
    for (const searched of input.searchedOwners) assert.ok(input.evidence.some(({ owner }) => owner === searched), `searched owner ${searched} requires at least one exact artifact evidence entry`);
    const findings = [];
    const fallbackOwner = input.fallback.owner.toLowerCase();
    if (handle.id === "brick" && fallbackOwner === "atom") findings.push({ severity: "error", code: "brick-direct-atom-fallback", message: "A Brick gap report cannot recommend a direct Atom fallback." });
    if (handle.id === "brick" && input.proposedOwner === "atom") findings.push({ severity: "error", code: "unsafe-proposed-owner", message: "Brick gaps route through Brick's Atom-first ownership workflow, not a consumer direct-Atom owner." });
    if (input.fallback.owner !== input.proposedOwner) findings.push({ severity: "warning", code: "fallback-owner-mismatch", message: "The structured fallback owner differs from the proposed owner." });
    if (input.proposedOwner === "blueprint") findings.push({ severity: "warning", code: "unavailable-public-owner", message: "No public Blueprint package is available, so this proposed owner remains unverified." });
    return envelope(handle, {
      schema: "flowstack.agent-gap-report.v1",
      interfaceJob: input.interfaceJob,
      searchedOwners: input.searchedOwners,
      evidence: input.evidence,
      missingCapability: input.missingCapability,
      proposedOwner: input.proposedOwner,
      fallback: input.fallback,
      verification: input.verification,
      structuralValidation: findings.every(({ severity }) => severity !== "error"),
      claimValidation: { status: "not-semantically-verified", message: "Artifact linkage and ownership structure were checked; free-form findings and capability claims were preserved as submitted evidence, not treated as semantic proof." },
      findings,
      status: findings.length ? "evidence-linked-proposal" : "structurally-verified"
    });
  }
}
