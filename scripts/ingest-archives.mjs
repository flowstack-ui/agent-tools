import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cp, mkdir, mkdtemp, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative, resolve } from "node:path";
import { assertArchiveResourceBudget, assertSafeTarListing, safeTarExtractArgs, stageVerifiedArchive } from "./lib/archive-safety.mjs";

const root = resolve(import.meta.dirname, "..");
const config = JSON.parse(await readFile(join(root, "config", "delivery.json"), "utf8"));
const args = process.argv.slice(2);
const archives = new Map();
for (let index = 0; index < args.length; index += 2) {
  const flag = args[index];
  const value = args[index + 1];
  assert.ok(flag?.startsWith("--") && value, "archive arguments must be --package /path/to/archive.tgz pairs");
  archives.set(flag.slice(2), resolve(value));
}
assert.deepEqual([...archives.keys()].sort(), config.packages.map(({ id }) => id).sort(), "pass exactly one archive for every configured package");

const digest = (content) => createHash("sha256").update(content).digest("hex");
const sourceRoot = join(root, "sources");
const temporaryRoot = await mkdtemp(join(dirname(sourceRoot), ".agent-tools-sources-"));
const nextSources = join(temporaryRoot, "sources");
const lockPackages = [];

async function walk(directory) {
  const entries = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) entries.push(...await walk(path));
    else entries.push(path);
  }
  return entries;
}

function assertClosedCoverage(coverage) {
  assert.equal(coverage.schema, "flowstack.agent-coverage.v1");
  assert.equal(coverage.summary.publicSurfaces, coverage.summary.classifiedPublicSurfaces);
  assert.equal(coverage.summary.unclassified, 0);
  assert.equal(coverage.summary.invalidExclusions, 0);
  assert.equal(coverage.summary.unresolvedSelections, 0);
  assert.deepEqual(coverage.failures, []);
  const profile = coverage.profile?.kind ?? "component-package";
  if (profile === "operation-package") {
    assert.equal(coverage.summary.ownerUnits, coverage.summary.guidedOwnerUnits);
    assert.ok(coverage.summary.operationOwners > 0);
    assert.equal(coverage.summary.invalidRegistryItems, 0);
    assert.equal(coverage.summary.unresolvedDependencies, 0);
  } else {
    assert.notEqual(profile, "source-registry", "private source registries are outside the public Agent Tools boundary");
    assert.equal(coverage.summary.componentOwners, coverage.summary.guidedComponentOwners);
  }
}

try {
  await mkdir(nextSources, { recursive: true });
  for (const expected of config.packages) {
    const archive = archives.get(expected.id);
    const archiveBytes = await readFile(archive);
    const staged = await stageVerifiedArchive(expected.id, archiveBytes, temporaryRoot);
    await assertArchiveResourceBudget(expected.id, staged.path, staged.bytes);
    const listing = execFileSync("tar", ["-tzf", staged.path], { encoding: "utf8" }).trim().split("\n").filter(Boolean);
    const verboseListing = execFileSync("tar", ["-tvzf", staged.path], { encoding: "utf8" }).trim().split("\n").filter(Boolean);
    assertSafeTarListing(expected.id, listing, verboseListing);

    const extracted = join(temporaryRoot, `extract-${expected.id}`);
    await mkdir(extracted, { recursive: true });
    execFileSync("tar", safeTarExtractArgs(staged.path, extracted));
    const packageRoot = join(extracted, "package");
    const packageJson = JSON.parse(await readFile(join(packageRoot, "package.json"), "utf8"));
    assert.equal(packageJson.name, expected.name, `${expected.id} archive package identity mismatch`);
    const manifest = JSON.parse(await readFile(join(packageRoot, "dist", "agents", "manifest.json"), "utf8"));
    const coverage = JSON.parse(await readFile(join(packageRoot, "dist", "agents", "coverage.json"), "utf8"));
    assert.equal(manifest.package, packageJson.name);
    assert.equal(manifest.packageVersion, packageJson.version);
    assert.equal(coverage.package, packageJson.name);
    assert.equal(coverage.packageVersion, packageJson.version);
    assertClosedCoverage(coverage);

    const destination = join(nextSources, "packages", expected.id, packageJson.version);
    await mkdir(destination, { recursive: true });
    await cp(join(packageRoot, "dist", "agents"), join(destination, "agents"), { recursive: true });
    for (const name of ["README.md", "CHANGELOG.md", "LICENSE"]) {
      try { await cp(join(packageRoot, name), join(destination, name)); } catch {}
    }
    try { await cp(join(packageRoot, "docs"), join(destination, "docs"), { recursive: true }); } catch {}
    await writeFile(join(destination, "package.json"), `${JSON.stringify({
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
    }, null, 2)}\n`);

    const files = [];
    for (const path of (await walk(destination)).sort()) {
      const bytes = await readFile(path);
      files.push({ path: relative(destination, path), bytes: bytes.length, sha256: digest(bytes) });
    }
    lockPackages.push({
      id: expected.id,
      name: packageJson.name,
      version: packageJson.version,
      archive: basename(archive),
      archiveBytes: staged.bytes,
      archiveSha256: staged.sha256,
      profile: coverage.profile ?? { kind: "component-package", ownerUnit: "component" },
      snapshotFiles: files,
    });
  }

  const lock = {
    schema: "flowstack.agent-source-lock.v1",
    packages: lockPackages.sort((a, b) => a.id.localeCompare(b.id)),
  };
  await writeFile(join(nextSources, "lock.json"), `${JSON.stringify(lock, null, 2)}\n`);
  const previousSources = join(temporaryRoot, "previous-sources");
  await rename(sourceRoot, previousSources);
  try {
    await rename(nextSources, sourceRoot);
  } catch (error) {
    await rename(previousSources, sourceRoot);
    throw error;
  }
  await rm(previousSources, { recursive: true, force: true });
  console.log(`Locked ${lock.packages.map(({ name, version }) => `${name}@${version}`).join(", ")} from exact archives.`);
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
