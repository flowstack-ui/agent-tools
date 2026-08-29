import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, posix, relative, resolve } from "node:path";
import { assertPublicContent } from "./lib/public-boundary.mjs";

const root = resolve(import.meta.dirname, "..");
const sourceRoot = join(root, "sources");
const outputRoot = join(root, "public");
const checkOnly = process.argv.includes("--check");
const config = JSON.parse(await readFile(join(root, "config", "delivery.json"), "utf8"));
const lock = JSON.parse(await readFile(join(sourceRoot, "lock.json"), "utf8"));
const digest = (content) => createHash("sha256").update(content).digest("hex");
const outputs = new Map();
const routeRecords = [];
const packageRecords = [];

assert.equal(config.schema, "flowstack.agent-delivery-config.v1");
assert.equal(lock.schema, "flowstack.agent-source-lock.v1");
assert.deepEqual(lock.packages.map(({ id }) => id).sort(), config.packages.map(({ id }) => id).sort());

async function walk(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(path));
    else result.push(path);
  }
  return result;
}

function addOutput(path, content, metadata = null) {
  const normalized = posix.normalize(path);
  assert.ok(!normalized.startsWith("../") && normalized !== ".." && !outputs.has(normalized), `duplicate or escaping output: ${path}`);
  const final = content.endsWith("\n") ? content : `${content}\n`;
  outputs.set(normalized, final);
  if (metadata) routeRecords.push({ ...metadata, path: `/${normalized}`, bytes: Buffer.byteLength(final), sha256: digest(final) });
}

