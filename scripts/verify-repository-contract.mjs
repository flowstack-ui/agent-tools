import assert from "node:assert/strict";
import { lstat, readFile, readdir, realpath } from "node:fs/promises";
import { join, resolve } from "node:path";
import config from "../verification.config.mjs";

const root = resolve(import.meta.dirname, "..");
const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const rootPackage = await readJson(join(root, "package.json"));
const mcpPackage = await readJson(join(root, "packages/mcp/package.json"));
const lock = await readJson(join(root, "sources/lock.json"));
const delivery = await readJson(join(root, "config/delivery.json"));
const publishWorkflow = await readFile(join(root, ".github/workflows/publish.yml"), "utf8");
const hostedDriftWorkflow = await readFile(join(root, ".github/workflows/hosted-drift.yml"), "utf8");

assert.equal(rootPackage.name, config.packages[0].name);
assert.equal(mcpPackage.name, config.packages[1].name);
assert.equal(rootPackage.version, mcpPackage.version, "lockstep release versions drifted");
assert.equal(rootPackage.private, undefined);
assert.equal(mcpPackage.private, undefined);
assert.equal(rootPackage.engines?.node, ">=22");
assert.equal(mcpPackage.engines?.node, ">=22");
for (const packageJson of [rootPackage, mcpPackage]) {
  assert.equal(packageJson.license, "MIT");
  assert.equal(packageJson.publishConfig?.access, "public");
  assert.equal(packageJson.publishConfig?.registry, "https://registry.npmjs.org/");
  assert.equal(packageJson.repository?.url, "git+https://github.com/flowstack-ui/agent-tools.git");
  assert.equal(packageJson.bugs?.url, "https://github.com/flowstack-ui/agent-tools/issues");
}
assert.equal(mcpPackage.repository.directory, "packages/mcp");

assert.match(publishWorkflow, /^\s*id-token: write$/mu);
assert.match(publishWorkflow, /^\s*environment: npm$/mu);
assert.match(publishWorkflow, /^\s*package-manager-cache: false$/mu);
assert.doesNotMatch(publishWorkflow, /^\s*cache: npm$/mu, "release builds must not restore package-manager caches");
assert.doesNotMatch(publishWorkflow, /NODE_AUTH_TOKEN/u, "trusted publication must not use a long-lived npm token");

assert.match(hostedDriftWorkflow, /^\s*schedule:$/mu);
assert.match(hostedDriftWorkflow, /^\s*workflow_dispatch:$/mu);
assert.match(hostedDriftWorkflow, /^\s*contents: read$/mu);
assert.match(hostedDriftWorkflow, /^\s*cancel-in-progress: true$/mu);
assert.match(hostedDriftWorkflow, /^\s*timeout-minutes: 10$/mu);
assert.match(hostedDriftWorkflow, /^\s*node-version: 24$/mu);
assert.match(hostedDriftWorkflow, /^\s*package-manager-cache: false$/mu);
assert.match(hostedDriftWorkflow, /npm run host:verify -- --origin https:\/\/agents\.brick-ui\.com/u);

assert.deepEqual(lock.packages.map(({ name }) => name).sort(), [...config.sourcePackages].sort());
assert.deepEqual(delivery.packages.map(({ name }) => name).sort(), [...config.sourcePackages].sort());
assert.equal(lock.packages.some(({ name }) => /blocks/iu.test(name)), false);

assert.deepEqual((await readdir(join(root, "skills"))).sort(), [...config.skills].sort());
for (const skill of config.skills) {
  const alias = join(root, ".agents/skills", skill);
  assert.equal((await lstat(alias)).isSymbolicLink(), true, `${skill} discovery alias must be a symlink`);
  assert.equal(await realpath(alias), await realpath(join(root, "skills", skill)));
}

const plugin = await readJson(join(root, ".codex-plugin/plugin.json"));
assert.equal(plugin.name, "flowstack-ui");
assert.equal(plugin.version, rootPackage.version);
assert.equal(plugin.skills, "./skills/");
assert.equal("mcpServers" in plugin, false, "plugin must remain skills-only");
assert.equal("apps" in plugin, false, "plugin must not claim an app");

const tracked = await walk(root);
const forbiddenPaths = /(?:^|\/)(?:node_modules|\.git|blocks-ui|blueprints?|research-memory|customer-data)(?:\/|$)/iu;
const sourceExtensions = /\.(?:json|md|toml|ya?ml|txt)$/iu;
for (const path of tracked) {
  const relative = path.slice(root.length + 1);
  assert.doesNotMatch(relative, forbiddenPaths, `forbidden repository path: ${relative}`);
  if (!sourceExtensions.test(relative) || relative.startsWith("sources/packages/")) continue;
  const content = await readFile(path, "utf8");
  assert.doesNotMatch(content, /\/(?:Users|home)\/[^\s"'`]+|[A-Za-z]:\\Users\\[^\s"'`]+/u, `machine path leaked from ${relative}`);
}

console.log(`Verified public repository contract for ${rootPackage.name}@${rootPackage.version}.`);

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if ([".git", ".vercel", "node_modules"].includes(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isSymbolicLink()) continue;
    if (entry.isDirectory()) output.push(...await walk(path));
    else if (entry.isFile()) output.push(path);
  }
  return output;
}
