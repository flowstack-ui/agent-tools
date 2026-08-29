import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { lstat, mkdir, mkdtemp, readFile, readdir, readlink, realpath, rm, symlink, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const skillsRoot = join(root, "skills");
const skillNames = [
  "flowstack-ui-builder",
  "flowstack-ui-compose",
  "flowstack-ui-maintainer",
  "flowstack-ui-review",
];

test("exposes the same four skills through standard discovery aliases and a skills-only plugin", async () => {
  const aliasesRoot = join(root, ".agents", "skills");
  const plugin = JSON.parse(await readFile(join(root, ".codex-plugin", "plugin.json"), "utf8"));
  const packageJson = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

  assert.equal(plugin.name, "flowstack-ui");
  assert.equal(plugin.version, packageJson.version);
  assert.equal(plugin.license, packageJson.license);
  assert.equal(plugin.homepage, packageJson.homepage);
  assert.equal(plugin.repository, packageJson.repository.url.replace(/^git\+/u, "").replace(/\.git$/u, ""));
  assert.equal(plugin.author.name, "FLOWSTACK UI");
  assert.equal(plugin.skills, "./skills/");
  assert.equal("mcpServers" in plugin, false);
  assert.equal("apps" in plugin, false);
  assert.equal("hooks" in plugin, false);
  assert.deepEqual(plugin.interface.capabilities, ["Skills"]);
  assert.ok(plugin.interface.defaultPrompt.length > 0 && plugin.interface.defaultPrompt.length <= 3);
  assert.equal(plugin.interface.defaultPrompt.every((prompt) => typeof prompt === "string" && prompt.length > 0 && prompt.length <= 128), true);
  assert.deepEqual((await readdir(aliasesRoot)).sort(), skillNames);

  for (const name of skillNames) {
    const alias = join(aliasesRoot, name);
    assert.equal((await lstat(alias)).isSymbolicLink(), true);
    assert.equal(await readlink(alias), `../../skills/${name}`);
    assert.equal(await realpath(alias), await realpath(join(skillsRoot, name)));
  }
});

test("ships exactly four self-contained skills with one byte-identical resolver authority", async () => {
  assert.deepEqual((await readdir(skillsRoot)).sort(), skillNames);
  let resolverAuthority;
  for (const name of skillNames) {
    const directory = join(skillsRoot, name);
    assert.deepEqual((await filesBelow(directory)).sort(), ["SKILL.md", "agents/openai.yaml", "scripts/resolve-agent-knowledge.mjs"]);
    const skill = await readFile(join(directory, "SKILL.md"), "utf8");
    const metadata = await readFile(join(directory, "agents", "openai.yaml"), "utf8");
    const resolver = await readFile(join(directory, "scripts", "resolve-agent-knowledge.mjs"));
    assert.match(skill, new RegExp(`^---\\nname: ${name}\\n`, "u"));
    assert.match(skill, /exact `--version` whenever|also pass its exact `--version`/u);
    assert.doesNotMatch(`${skill}\n${metadata}`, /(?:TODO|\[TODO|allow_implicit_invocation:\s*false)/u);
    assert.match(metadata, new RegExp(`\\$${name}\\b`, "u"));
    resolverAuthority ??= resolver;
    assert.deepEqual(resolver, resolverAuthority);
  }
});

test("every skill resolves a closed installed component package and selected owner", async () => {
  const fixture = await createInstalledFixture();
  try {
    for (const name of skillNames) {
      const result = runResolver(name, fixture, ["--package", "@flowstack-ui/brick", "--kind", "component", "--id", "button"]);
      assert.equal(result.status, 0, result.stderr);
      const resolution = JSON.parse(result.stdout);
      assert.equal(resolution.source, "installed-package");
      assert.equal(resolution.version, "1.2.3");
      assert.equal(resolution.sourceIdentity.kind, "installed-package");
      assert.equal(resolution.sourceIdentity.archiveSha256, null);
      assert.equal(resolution.packageGuides[0].id, "layer-selection");
      assert.deepEqual({ package: resolution.selected.package, kind: resolution.selected.kind, id: resolution.selected.id }, { package: "@flowstack-ui/brick", kind: "component", id: "button" });
    }
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test("requires an explicit exact version without an installed package and rejects unknown or duplicate flags", async () => {
  const delivery = await createDeliveryFixture();
  try {
    for (const [args, pattern] of [
      [["--package", "@flowstack-ui/brick", "--agent-tools", delivery.agentToolsRoot], /--version is required/u],
      [["--package", "@flowstack-ui/brick", "--version", "^1.2.3", "--agent-tools", delivery.agentToolsRoot], /one exact package version/u],
      [["--package", "@flowstack-ui/brick", "--wat", "value"], /unknown flag/u],
      [["--package", "@flowstack-ui/brick", "--package", "@flowstack-ui/atom"], /duplicate flag/u],
    ]) {
      const result = runResolver("flowstack-ui-builder", delivery.fixture, args);
      assert.notEqual(result.status, 0);
      assert.match(result.stderr, pattern);
    }
  } finally {
    await rm(delivery.fixture, { recursive: true, force: true });
  }
});

test("pins locked resolution to one archive digest and reports its source identity", async () => {
  const delivery = await createDeliveryFixture();
  const installed = await createInstalledFixture({ version: "1.2.2" });
  try {
    const exact = runResolver("flowstack-ui-maintainer", delivery.fixture, [
      "--package", "@flowstack-ui/brick",
      "--version", "1.2.3",
      "--archive-sha256", delivery.archiveSha256,
      "--agent-tools", delivery.agentToolsRoot,
    ]);
    assert.equal(exact.status, 0, exact.stderr);
    const resolution = JSON.parse(exact.stdout);
    assert.deepEqual(resolution.sourceIdentity, { kind: "locked-archive", archiveSha256: delivery.archiveSha256 });

    const wrong = runResolver("flowstack-ui-review", delivery.fixture, [
      "--package", "@flowstack-ui/brick",
      "--version", "1.2.3",
      "--archive-sha256", "b".repeat(64),
      "--agent-tools", delivery.agentToolsRoot,
    ]);
    assert.notEqual(wrong.status, 0);
    assert.match(wrong.stderr, /archive digest does not match/u);

    const malformed = runResolver("flowstack-ui-review", delivery.fixture, [
      "--package", "@flowstack-ui/brick",
      "--version", "1.2.3",
      "--archive-sha256", "ABC123",
      "--agent-tools", delivery.agentToolsRoot,
    ]);
    assert.notEqual(malformed.status, 0);
    assert.match(malformed.stderr, /lowercase SHA-256 digest/u);

    const installedDelivery = await createDeliveryFixture({ fixture: installed });
    const pinnedOverInstalled = runResolver("flowstack-ui-maintainer", installed, [
      "--package", "@flowstack-ui/brick",
      "--version", "1.2.3",
      "--archive-sha256", installedDelivery.archiveSha256,
      "--agent-tools", installedDelivery.agentToolsRoot,
    ]);
    assert.equal(pinnedOverInstalled.status, 0, pinnedOverInstalled.stderr);
    assert.equal(JSON.parse(pinnedOverInstalled.stdout).source, "agent-tools-route");

    const unpinnedMismatch = runResolver("flowstack-ui-maintainer", installed, [
      "--package", "@flowstack-ui/brick",
      "--version", "1.2.3",
      "--agent-tools", installedDelivery.agentToolsRoot,
    ]);
    assert.notEqual(unpinnedMismatch.status, 0);
    assert.match(unpinnedMismatch.stderr, /installed @flowstack-ui\/brick@1\.2\.2 does not match requested 1\.2\.3/u);
  } finally {
    await rm(delivery.fixture, { recursive: true, force: true });
    await rm(installed, { recursive: true, force: true });
  }
});

test("accepts complete public component and operation coverage profiles", async () => {
  for (const [profile, selection] of [
    ["component-package", ["component", "button"]],
    ["operation-package", ["operation", "compile"]],
  ]) {
    const fixture = await createInstalledFixture({ profile });
    try {
      const result = runResolver("flowstack-ui-builder", fixture, ["--package", "@flowstack-ui/brick", "--kind", selection[0], "--id", selection[1]]);
      assert.equal(result.status, 0, `${profile}: ${result.stderr}`);
      assert.equal(JSON.parse(result.stdout).selected.kind, selection[0]);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  }
});

test("rejects private source-registry profiles", async () => {
  const fixture = await createInstalledFixture({ profile: "source-registry" });
  try {
    const result = runResolver("flowstack-ui-builder", fixture, ["--package", "@flowstack-ui/brick"]);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /unsupported coverage profile/u);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});

test("rejects every base and profile-specific closure mismatch", async () => {
  const cases = [
    ["component-package", { classifiedPublicSurfaces: 3 }, /publicSurfaces and classifiedPublicSurfaces/u],
    ["component-package", { guidedComponentOwners: 0 }, /componentOwners and guidedComponentOwners/u],
    ["component-package", { unclassified: 1 }, /unclassified/u],
    ["component-package", { invalidExclusions: 1 }, /invalidExclusions/u],
    ["component-package", { unresolvedSelections: 1 }, /unresolvedSelections/u],
    ["operation-package", { guidedOwnerUnits: 0 }, /ownerUnits and guidedOwnerUnits/u],
    ["operation-package", { guidedOperationOwners: 0 }, /operationOwners and guidedOperationOwners/u],
    ["operation-package", { invalidRegistryItems: 1 }, /invalidRegistryItems/u],
    ["operation-package", { unresolvedDependencies: 1 }, /unresolvedDependencies/u],
  ];
  for (const [profile, summaryOverrides, pattern] of cases) {
    const fixture = await createInstalledFixture({ profile, summaryOverrides });
    try {
      const result = runResolver("flowstack-ui-review", fixture, ["--package", "@flowstack-ui/brick"]);
      assert.notEqual(result.status, 0, `${profile} unexpectedly accepted ${JSON.stringify(summaryOverrides)}`);
      assert.match(result.stderr, pattern);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  }
});

test("rejects schema drift, zero or unreconciled guides, uncovered records, and artifact identity drift", async () => {
  const cases = [
    ["manifest schema", async ({ agents }) => updateJson(join(agents, "manifest.json"), (value) => ({ ...value, schema: "wrong.manifest" })), /manifest schema/u, []],
    ["coverage schema", async ({ agents }) => updateJson(join(agents, "coverage.json"), (value) => ({ ...value, schema: "wrong.coverage" })), /coverage schema/u, []],
    ["zero guides", async ({ agents }) => {
      await updateJson(join(agents, "manifest.json"), (value) => ({ ...value, guides: [] }));
      await updateJson(join(agents, "coverage.json"), (value) => ({ ...value, guides: [], summary: { ...value.summary, packageGuides: 0 } }));
    }, /manifest guides must be a nonempty array/u, []],
    ["extra coverage guide", async ({ agents }) => updateJson(join(agents, "coverage.json"), (value) => ({ ...value, guides: [...value.guides, { id: "extra", status: "covered" }] })), /guide manifest and coverage ids/u, []],
    ["uncovered component", async ({ agents }) => updateJson(join(agents, "coverage.json"), (value) => ({ ...value, components: value.components.map((entry) => ({ ...entry, status: "missing" })) })), /uncovered owner/u, []],
    ["coverage failures", async ({ agents }) => updateJson(join(agents, "coverage.json"), (value) => ({ ...value, failures: [{ code: "missing-guide" }] })), /coverage is not closed/u, []],
    ["missing guide artifact", async ({ agents }) => unlink(join(agents, "layer-selection.md")), /guide layer-selection Markdown is missing/u, []],
    ["wrong guide package", async ({ agents }) => updateJson(join(agents, "layer-selection.json"), (value) => ({ ...value, package: "@flowstack-ui/atom" })), /artifact identity/u, []],
    ["wrong selected kind", async ({ agents }) => updateJson(join(agents, "button.json"), (value) => ({ ...value, kind: "guide" })), /artifact identity/u, ["--kind", "component", "--id", "button"]],
    ["manifest package", async ({ agents }) => updateJson(join(agents, "manifest.json"), (value) => ({ ...value, package: "@flowstack-ui/atom" })), /manifest identity/u, []],
  ];
  for (const [label, mutate, pattern, selection] of cases) {
    const fixture = await createInstalledFixture();
    try {
      await mutate({ agents: join(fixture, "node_modules", "@flowstack-ui", "brick", "agents") });
      const result = runResolver("flowstack-ui-compose", fixture, ["--package", "@flowstack-ui/brick", ...selection]);
      assert.notEqual(result.status, 0, `${label} unexpectedly passed`);
      assert.match(result.stderr, pattern);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  }
});

test("rejects missing, extra, or count-mismatched Agent Tools guide routes", async () => {
  for (const [label, mutate, pattern] of [
    ["invalid archive digest", async ({ indexPath }) => updateJson(indexPath, (index) => ({ ...index, packages: index.packages.map((record) => ({ ...record, archiveSha256: "not-a-digest" })) })), /archive digest is invalid/u],
    ["zero guide count", async ({ indexPath }) => updateJson(indexPath, (index) => ({ ...index, packages: index.packages.map((record) => ({ ...record, counts: { ...record.counts, guides: 0 } })) })), /guide count is invalid/u],
    ["missing guide artifact", async ({ publicRoot, routes }) => unlink(join(publicRoot, routes.find((route) => route.kind === "guide").path.slice(1))), /route .* is missing/u],
    ["extra guide route", async ({ indexPath }) => updateJson(indexPath, (index) => ({ ...index, routes: [...index.routes, { ...index.routes.find((route) => route.kind === "guide"), id: "extra", path: "/packages/brick/1.2.3/guides/extra.txt" }] })), /guide route count/u],
  ]) {
    const delivery = await createDeliveryFixture();
    try {
      await mutate(delivery);
      const result = runResolver("flowstack-ui-review", delivery.fixture, ["--package", "@flowstack-ui/brick", "--version", "1.2.3", "--agent-tools", delivery.agentToolsRoot]);
      assert.notEqual(result.status, 0, `${label} unexpectedly passed`);
      assert.match(result.stderr, pattern);
    } finally {
      await rm(delivery.fixture, { recursive: true, force: true });
    }
  }
});

test("rejects installed and locked artifacts whose symlinks escape their authority roots", async () => {
  const fixture = await createInstalledFixture();
  const delivery = await createDeliveryFixture();
  const outside = await mkdtemp(join(tmpdir(), "flowstack-skill-outside-"));
  try {
    const installedArtifact = join(fixture, "node_modules", "@flowstack-ui", "brick", "agents", "button.json");
    const outsideInstalled = join(outside, "button.json");
    await writeJson(outsideInstalled, { schema: "flowstack.agent-component.v1", id: "button", package: "@flowstack-ui/brick", kind: "component" });
    await unlink(installedArtifact);
    await symlink(outsideInstalled, installedArtifact);
    const installedResult = runResolver("flowstack-ui-builder", fixture, ["--package", "@flowstack-ui/brick", "--kind", "component", "--id", "button"]);
    assert.notEqual(installedResult.status, 0);
    assert.match(installedResult.stderr, /escapes its authority root/u);

    const component = delivery.routes.find((route) => route.kind === "component");
    const lockedArtifact = join(delivery.publicRoot, component.path.slice(1));
    const outsideLocked = join(outside, "button.txt");
    await writeFile(outsideLocked, await readFile(lockedArtifact));
    await unlink(lockedArtifact);
    await symlink(outsideLocked, lockedArtifact);
    const lockedResult = runResolver("flowstack-ui-review", delivery.fixture, ["--package", "@flowstack-ui/brick", "--version", "1.2.3", "--kind", "component", "--id", "button", "--agent-tools", delivery.agentToolsRoot]);
    assert.notEqual(lockedResult.status, 0);
    assert.match(lockedResult.stderr, /escapes its authority root/u);
  } finally {
    await rm(fixture, { recursive: true, force: true });
    await rm(delivery.fixture, { recursive: true, force: true });
    await rm(outside, { recursive: true, force: true });
  }
});

test("resolves only exact reconciled Agent Tools routes and validates selected route identity", async () => {
  const delivery = await createDeliveryFixture();
  try {
    const args = ["--package", "@flowstack-ui/brick", "--version", "1.2.3", "--kind", "component", "--id", "button", "--agent-tools", delivery.agentToolsRoot];
    const exact = runResolver("flowstack-ui-compose", delivery.fixture, args);
    assert.equal(exact.status, 0, exact.stderr);
    assert.equal(JSON.parse(exact.stdout).selected.id, "button");

    const unavailable = runResolver("flowstack-ui-compose", delivery.fixture, ["--package", "@flowstack-ui/brick", "--version", "1.2.2", "--agent-tools", delivery.agentToolsRoot]);
    assert.notEqual(unavailable.status, 0);
    assert.match(unavailable.stderr, /AGENT_KNOWLEDGE_UNAVAILABLE/u);

    const component = delivery.routes.find((route) => route.kind === "component");
    const componentPath = join(delivery.publicRoot, component.path.slice(1));
    const wrongIdentity = (await readFile(componentPath, "utf8")).replace("\nID: button\n", "\nID: link\n");
    await writeFile(componentPath, wrongIdentity);
    await updateJson(delivery.indexPath, (index) => ({
      ...index,
      routes: index.routes.map((route) => route.path === component.path ? { ...route, bytes: Buffer.byteLength(wrongIdentity), sha256: digest(wrongIdentity) } : route),
    }));
    const identity = runResolver("flowstack-ui-compose", delivery.fixture, args);
    assert.notEqual(identity.status, 0);
    assert.match(identity.stderr, /route identity does not match/u);
  } finally {
    await rm(delivery.fixture, { recursive: true, force: true });
  }
});

async function createInstalledFixture({ profile = "component-package", summaryOverrides = {}, failures = [], version = "1.2.3" } = {}) {
  const fixture = await mkdtemp(join(tmpdir(), "flowstack-skill-installed-"));
  const packageRoot = join(fixture, "node_modules", "@flowstack-ui", "brick");
  const agents = join(packageRoot, "agents");
  await mkdir(agents, { recursive: true });
  await writeJson(join(fixture, "package.json"), { private: true, dependencies: { "@flowstack-ui/brick": version } });
  await writeJson(join(packageRoot, "package.json"), {
    name: "@flowstack-ui/brick",
    version,
    exports: {
      "./package.json": "./package.json",
      "./agents/manifest.json": "./agents/manifest.json",
      "./agents/*.json": "./agents/*.json",
      "./agents/*.md": "./agents/*.md",
    },
  });

  const guide = { id: "layer-selection", json: "./layer-selection.json", markdown: "./layer-selection.md" };
  const component = { id: "button", json: "./button.json", markdown: "./button.md" };
  const operation = { id: "compile", guide: "./layer-selection.json" };
  const block = { id: "application/example", json: "./blocks/application/example.json", markdown: "./blocks/application/example.md" };
  const components = profile === "component-package" ? [component] : [];
  const operations = profile === "operation-package" ? [operation] : [];
  const registryItems = profile === "source-registry" ? [block] : [];
  await writeJson(join(agents, "manifest.json"), {
    schema: "flowstack.agent-manifest.v1",
    package: "@flowstack-ui/brick",
    packageVersion: version,
    coverage: "./coverage.json",
    guides: [guide],
    components,
    operations,
    registryItems,
  });

  const summary = {
    publicSurfaces: 4,
    classifiedPublicSurfaces: 4,
    componentOwners: components.length,
    guidedComponentOwners: components.length,
    packageGuides: 1,
    unclassified: 0,
    invalidExclusions: 0,
    unresolvedSelections: 0,
    ...(profile === "operation-package" ? {
      ownerUnits: 1, guidedOwnerUnits: 1, operationOwners: 1, guidedOperationOwners: 1,
      registryItems: 0, guidedRegistryItems: 0, invalidRegistryItems: 0, unresolvedDependencies: 0,
    } : {}),
    ...(profile === "source-registry" ? {
      ownerUnits: 1, guidedOwnerUnits: 1, operationOwners: 0, guidedOperationOwners: 0,
      registryItems: 1, guidedRegistryItems: 1, invalidRegistryItems: 0, unresolvedDependencies: 0,
    } : {}),
    ...summaryOverrides,
  };
  const owner = profile === "operation-package" ? { kind: "operation", id: "compile", status: "covered" } : { kind: "registry-item", id: "application/example", status: "covered" };
  await writeJson(join(agents, "coverage.json"), {
    schema: "flowstack.agent-coverage.v1",
    package: "@flowstack-ui/brick",
    packageVersion: version,
    layer: "brick",
    profile: { kind: profile, ownerUnit: profile === "component-package" ? "component" : profile === "operation-package" ? "operation" : "registry-item" },
    summary,
    guides: [{ id: "layer-selection", manifestPaths: { json: "./layer-selection.json", markdown: "./layer-selection.md" }, status: "covered" }],
    components: components.map(({ id }) => ({ id, status: "covered" })),
    owners: profile === "component-package" ? [] : [owner],
    operations: operations.map(({ id }) => ({ id, status: "covered" })),
    registryItems: registryItems.map(({ id }) => ({ id, status: "covered" })),
    failures,
  });
  await writeJson(join(agents, "layer-selection.json"), { schema: "flowstack.agent-guide.v1", id: "layer-selection", package: "@flowstack-ui/brick", kind: "guide" });
  await writeFile(join(agents, "layer-selection.md"), "# Fixture Layer Selection\n");
  await writeJson(join(agents, "button.json"), { schema: "flowstack.agent-component.v1", id: "button", package: "@flowstack-ui/brick", kind: "component" });
  await writeFile(join(agents, "button.md"), "# Fixture Button\n");
  await writeJson(join(agents, "blocks", "application", "example.json"), { $schema: "flowstack.block-agent.v1", id: "application/example" });
  await writeFile(join(agents, "blocks", "application", "example.md"), "# Fixture Block\n");
  return fixture;
}

async function createDeliveryFixture({ fixture: suppliedFixture } = {}) {
  const fixture = suppliedFixture ?? await mkdtemp(join(tmpdir(), "flowstack-skill-delivery-"));
  const agentToolsRoot = join(fixture, "agent-tools");
  const publicRoot = join(agentToolsRoot, "public");
  const definitions = [
    { package: "brick", version: "1.2.3", kind: "component", id: "button", path: "/packages/brick/1.2.3/components/button.txt" },
    { package: "brick", version: "1.2.3", kind: "guide", id: "layer-selection", path: "/packages/brick/1.2.3/guides/layer-selection.txt" },
    { package: "brick", version: "1.2.3", kind: "package", id: "brick", path: "/packages/brick/1.2.3/index.txt" },
  ];
  const routes = [];
  const archiveSha256 = "a".repeat(64);
  for (const route of definitions) {
    const content = route.kind === "package"
      ? "# @flowstack-ui/brick@1.2.3\n"
      : `# Fixture\n\nSource: @flowstack-ui/brick@1.2.3\nKind: ${route.kind}\nID: ${route.id}\n`;
    const path = join(publicRoot, route.path.slice(1));
    await mkdir(join(path, ".."), { recursive: true });
    await writeFile(path, content);
    routes.push({ ...route, bytes: Buffer.byteLength(content), sha256: digest(content) });
  }
  const indexPath = join(publicRoot, "index.json");
  await writeJson(indexPath, {
    schema: "flowstack.agent-delivery-index.v1",
    packages: [{
      id: "brick",
      name: "@flowstack-ui/brick",
      version: "1.2.3",
      archiveSha256,
      profile: { kind: "component-package", ownerUnit: "component" },
      coverage: { publicSurfaces: 4, classifiedPublicSurfaces: 4, failures: 0 },
      counts: { guides: 1, components: 1, operations: 0 },
      route: "/packages/brick/1.2.3/index.txt",
    }],
    routes,
  });
  if (!suppliedFixture) await writeJson(join(fixture, "package.json"), { private: true });
  return { fixture, agentToolsRoot, publicRoot, indexPath, routes, archiveSha256 };
}

function runResolver(skill, project, args) {
  return spawnSync(process.execPath, [join(skillsRoot, skill, "scripts", "resolve-agent-knowledge.mjs"), "--project", project, ...args], { encoding: "utf8" });
}

async function filesBelow(directory, prefix = "") {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    const relativePath = join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await filesBelow(path, relativePath));
    else files.push(relativePath);
  }
  return files;
}

async function updateJson(path, update) {
  await writeJson(path, update(JSON.parse(await readFile(path, "utf8"))));
}

async function writeJson(path, value) {
  await mkdir(join(path, ".."), { recursive: true });
  await writeFile(path, `${JSON.stringify(value, null, 2)}\n`);
}

function digest(content) {
  return createHash("sha256").update(content).digest("hex");
}