function normalizeSourceMarkdown(markdown) {
  return markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/gu, (match, label, target) => {
    if (/^(?:https?:|#)/u.test(target) || /^\/(?:packages|tasks)\//u.test(target)) return match;
    return `${label} [source reference: ${target}]`;
  });
}

function sourceText(name, version, kind, id, markdown, machine) {
  return `# ${machine.name ?? id}\n\nSource: ${name}@${version}\nKind: ${kind}\nID: ${id}\n\n${normalizeSourceMarkdown(markdown.trim())}\n\n## Machine record\n\n\`\`\`json\n${JSON.stringify(machine, null, 2)}\n\`\`\`\n`;
}

function agentPath(snapshot, manifestRelative) {
  const normalized = posix.normalize(manifestRelative.replace(/^\.\//u, ""));
  assert.ok(!normalized.startsWith("../") && normalized !== "..", `escaping manifest path: ${manifestRelative}`);
  return join(snapshot, "agents", normalized);
}

for (const locked of lock.packages) {
  const expected = config.packages.find(({ id }) => id === locked.id);
  assert.equal(locked.name, expected.name);
  assert.match(locked.version, /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u);
  assert.match(locked.archiveSha256, /^[a-f0-9]{64}$/u);
  const snapshot = join(sourceRoot, "packages", locked.id, locked.version);
  const actualPaths = (await walk(snapshot)).map((path) => relative(snapshot, path)).sort();
  assert.deepEqual(actualPaths, locked.snapshotFiles.map(({ path }) => path).sort(), `${locked.id} snapshot file inventory drifted`);
  for (const file of locked.snapshotFiles) {
    const content = await readFile(join(snapshot, file.path));
    assert.equal(content.length, file.bytes, `${locked.id}/${file.path} byte count drifted`);
    assert.equal(digest(content), file.sha256, `${locked.id}/${file.path} digest drifted`);
  }

  const packageJson = JSON.parse(await readFile(join(snapshot, "package.json"), "utf8"));
  const manifest = JSON.parse(await readFile(join(snapshot, "agents", "manifest.json"), "utf8"));
  const coverage = JSON.parse(await readFile(join(snapshot, "agents", "coverage.json"), "utf8"));
  assert.equal(packageJson.name, locked.name);
  assert.equal(packageJson.version, locked.version);
  assert.equal(manifest.package, locked.name);
  assert.equal(manifest.packageVersion, locked.version);
  assert.equal(coverage.package, locked.name);
  assert.equal(coverage.packageVersion, locked.version);
  assert.equal(coverage.summary.publicSurfaces, coverage.summary.classifiedPublicSurfaces);
  assert.equal(coverage.summary.unclassified, 0);
  assert.equal(coverage.summary.invalidExclusions, 0);
  assert.equal(coverage.summary.unresolvedSelections, 0);
  assert.deepEqual(coverage.failures, []);

  const base = `packages/${locked.id}/${locked.version}`;
  const links = [];
  for (const [kind, entries] of [
    ["guide", manifest.guides ?? []],
    ["component", manifest.components ?? []],
  ]) {
    for (const entry of entries) {
      const json = JSON.parse(await readFile(agentPath(snapshot, entry.json), "utf8"));
      const markdown = await readFile(agentPath(snapshot, entry.markdown), "utf8");
      assert.equal(json.id, entry.id);
      assert.equal(json.package, locked.name);
      const folder = kind === "guide" ? "guides" : "components";
      const path = `${base}/${folder}/${entry.id}.txt`;
      addOutput(path, sourceText(locked.name, locked.version, kind, entry.id, markdown, json), {
        package: locked.id, version: locked.version, kind, id: entry.id,
      });
      links.push({ kind, id: entry.id, name: entry.name, path: `/${path}` });
    }
  }

  const guideIds = new Set((manifest.guides ?? []).map(({ id }) => id));
  for (const entry of manifest.operations ?? []) {
    const guideName = posix.basename(entry.guide, ".json");
    assert.ok(guideIds.has(guideName), `${locked.id} operation ${entry.id} has an unresolved guide`);
    const record = (coverage.operations ?? []).find(({ id }) => id === entry.id);
    assert.ok(record && record.status === "covered", `${locked.id} operation ${entry.id} is not covered`);
    const guidePath = `/${base}/guides/${guideName}.txt`;
    const content = `# ${entry.name}\n\nSource: ${locked.name}@${locked.version}\nKind: operation\nID: ${entry.id}\nGuide: [${guideName}](${guidePath})\n\n## Covered public surfaces\n\n${(record.publicSurfaces ?? []).map((surface) => `- \`${surface}\``).join("\n")}\n`;
    const path = `${base}/operations/${entry.id}.txt`;
    addOutput(path, content, { package: locked.id, version: locked.version, kind: "operation", id: entry.id });
    links.push({ kind: "operation", id: entry.id, name: entry.name, path: `/${path}` });
  }

  assert.equal((manifest.registryItems ?? []).length, 0, `${locked.id} registry metadata is outside the public Agent Tools boundary`);

  const docsRoot = join(snapshot, "docs");
  for (const source of await walk(docsRoot).catch(() => [])) {
    if (!source.endsWith(".md")) continue;
    const id = relative(docsRoot, source).replace(/\.md$/u, "");
    const path = `${base}/docs/${id}.txt`;
    const markdown = await readFile(source, "utf8");
    addOutput(path, `# Public document: ${id}\n\nSource: ${locked.name}@${locked.version}\n\n${normalizeSourceMarkdown(markdown.trim())}\n`, {
      package: locked.id, version: locked.version, kind: "document", id,
    });
    links.push({ kind: "document", id, name: id, path: `/${path}` });
  }

  const grouped = Object.groupBy(links, ({ kind }) => kind);
  const packageSlice = `# ${locked.name}@${locked.version}\n\nArchive SHA-256: \`${locked.archiveSha256}\`\nCoverage: ${coverage.summary.classifiedPublicSurfaces}/${coverage.summary.publicSurfaces} public surfaces; zero failures.\n\n${Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([kind, entries]) => `## ${kind}\n\n${entries.sort((a, b) => a.id.localeCompare(b.id)).map((item) => `- [${item.name}](${item.path})`).join("\n")}`).join("\n\n")}\n`;
  assert.ok(Buffer.byteLength(packageSlice) <= config.budgets.packageSliceBytes, `${locked.id} package slice exceeds budget`);
  addOutput(`${base}/index.txt`, packageSlice, { package: locked.id, version: locked.version, kind: "package", id: locked.id });
  packageRecords.push({
    id: locked.id,
    name: locked.name,
    version: locked.version,
    archive: locked.archive,
    archiveBytes: locked.archiveBytes,
    archiveSha256: locked.archiveSha256,
    profile: locked.profile,
    coverage: {
      publicSurfaces: coverage.summary.publicSurfaces,
      classifiedPublicSurfaces: coverage.summary.classifiedPublicSurfaces,
      failures: coverage.failures.length,
    },
    counts: {
      guides: (manifest.guides ?? []).length,
      components: (manifest.components ?? []).length,
      operations: (manifest.operations ?? []).length,
    },
    route: `/${base}/index.txt`,
  });
}

