import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { gzipSync } from "node:zlib";
import { assertArchiveByteBudget, assertArchiveResourceBudget, assertSafeTarListing, safeTarExtractArgs, stageVerifiedArchive } from "../scripts/lib/archive-safety.mjs";
import { assertPublicContent } from "../scripts/lib/public-boundary.mjs";

const root = resolve(import.meta.dirname, "..");
const config = JSON.parse(await readFile(join(root, "config", "delivery.json"), "utf8"));
const lock = JSON.parse(await readFile(join(root, "sources", "lock.json"), "utf8"));
const index = JSON.parse(await readFile(join(root, "public", "index.json"), "utf8"));

function tarArchive(entries) {
  const records = [];
  for (const [name, content, type = "0"] of entries) {
    const payload = Buffer.from(content);
    const header = Buffer.alloc(512);
    header.write(name, 0, 100, "utf8");
    header.write("0000644\0", 100, 8, "ascii");
    header.write("0000000\0", 108, 8, "ascii");
    header.write("0000000\0", 116, 8, "ascii");
    header.write(`${payload.length.toString(8).padStart(11, "0")}\0`, 124, 12, "ascii");
    header.write("00000000000\0", 136, 12, "ascii");
    header.fill(0x20, 148, 156);
    header.write(type, 156, 1, "ascii");
    header.write("ustar\0", 257, 6, "ascii");
    const checksum = header.reduce((sum, byte) => sum + byte, 0);
    header.write(`${checksum.toString(8).padStart(6, "0")}\0 `, 148, 8, "ascii");
    records.push(header, payload, Buffer.alloc((512 - (payload.length % 512)) % 512));
  }
  records.push(Buffer.alloc(1024));
  return gzipSync(Buffer.concat(records));
}

test("locks exactly the four public package authorities", () => {
  assert.deepEqual(lock.packages.map(({ id }) => id).sort(), ["atom", "brick", "colors", "theme"]);
  assert.deepEqual(lock.packages.map(({ name }) => name).sort(), config.packages.map(({ name }) => name).sort());
  for (const source of lock.packages) {
    assert.match(source.archiveSha256, /^[a-f0-9]{64}$/u);
    assert.ok(source.archiveBytes > 0);
    assert.ok(source.snapshotFiles.length > 2);
  }
});

test("publishes closed version-matched package coverage", () => {
  assert.equal(index.schema, "flowstack.agent-delivery-index.v1");
  assert.equal(index.packages.length, 4);
  for (const item of index.packages) {
    const source = lock.packages.find(({ id }) => id === item.id);
    assert.equal(item.version, source.version);
    assert.equal(item.archiveSha256, source.archiveSha256);
    assert.equal(item.coverage.publicSurfaces, item.coverage.classifiedPublicSurfaces);
    assert.equal(item.coverage.failures, 0);
    assert.ok(item.counts.guides > 0);
    if (["atom", "brick"].includes(item.id)) assert.ok(item.counts.components > 0);
    if (["colors", "theme"].includes(item.id)) assert.ok(item.counts.operations > 0);
    assert.equal("blocks" in item.counts, false);
  }
});

test("keeps entrypoint, package, and task slices inside budgets while omitting an unqualified full corpus", async () => {
  assert.ok(index.corpus.llms.bytes <= index.budgets.llmsBytes);
  assert.equal((await readFile(join(root, "public", "llms.txt"))).length, index.corpus.llms.bytes);
  for (const route of index.routes.filter(({ kind }) => kind === "task")) assert.ok(route.bytes <= index.budgets.taskSliceBytes);
  for (const route of index.routes.filter(({ kind }) => kind === "package")) assert.ok(route.bytes <= index.budgets.packageSliceBytes);
  const publicRoot = await readdir(join(root, "public"));
  assert.equal(index.corpus.llmsFull, undefined);
  assert.equal(index.budgets.llmsFullBytes, undefined);
  assert.equal(publicRoot.includes("llms-full.txt"), false);
});

test("resolves every indexed destination and excludes private path markers", async () => {
  const paths = new Set(index.routes.map(({ path }) => path));
  for (const task of config.tasks) assert.ok(paths.has(`/tasks/${task.id}.txt`));
  for (const packageRecord of index.packages) assert.ok(paths.has(packageRecord.route));
  for (const route of index.routes) {
    const content = await readFile(join(root, "public", route.path.slice(1)), "utf8");
    assert.equal(Buffer.byteLength(content), route.bytes);
    assertPublicContent(content, route.path);
  }
});

test("uses explicit Brick-first task ownership with an explicit Atom headless exception", async () => {
  for (const taskId of ["layout", "forms", "navigation", "overlays", "data"]) {
    const content = await readFile(join(root, "public", "tasks", `${taskId}.txt`), "utf8");
    const finished = content.slice(content.indexOf("## Default: finished interface"), content.indexOf("## Explicit exception: headless behavior"));
    const headless = content.slice(content.indexOf("## Explicit exception: headless behavior"));
    assert.match(finished, /brick\/guide\/layer-selection/u);
    assert.match(finished, /brick\/guide\/interface-composition/u);
    assert.match(headless, /atom\/guide\/layer-selection/u);
    assert.match(headless, /atom\/guide\/behavior-composition/u);
    assert.ok(content.indexOf("## Default: finished interface") < content.indexOf("## Explicit exception: headless behavior"));
  }
});

