import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourcePackage = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
const temporaryRoot = await mkdtemp(join(tmpdir(), "flowstack-agent-tools-package-"));
const archiveDirectory = join(temporaryRoot, "archive");
const consumer = join(temporaryRoot, "consumer");
const npmCache = join(temporaryRoot, "npm-cache");

function run(command, args, cwd) {
  const env = command === "npm" ? { ...process.env, npm_config_cache: npmCache } : process.env;
  const result = spawnSync(command, args, { cwd, encoding: "utf8", env });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} ${args.join(" ")} failed:\n${result.stdout}\n${result.stderr}`);
  return result.stdout;
}

try {
  await mkdir(archiveDirectory, { recursive: true });
  const packedOutput = run("npm", ["pack", "--json", "--silent", "--pack-destination", archiveDirectory], root);
  const jsonStart = packedOutput.lastIndexOf("\n[");
  const packed = JSON.parse(jsonStart >= 0 ? packedOutput.slice(jsonStart + 1) : packedOutput);
  assert.equal(packed.length, 1);
  const archive = join(archiveDirectory, packed[0].filename);
  const listing = run("tar", ["-tzf", archive], root).trim().split("\n");
  for (const expected of [
    "package/.codex-plugin/plugin.json",
    "package/README.md",
    "package/CHANGELOG.md",
    "package/LICENSE",
    "package/docs/architecture.md",
    "package/package.json",
    "package/public/index.json",
    "package/public/llms.txt",
    "package/skills/flowstack-ui-builder/SKILL.md",
    "package/skills/flowstack-ui-builder/agents/openai.yaml",
    "package/skills/flowstack-ui-builder/scripts/resolve-agent-knowledge.mjs",
    "package/skills/flowstack-ui-compose/SKILL.md",
    "package/skills/flowstack-ui-compose/agents/openai.yaml",
    "package/skills/flowstack-ui-compose/scripts/resolve-agent-knowledge.mjs",
    "package/skills/flowstack-ui-review/SKILL.md",
    "package/skills/flowstack-ui-review/agents/openai.yaml",
    "package/skills/flowstack-ui-review/scripts/resolve-agent-knowledge.mjs",
    "package/skills/flowstack-ui-maintainer/SKILL.md",
    "package/skills/flowstack-ui-maintainer/agents/openai.yaml",
    "package/skills/flowstack-ui-maintainer/scripts/resolve-agent-knowledge.mjs",
  ]) assert.ok(listing.includes(expected), `${expected} is missing from ${basename(archive)}`);
  assert.equal(listing.includes("package/public/llms-full.txt"), false);
  assert.equal(listing.some((entry) => /package\/(?:sources|scripts|test|config|AGENTS\.md)(?:\/|$)/u.test(entry)), false);

  await mkdir(consumer, { recursive: true });
  await writeFile(join(consumer, "package.json"), `${JSON.stringify({ name: "agent-tools-clean-consumer", private: true }, null, 2)}\n`);
  run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", archive], consumer);
  const consumerRequire = createRequire(join(consumer, "index.cjs"));
  const installedPackage = consumerRequire("@flowstack-ui/agent-tools/package.json");
  const installedPlugin = JSON.parse(await readFile(join(consumer, "node_modules", "@flowstack-ui", "agent-tools", ".codex-plugin", "plugin.json"), "utf8"));
  const index = consumerRequire("@flowstack-ui/agent-tools/index.json");
  assert.equal(installedPackage.name, sourcePackage.name);
  assert.equal(installedPackage.version, sourcePackage.version);
  assert.equal(installedPlugin.name, "flowstack-ui");
  assert.equal(installedPlugin.version, installedPackage.version);
  assert.equal(installedPlugin.skills, "./skills/");
  assert.equal("mcpServers" in installedPlugin, false);
  assert.equal(installedPackage.private, sourcePackage.private);
  assert.deepEqual(installedPackage.dependencies, undefined);
  assert.equal(index.packages.length, 4);
  assert.equal(index.packages.every(({ coverage }) => coverage.failures === 0), true);
  const llms = await readFile(consumerRequire.resolve("@flowstack-ui/agent-tools/llms.txt"), "utf8");
  assert.match(llms, /^# FLOWSTACK UI\n/u);
  assert.equal(Buffer.byteLength(llms), index.corpus.llms.bytes);
  assert.equal(createHash("sha256").update(llms).digest("hex"), index.corpus.llms.sha256);
  for (const route of index.routes) {
    const content = await readFile(consumerRequire.resolve(`@flowstack-ui/agent-tools/public${route.path}`));
    assert.equal(content.length, route.bytes, `${route.path} installed byte count drifted`);
    assert.equal(createHash("sha256").update(content).digest("hex"), route.sha256, `${route.path} installed digest drifted`);
  }
  for (const packageRecord of index.packages) {
    const exportPath = `@flowstack-ui/agent-tools/public${packageRecord.route}`;
    assert.match(await readFile(consumerRequire.resolve(exportPath), "utf8"), new RegExp(`${packageRecord.name.replace("@", "@")}@${packageRecord.version}`, "u"));
  }
  for (const task of ["layout", "forms", "navigation", "overlays", "data", "theming"]) {
    assert.match(await readFile(consumerRequire.resolve(`@flowstack-ui/agent-tools/public/tasks/${task}.txt`), "utf8"), new RegExp(`task: ${task}`, "u"));
  }
  for (const [skill, routeKind, packageId] of [
    ["flowstack-ui-builder", "component", "brick"],
    ["flowstack-ui-review", "component", "atom"],
    ["flowstack-ui-compose", "component", "brick"],
    ["flowstack-ui-maintainer", "component", "atom"],
  ]) {
    const skillPrefix = `@flowstack-ui/agent-tools/skills/${skill}`;
    assert.match(await readFile(consumerRequire.resolve(`${skillPrefix}/SKILL.md`), "utf8"), new RegExp(`name: ${skill}`, "u"));
    assert.match(await readFile(consumerRequire.resolve(`${skillPrefix}/agents/openai.yaml`), "utf8"), new RegExp(`\\$${skill}\\b`, "u"));
    const packageRecord = index.packages.find(({ id }) => id === packageId);
    const ownerRoute = index.routes.find((route) => route.package === packageId && route.version === packageRecord.version && route.kind === routeKind);
    assert.ok(ownerRoute, `${packageId} has no ${routeKind} route for ${skill}`);
    const resolver = consumerRequire.resolve(`${skillPrefix}/scripts/resolve-agent-knowledge.mjs`);
    const output = run(process.execPath, [
      resolver,
      "--project", consumer,
      "--package", packageRecord.name,
      "--version", packageRecord.version,
      "--kind", routeKind,
      "--id", ownerRoute.id,
      "--agent-tools", consumerRequire.resolve("@flowstack-ui/agent-tools/index.json"),
    ], consumer);
    const resolution = JSON.parse(output);
    assert.equal(resolution.source, "agent-tools-route");
    assert.equal(resolution.package, packageRecord.name);
    assert.equal(resolution.version, packageRecord.version);
    assert.equal(resolution.selected.route, ownerRoute.path);
  }
  console.log(`Verified ${basename(archive)} in an isolated clean consumer.`);
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
