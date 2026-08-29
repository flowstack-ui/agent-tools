import assert from "node:assert/strict";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createGunzip } from "node:zlib";
import { assertPublicArchivePath } from "./public-boundary.mjs";

export const ARCHIVE_LIMITS = Object.freeze({
  maxArchiveBytes: 16 * 1024 * 1024,
  maxEntries: 8_000,
  maxEntryBytes: 16 * 1024 * 1024,
  maxExpandedBytes: 128 * 1024 * 1024,
  maxExpansionRatio: 200,
  ratioSlackBytes: 1024 * 1024,
});

const digest = (content) => createHash("sha256").update(content).digest("hex");

function resolvedLimits(overrides = {}) {
  const limits = { ...ARCHIVE_LIMITS, ...overrides };
  for (const [name, value] of Object.entries(limits)) {
    assert.ok(Number.isSafeInteger(value) && value >= 0, `invalid archive limit ${name}`);
  }
  return limits;
}

export function assertArchiveByteBudget(packageId, archiveBytes, overrides) {
  const { maxArchiveBytes } = resolvedLimits(overrides);
  assert.ok(Number.isSafeInteger(archiveBytes) && archiveBytes > 0, `${packageId} archive is empty`);
  assert.ok(archiveBytes <= maxArchiveBytes, `${packageId} compressed archive exceeds ${maxArchiveBytes} bytes`);
}

export async function stageVerifiedArchive(packageId, archiveBytes, directory, overrides) {
  assert.match(packageId, /^[a-z0-9-]+$/u, "unsafe package id for staged archive");
  assertArchiveByteBudget(packageId, archiveBytes.length, overrides);
  const sha256 = digest(archiveBytes);
  const path = join(directory, `archive-${packageId}.tgz`);
  await writeFile(path, archiveBytes, { flag: "wx", mode: 0o600 });
  const stagedBytes = await readFile(path);
  const metadata = await stat(path);
  assert.equal(metadata.size, archiveBytes.length, `${packageId} staged archive byte drift`);
  assert.equal(digest(stagedBytes), sha256, `${packageId} staged archive digest drift`);
  assert.equal(metadata.mode & 0o777, 0o600, `${packageId} staged archive permissions are unsafe`);
  return { path, bytes: archiveBytes.length, sha256 };
}

function tarEntrySize(packageId, header) {
  const raw = header.subarray(124, 136).toString("ascii").replace(/\0.*$/u, "").trim();
  assert.match(raw, /^[0-7]+$/u, `${packageId} archive has an unsupported entry size`);
  const size = Number.parseInt(raw, 8);
  assert.ok(Number.isSafeInteger(size), `${packageId} archive entry size is unsafe`);
  return size;
}

export async function assertArchiveResourceBudget(packageId, archivePath, archiveBytes, overrides) {
  const limits = resolvedLimits(overrides);
  assertArchiveByteBudget(packageId, archiveBytes, limits);

  let expandedBytes = 0;
  let entryCount = 0;
  let payloadBytes = 0;
  let pending = Buffer.alloc(0);
  let remainingRecordBytes = 0;
  const stream = createReadStream(archivePath).pipe(createGunzip());

  for await (const chunk of stream) {
    expandedBytes += chunk.length;
    assert.ok(expandedBytes <= limits.maxExpandedBytes, `${packageId} expanded archive exceeds ${limits.maxExpandedBytes} bytes`);
    pending = pending.length === 0 ? chunk : Buffer.concat([pending, chunk]);

    while (pending.length > 0) {
      if (remainingRecordBytes > 0) {
        const consumed = Math.min(remainingRecordBytes, pending.length);
        remainingRecordBytes -= consumed;
        pending = pending.subarray(consumed);
        continue;
      }
      if (pending.length < 512) break;
      const header = pending.subarray(0, 512);
      pending = pending.subarray(512);
      if (header.every((byte) => byte === 0)) continue;

      const type = header[156];
      assert.ok(type === 0 || type === 0x30 || type === 0x35, `${packageId} archive has an unsupported tar header type`);
      const size = tarEntrySize(packageId, header);
      if (type === 0x35) assert.equal(size, 0, `${packageId} archive directory has a payload`);
      entryCount += 1;
      payloadBytes += size;
      assert.ok(entryCount <= limits.maxEntries, `${packageId} archive exceeds ${limits.maxEntries} entries`);
      assert.ok(size <= limits.maxEntryBytes, `${packageId} archive entry exceeds ${limits.maxEntryBytes} bytes`);
      assert.ok(payloadBytes <= limits.maxExpandedBytes, `${packageId} archive payload exceeds ${limits.maxExpandedBytes} bytes`);
      remainingRecordBytes = Math.ceil(size / 512) * 512;
    }
  }

  assert.equal(remainingRecordBytes, 0, `${packageId} archive has a truncated entry`);
  assert.ok(pending.length === 0 || pending.every((byte) => byte === 0), `${packageId} archive has a truncated header`);
  assert.ok(entryCount > 0, `${packageId} archive is empty`);
  const ratioBudget = archiveBytes * limits.maxExpansionRatio + limits.ratioSlackBytes;
  assert.ok(expandedBytes <= ratioBudget, `${packageId} archive expansion ratio exceeds ${limits.maxExpansionRatio}:1`);
  return { entryCount, payloadBytes, expandedBytes };
}

export function assertSafeTarListing(packageId, listing, verboseListing, overrides) {
  const { maxEntries } = resolvedLimits(overrides);
  assert.ok(listing.length > 0, `${packageId} archive is empty`);
  assert.ok(listing.length <= maxEntries, `${packageId} archive exceeds ${maxEntries} entries`);
  assert.equal(verboseListing.length, listing.length, `${packageId} archive listing is ambiguous`);
  for (const [index, entry] of listing.entries()) {
    const permissions = verboseListing[index]?.slice(0, 10);
    const type = permissions?.[0];
    assert.ok(type === "-" || type === "d", `${packageId} archive contains a link or non-regular entry: ${entry}`);
    assert.doesNotMatch(permissions, /^.{3}[sS]|^.{6}[sS]|^.{9}[tT]/u, `${packageId} archive contains unsafe special permissions: ${entry}`);
    assert.notEqual(permissions[5], "w", `${packageId} archive contains group-writable permissions: ${entry}`);
    assert.notEqual(permissions[8], "w", `${packageId} archive contains world-writable permissions: ${entry}`);
    assert.ok(entry === "package" || entry.startsWith("package/"), `unsafe archive root: ${entry}`);
    assert.ok(!entry.split("/").includes(".."), `escaping archive path: ${entry}`);
    assertPublicArchivePath(entry);
  }
}

export function safeTarExtractArgs(archivePath, destination) {
  return ["-xzf", archivePath, "-C", destination, "--no-same-owner", "--no-same-permissions"];
}