for (const task of config.tasks) {
  assert.ok(Array.isArray(task.sections) && task.sections.length > 0, `${task.id} task has no explicit sections`);
  const seenPaths = new Set();
  const sections = task.sections.map((section) => {
    assert.ok(section.id && section.title && section.description && section.routes?.length > 0, `${task.id} has an incomplete section`);
    const selected = [];
    for (const selector of section.routes) {
      const kinds = selector.kinds ?? [selector.kind];
      assert.ok(selector.package && kinds.every(Boolean), `${task.id}/${section.id} has an incomplete route selector`);
      const available = routeRecords.filter((route) => route.package === selector.package
        && kinds.includes(route.kind)
        && (selector.all === true || selector.ids?.includes(route.id)));
      let matches;
      if (selector.all !== true) {
        assert.ok(Array.isArray(selector.ids) && selector.ids.length > 0, `${task.id}/${section.id} must list exact route IDs`);
        assert.deepEqual(available.map(({ id }) => id).sort(), [...selector.ids].sort(), `${task.id}/${section.id} has a missing or extra curated route`);
        matches = selector.ids.map((id) => available.find((route) => route.id === id));
      } else {
        matches = available.sort((a, b) => a.path.localeCompare(b.path));
      }
      assert.ok(matches.length > 0, `${task.id}/${section.id} selector resolved no routes`);
      selected.push(...matches);
    }
    for (const route of selected) {
      assert.ok(!seenPaths.has(route.path), `${task.id} selects ${route.path} more than once`);
      seenPaths.add(route.path);
    }
    return `## ${section.title}\n\n${section.description}\n\n${selected.map((route) => `- [${route.package}/${route.kind}/${route.id}](${route.path})`).join("\n")}`;
  });
  const content = `# FLOWSTACK task: ${task.id}\n\n${task.description}\n\nLoad only the routes required for the current job and preserve their exact package versions.\n\n${sections.join("\n\n")}\n`;
  assert.ok(Buffer.byteLength(content) <= config.budgets.taskSliceBytes, `${task.id} task slice exceeds budget`);
  addOutput(`tasks/${task.id}.txt`, content, { package: null, version: null, kind: "task", id: task.id });
}

const packageLinks = packageRecords.sort((a, b) => a.id.localeCompare(b.id)).map((record) => `- [${record.name}@${record.version}](${record.route}) — ${record.counts.components} components, ${record.counts.operations} operations`).join("\n");
const taskLinks = config.tasks.map(({ id, description }) => `- [${id}](/tasks/${id}.txt) — ${description}`).join("\n");
let llms = `# FLOWSTACK UI\n\nVersion-aware public Agent Knowledge. Start with a task or exact package; then load only the linked narrow owner routes.\n\n## Packages\n\n${packageLinks}\n\n## Tasks\n\n${taskLinks}\n`;
assert.ok(Buffer.byteLength(llms) <= config.budgets.llmsBytes, "llms.txt exceeds its budget");
addOutput("llms.txt", llms, { package: null, version: null, kind: "entrypoint", id: "llms" });

const index = {
  schema: "flowstack.agent-delivery-index.v1",
  packages: packageRecords,
  budgets: config.budgets,
  corpus: {
    llms: { path: "/llms.txt", bytes: Buffer.byteLength(llms), sha256: digest(llms) },
  },
  routes: routeRecords.sort((a, b) => a.path.localeCompare(b.path)),
};
addOutput("index.json", `${JSON.stringify(index, null, 2)}\n`);

const publicContent = [...outputs.values()].join("\n");
assertPublicContent(publicContent, "generated output");
const availableLinks = new Set([...outputs.keys()].map((path) => `/${path}`));
for (const [path, content] of outputs) {
  for (const match of content.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/gu)) {
    assert.ok(availableLinks.has(match[1]), `${path} has a broken generated link to ${match[1]}`);
  }
}

async function exactFiles(directory) {
  return (await walk(directory).catch(() => [])).map((path) => relative(directory, path)).sort();
}
if (checkOnly) {
  assert.deepEqual(await exactFiles(outputRoot), [...outputs.keys()].sort(), "public contains missing or extra generated files");
  for (const [path, content] of outputs) assert.equal(await readFile(join(outputRoot, path), "utf8"), content, `${path} is stale`);
} else {
  await rm(outputRoot, { recursive: true, force: true });
  for (const [path, content] of outputs) {
    await mkdir(dirname(join(outputRoot, path)), { recursive: true });
    await writeFile(join(outputRoot, path), content);
  }
}

console.log(`${checkOnly ? "Verified" : "Built"} ${packageRecords.length} exact packages, ${routeRecords.length} routes, llms.txt ${Buffer.byteLength(llms)} bytes; llms-full omitted pending utility qualification.`);
