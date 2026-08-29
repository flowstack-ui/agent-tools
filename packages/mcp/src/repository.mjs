import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstat, readFile, realpath, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { PACKAGES, PACKAGE_IDS, PACKAGE_NAMES } from "./constants.mjs";
import { assertPublicArtifact } from "./privacy.mjs";

const EXACT_VERSION = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u;

function packageRecord(value) {
  if (PACKAGE_IDS.includes(value)) return PACKAGES[value];
  return Object.values(PACKAGES).find(({ name }) => name === value);
}

function exactVersion(version) {
  assert.equal(typeof version, "string", "version is required");
  assert.match(version, EXACT_VERSION, `version must be exact, not a tag or range: ${version}`);
  return version;
}

function safeRelative(path) {
  assert.equal(typeof path, "string");
  assert.ok(path.length > 0 && !isAbsolute(path), `artifact path must be package-relative: ${path}`);
  assert.equal(/^https?:\/\//iu.test(path), false, `arbitrary URLs are not allowed: ${path}`);
  const normalized = path.replaceAll("\\", "/");
  assert.equal(normalized.split("/").includes(".."), false, `path traversal is not allowed: ${path}`);
  assert.equal(normalized.startsWith("/"), false, `absolute paths are not allowed: ${path}`);
  return normalized.replace(/^\.\//u, "");
}

async function contained(root, path) {
  assert.equal((await lstat(root)).isSymbolicLink(), false, `package root must not be a symlink: ${root}`);
  const rootReal = await realpath(root);
  const target = resolve(rootReal, safeRelative(path));
  const rel = relative(rootReal, target);
  assert.ok(rel !== ".." && !rel.startsWith(`..${sep}`) && !isAbsolute(rel), `path escapes package root: ${path}`);
  let cursor = rootReal;
  for (const segment of safeRelative(path).split("/")) {
    cursor = join(cursor, segment);
    assert.equal((await lstat(cursor)).isSymbolicLink(), false, `symlink artifact segment rejected: ${path}`);
  }
  const targetReal = await realpath(target);
  const realRel = relative(rootReal, targetReal);
  assert.ok(realRel !== ".." && !realRel.startsWith(`..${sep}`) && !isAbsolute(realRel), `real artifact path escapes package root: ${path}`);
  return targetReal;
}

function digest(content) {
  return createHash("sha256").update(content).digest("hex");
}

async function json(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function readLockedArtifact(record, version, root, lockEntry, path, encoding = "utf8") {
  const normalized = safeRelative(path);
  const locked = lockEntry.snapshotFiles.find((file) => file.path === normalized);
  assert.ok(locked, `${record.name}@${version} artifact is not covered by the exact source lock: ${normalized}`);
  const target = await contained(root, normalized);
  const content = await readFile(target, encoding);
  assert.equal(Buffer.byteLength(content), locked.bytes, `locked artifact byte drift: ${normalized}`);
  assert.equal(digest(content), locked.sha256, `locked artifact digest drift: ${normalized}`);
  assertPublicArtifact(normalized);
  return content;
}

export class FlowstackRepository {
  constructor({ projectRoot = process.cwd(), sourceLock, policy = "local" } = {}) {
    assert.ok(["local", "locked-only"].includes(policy), `unknown repository policy: ${policy}`);
    this.projectRoot = resolve(projectRoot);
    this.sourceLockPath = sourceLock ? resolve(sourceLock) : undefined;
    this.policy = policy;
    this.lock = undefined;
  }

  async initialize() {
    if (!this.sourceLockPath) {
      assert.notEqual(this.policy, "locked-only", "locked-only repository policy requires an explicit source lock");
      return this;
    }
    assert.equal(/^https?:\/\//iu.test(this.sourceLockPath), false, "source lock must be a local file, never a URL");
    assert.equal((await lstat(this.sourceLockPath)).isSymbolicLink(), false, "source lock must not be a symlink");
    assert.ok((await stat(this.sourceLockPath)).isFile(), "source lock must be a file");
    const lock = await json(this.sourceLockPath);
    assert.equal(lock.schema, "flowstack.agent-source-lock.v1");
    assert.ok(Array.isArray(lock.packages));
    const identities = new Set();
    for (const entry of lock.packages) {
      assert.ok(PACKAGE_IDS.includes(entry.id), `source lock contains unknown package ${entry.id}`);
      assert.equal(entry.name, PACKAGES[entry.id].name);
      exactVersion(entry.version);
      const identity = `${entry.name}@${entry.version}`;
      assert.equal(identities.has(identity), false, `duplicate locked package/version: ${identity}`);
      identities.add(identity);
      assert.equal(/^https?:\/\//iu.test(entry.archive), false, `source archive must not be a URL: ${entry.archive}`);
      assert.equal(entry.archive, basename(entry.archive), `source archive must be a .tgz basename: ${entry.archive}`);
      assert.match(entry.archive, /^[A-Za-z0-9@._+-]+\.tgz$/u, `source archive must be a .tgz basename: ${entry.archive}`);
      assert.ok(Number.isInteger(entry.archiveBytes) && entry.archiveBytes > 0, `${identity} archiveBytes must be positive`);
      assert.match(entry.archiveSha256, /^[a-f0-9]{64}$/u, `${identity} archiveSha256 must be lowercase sha256`);
      assert.ok(Array.isArray(entry.snapshotFiles));
      const paths = new Set();
      for (const file of entry.snapshotFiles) {
        safeRelative(file.path);
        assert.equal(paths.has(file.path), false, `${identity} contains duplicate snapshot path ${file.path}`);
        paths.add(file.path);
        assert.ok(Number.isInteger(file.bytes) && file.bytes > 0, `${identity}/${file.path} bytes must be positive`);
        assert.match(file.sha256, /^[a-f0-9]{64}$/u, `${identity}/${file.path} sha256 is invalid`);
      }
      for (const required of ["package.json", "agents/manifest.json", "agents/coverage.json"]) assert.ok(paths.has(required), `${identity} is missing required ${required}`);
    }
    this.lock = lock;
    return this;
  }

  async installedPackage(record) {
    try {
      const require = createRequire(join(this.projectRoot, "package.json"));
      const packageJsonPath = require.resolve(`${record.name}/package.json`);
      const metadata = await json(packageJsonPath);
      return { root: dirname(packageJsonPath), metadata };
    } catch {
      return undefined;
    }
  }

  lockedEntry(record, version) {
    return this.lock?.packages.find((entry) => entry.id === record.id && entry.version === version);
  }

  async availablePackages() {
    const available = [];
    for (const record of Object.values(PACKAGES)) {
      if (this.policy !== "locked-only") {
        const installed = await this.installedPackage(record);
        if (installed && EXACT_VERSION.test(installed.metadata.version)) {
          available.push({ ...record, version: installed.metadata.version, source: "project-installed", provenance: { package: record.name, layer: record.layer, version: installed.metadata.version, source: "project-installed" } });
        }
      }
      for (const entry of this.lock?.packages.filter(({ id }) => id === record.id) ?? []) {
        if (!available.some(({ id, version }) => id === record.id && version === entry.version)) {
          available.push({ ...record, version: entry.version, source: "locked-source", provenance: { package: record.name, layer: record.layer, version: entry.version, source: "locked-source" } });
        }
      }
    }
    return available.sort((a, b) => a.id.localeCompare(b.id) || a.version.localeCompare(b.version));
  }

  async resolvePackage(packageId, version, source = "auto") {
    const record = packageRecord(packageId);
    assert.ok(record, `unknown FLOWSTACK package: ${packageId}; expected ${[...PACKAGE_IDS, ...PACKAGE_NAMES].join(", ")}`);
    exactVersion(version);
    assert.ok(["auto", "installed", "locked"].includes(source), `unknown source policy: ${source}`);
    if (this.policy === "locked-only") {
      assert.notEqual(source, "installed", "project-installed sources are disabled by the locked-only repository policy");
      source = "locked";
    }

    if (source !== "locked") {
      const installed = await this.installedPackage(record);
      if (installed?.metadata.version === version) {
        return this.packageHandle(record, version, "project-installed", installed.root, installed.metadata);
      }
      if (source === "installed") {
        const found = installed?.metadata.version ?? "not installed";
        throw new Error(`${record.name}@${version} is unavailable from project-installed sources (found ${found})`);
      }
    }

    const entry = this.lockedEntry(record, version);
    if (entry) {
      const root = join(dirname(this.sourceLockPath), "packages", record.id, version);
      const metadata = JSON.parse(await readLockedArtifact(record, version, root, entry, "package.json"));
      assert.equal(metadata.name, record.name);
      assert.equal(metadata.version, version);
      return this.packageHandle(record, version, "locked-source", root, metadata, entry);
    }
    throw new Error(`${record.name}@${version} is unavailable; exact-version substitution is forbidden`);
  }

  packageHandle(record, version, source, root, metadata, lockEntry) {
    const agentRoot = source === "locked-source" ? "agents" : "dist/agents";
    const provenance = {
      package: record.name,
      layer: record.layer,
      version,
      source,
      publicAuthority: source === "project-installed" ? "allowlisted-installed-package-artifact" : "hash-locked-package-artifact"
    };
    const readArtifact = async (path, encoding = "utf8") => {
      if (lockEntry) return readLockedArtifact(record, version, root, lockEntry, path, encoding);
      const normalized = safeRelative(path);
      const target = await contained(root, normalized);
      const content = await readFile(target, encoding);
      assertPublicArtifact(normalized);
      return content;
    };
    const readJson = async (path) => JSON.parse(await readArtifact(path));
    return { ...record, version, source, root, metadata, agentRoot, provenance, lockEntry, readArtifact, readJson };
  }
}

export { exactVersion, safeRelative };