test("curated task routes reject known substring false classifications", async () => {
  const task = async (id) => readFile(join(root, "public", "tasks", `${id}.txt`), "utf8");
  const layout = await task("layout");
  for (const id of ["checkbox", "checkbox-group", "combobox", "listbox", "tree-grid", "hover-card"]) {
    assert.doesNotMatch(layout, new RegExp(`/components/${id}\\.txt`, "u"));
  }
  const data = await task("data");
  assert.doesNotMatch(data, /\/components\/nav-list\.txt/u);
  assert.match(data, /\/components\/listbox\.txt/u);
  assert.match(data, /\/components\/tree-grid\.txt/u);
  const navigation = await task("navigation");
  assert.match(navigation, /\/components\/nav-list\.txt/u);
  assert.match(navigation, /\/components\/navigation-menu\.txt/u);
  assert.match(navigation, /\/components\/menubar\.txt/u);
  const overlays = await task("overlays");
  assert.match(overlays, /\/components\/hover-card\.txt/u);
  assert.doesNotMatch(overlays, /\/components\/(?:navigation-menu|menubar)\.txt/u);
  const forms = await task("forms");
  assert.match(forms, /\/components\/checkbox\.txt/u);
  assert.match(forms, /\/components\/combobox\.txt/u);
});

test("central public-boundary checks reject private machine paths", () => {
  assert.throws(() => assertPublicContent("read /private/private-product-note"), /private or machine-specific marker/u);
  assert.throws(() => assertPublicContent("read /Users/person/work"), /private or machine-specific marker/u);
  assert.doesNotThrow(() => assertPublicContent("Keep application policy private and use a Blueprint only when authorized."));
});

test("archive inspection rejects links, non-regular types, traversal, and private paths", () => {
  assert.doesNotThrow(() => assertSafeTarListing("atom", ["package/", "package/package.json"], ["drwxr-xr-x details", "-rw-r--r-- details"]));
  assert.throws(() => assertSafeTarListing("atom", ["package/link"], ["lrwxr-xr-x details -> /tmp/target"]), /link or non-regular/u);
  assert.throws(() => assertSafeTarListing("atom", ["package/hard"], ["hrw-r--r-- details link to package/file"]), /link or non-regular/u);
  assert.throws(() => assertSafeTarListing("atom", ["package/../outside"], ["-rw-r--r-- details"]), /escaping archive path/u);
  assert.throws(() => assertSafeTarListing("atom", ["package/private/note"], ["-rw-r--r-- details"]), /public boundary/u);
  assert.throws(() => assertSafeTarListing("atom", ["package/a", "package/b"], ["-rw-r--r-- details", "-rw-r--r-- details"], { maxEntries: 1 }), /exceeds 1 entries/u);
  assert.throws(() => assertSafeTarListing("atom", ["package/file"], ["-rw-rw-r-- details"]), /group-writable/u);
  assert.throws(() => assertSafeTarListing("atom", ["package/file"], ["-rw-r--r-T details"]), /unsafe special permissions/u);
  assert.deepEqual(safeTarExtractArgs("staged.tgz", "extract"), ["-xzf", "staged.tgz", "-C", "extract", "--no-same-owner", "--no-same-permissions"]);
});

test("archive ingestion stages verified bytes privately and enforces resource budgets before extraction", async () => {
  const temporary = await mkdtemp(join(tmpdir(), "flowstack-agent-tools-archive-"));
  try {
    const archive = tarArchive([["package/package.json", "{}\n"], ["package/dist/agents/manifest.json", "manifest\n"]]);
    const staged = await stageVerifiedArchive("atom", archive, temporary);
    const metadata = await stat(staged.path);
    assert.equal(metadata.mode & 0o777, 0o600);
    assert.deepEqual(await readFile(staged.path), archive);
    assert.equal(staged.bytes, archive.length);
    assert.match(staged.sha256, /^[a-f0-9]{64}$/u);

    const inspected = await assertArchiveResourceBudget("atom", staged.path, staged.bytes);
    assert.equal(inspected.entryCount, 2);
    assert.equal(inspected.payloadBytes, Buffer.byteLength("{}\nmanifest\n"));
    assert.throws(() => assertArchiveByteBudget("atom", staged.bytes, { maxArchiveBytes: staged.bytes - 1 }), /compressed archive exceeds/u);
    await assert.rejects(() => assertArchiveResourceBudget("atom", staged.path, staged.bytes, { maxEntryBytes: 2 }), /archive entry exceeds/u);
    await assert.rejects(() => assertArchiveResourceBudget("atom", staged.path, staged.bytes, { maxExpandedBytes: 512 }), /expanded archive exceeds/u);
    await assert.rejects(() => assertArchiveResourceBudget("atom", staged.path, staged.bytes, { maxExpansionRatio: 0, ratioSlackBytes: 0 }), /expansion ratio exceeds/u);
    const unsupportedPath = join(temporary, "unsupported.tgz");
    const unsupported = tarArchive([["package/sparse", "data", "S"]]);
    await writeFile(unsupportedPath, unsupported);
    await assert.rejects(() => assertArchiveResourceBudget("atom", unsupportedPath, unsupported.length), /unsupported tar header type/u);
  } finally {
    await rm(temporary, { recursive: true, force: true });
  }
});

test("generator and configuration do not read sibling repositories or workspace notes", async () => {
  const source = [
    await readFile(join(root, "scripts", "build-llms.mjs"), "utf8"),
    await readFile(join(root, "config", "delivery.json"), "utf8"),
  ].join("\n");
  assert.doesNotMatch(source, /(?:atom-ui|brick-ui|blocks-ui|themes\/package|colors\/package|\.\.\/\.\.\/docs)/u);
});
