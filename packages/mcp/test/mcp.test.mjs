import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { once } from "node:events";
import { mkdtemp, mkdir, rm, symlink, unlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { FlowstackRepository } from "../src/repository.mjs";
import { assertPublicArtifact, assertPublicRequest, assertPublicResponse, publicErrorMessage } from "../src/privacy.mjs";
import { FlowstackTools } from "../src/tools.mjs";
import registry from "../generated/tool-registry.json" with { type: "json" };

const root = resolve(import.meta.dirname, "..");
const bin = join(root, "bin/flowstack-mcp.mjs");
const sourceLock = resolve(root, "../../sources/lock.json");

async function client(mode = "legacy") {
  const transport = new StdioClientTransport({ command: process.execPath, args: [bin, "--source-lock", sourceLock], cwd: root, stderr: "pipe" });
  const instance = new Client({ name: "flowstack-mcp-test", version: "1.0.0" }, { versionNegotiation: mode === "modern" ? { mode: "auto", probe: { timeoutMs: 2000 } } : { mode: "legacy" } });
  await instance.connect(transport);
  return { instance, transport };
}

function structured(result) {
  return result.structuredContent ?? JSON.parse(result.content.find(({ type }) => type === "text").text);
}

function snapshot(path, content) {
  return { path, bytes: Buffer.byteLength(content), sha256: createHash("sha256").update(content).digest("hex") };
}

const ALL_TOOL_CALLS = [
  ["list_flowstack_packages", {}],
  ["list_components", { package: "atom", version: "0.24.0", source: "locked", query: "button" }],
  ["resolve_interface_job", { workflow: "finished", job: "bounded page width", versions: { brick: "0.1.11", atom: "0.24.0" }, source: "locked" }],
  ["get_package_guide", { package: "atom", version: "0.24.0", source: "locked", guide: "layer-selection" }],
  ["get_component_guidance", { package: "atom", version: "0.24.0", source: "locked", id: "button" }],
  ["get_component_props", { package: "atom", version: "0.24.0", source: "locked", component: "button" }],
  ["get_component_examples", { package: "atom", version: "0.24.0", source: "locked", component: "button", limit: 2 }],
  ["get_theme_contract", { version: "0.1.11", source: "locked" }],
  ["search_docs", { package: "brick", version: "0.1.11", source: "locked", query: "CSS", limit: 3 }],
  ["validate_composition", { package: "brick", version: "0.1.11", source: "locked", owner: "button", composition: { parts: [{ id: "action", component: "Button", props: { "aria-label": "Save" } }], relationships: [], imports: ["@flowstack-ui/brick/button"], styles: ["styles.css", "button.css"] } }],
  ["create_gap_report", { package: "brick", version: "0.1.11", source: "locked", interfaceJob: "A public custom control", searchedOwners: ["button"], evidence: [{ owner: "button", artifact: "agents/button.json", finding: "The exact owner lacks the required public option." }], missingCapability: "A supported public property", proposedOwner: "brick", fallback: { owner: "brick", layer: "finished-interface", description: "Use the closest supported Brick or semantic native route." }, verification: ["Keyboard review"] }]
];

for (const mode of ["modern", "legacy"]) {
  test(`official ${mode} JSON-RPC client lists and calls all 11 generated tools`, async () => {
    const { instance } = await client(mode);
    try {
      assert.equal(instance.getNegotiatedProtocolVersion(), mode === "modern" ? "2026-07-28" : "2025-11-25");
      const listed = await instance.listTools();
      assert.deepEqual(listed.tools.map(({ name }) => name).sort(), registry.tools.map(({ name }) => name).sort());
      assert.equal(ALL_TOOL_CALLS.length, 11);
      for (const [name, argumentsValue] of ALL_TOOL_CALLS) {
        const result = await instance.callTool({ name, arguments: argumentsValue });
        assert.notEqual(result.isError, true, `${mode} ${name} returned ${result.content?.[0]?.text}`);
        const value = structured(result);
        assert.equal(typeof value.package, "string", `${name} omitted package`);
        assert.equal(typeof value.layer, "string", `${name} omitted layer`);
        assert.equal(typeof value.version, "string", `${name} omitted version`);
        assert.equal(typeof value.provenance, "object", `${name} omitted provenance`);
      }
    } finally { await instance.close(); }
  });
}

test("workflow routing cannot misroute finished, headless, or theming work", async () => {
  const tools = new FlowstackTools(await new FlowstackRepository({ sourceLock }).initialize());
  const finishedMissing = await tools.invoke("resolveInterfaceJob", { workflow: "finished", job: "action", versions: { atom: "0.24.0" }, source: "locked" });
  assert.equal(finishedMissing.isError, true);
  assert.equal(structured(finishedMissing).attempted.workflow, "finished");
  const finished = structured(await tools.invoke("resolveInterfaceJob", { workflow: "finished", job: "bounded page width", versions: { brick: "0.1.11", atom: "0.24.0" }, source: "locked" }));
  assert.ok(finished.data.length > 0 && finished.data.every(({ package: name }) => name === "@flowstack-ui/brick"));
  assert.ok(finished.data.every(({ provenance }) => provenance.version === "0.1.11"));
  assert.ok(finished.data.every(({ selectionId, intentId }) => typeof selectionId === "string" && typeof intentId === "string"));
  const ambiguous = structured(await tools.invoke("resolveInterfaceJob", { workflow: "finished", job: "responsive form field", versions: { brick: "0.1.11", atom: "0.24.0" }, source: "locked" }));
  assert.ok(ambiguous.availability === "selection-gap" || ambiguous.data.every(({ destinations }) => destinations.some(({ id }) => id === "field" || id === "form")));
  assert.ok(ambiguous.data.every(({ destinations }) => destinations.every(({ id }) => id !== "toast" && id !== "native-quotation")));
  const headlessMissing = await tools.invoke("resolveInterfaceJob", { workflow: "headless", job: "keyboard action", versions: { brick: "0.1.11" }, source: "locked" });
  assert.equal(headlessMissing.isError, true);
  const themeMissing = await tools.invoke("resolveInterfaceJob", { workflow: "theming", job: "palette candidate", versions: { colors: "0.1.1" }, source: "locked" });
  assert.equal(themeMissing.isError, true);
});

test("every hash-locked package guide remains readable as admitted public authority", async () => {
  const repository = await new FlowstackRepository({ sourceLock }).initialize();
  const tools = new FlowstackTools(repository);
  const exact = { atom: "0.24.0", brick: "0.1.11", colors: "0.1.1", theme: "0.1.1" };
  let guideCount = 0;
  for (const [packageId, version] of Object.entries(exact)) {
    const handle = await repository.resolvePackage(packageId, version, "locked");
    const packageManifest = await handle.readJson(`${handle.agentRoot}/manifest.json`);
    for (const guide of packageManifest.guides ?? []) {
      const result = await tools.invoke("getPackageGuide", { package: packageId, version, source: "locked", guide: guide.id });
      assert.notEqual(result.isError, true, `${packageId}/${guide.id} should remain admitted public authority`);
      const value = structured(result);
      assert.equal(value.provenance.publicAuthority, "hash-locked-package-artifact");
      assert.equal(value.data.id, guide.id);
      guideCount += 1;
    }
  }
  assert.equal(guideCount, 6);
});

test("structured composition validation never passes absent anatomy and exposes checkable and manual rules", async () => {
  const tools = new FlowstackTools(await new FlowstackRepository({ sourceLock }).initialize());
  const absent = structured(await tools.invoke("validateComposition", { package: "brick", version: "0.1.11", source: "locked", owner: "button", composition: { parts: [], relationships: [], imports: [], styles: ["styles.css", "button.css"] } }));
  assert.equal(absent.data.valid, false);
  assert.ok(absent.data.findings.some(({ code }) => code === "absent-anatomy"));
  assert.ok(absent.data.manualValidations.length > 0);
  const dialog = structured(await tools.invoke("validateComposition", { package: "atom", version: "0.24.0", source: "locked", owner: "dialog", composition: { parts: [{ id: "overlay", component: "DialogOverlay", props: {} }, { id: "content", component: "DialogContent", props: { "aria-label": "Preferences" } }], relationships: [{ type: "contains", from: "overlay", to: "content" }], imports: ["@flowstack-ui/atom/dialog"], styles: [] } }));
  assert.equal(dialog.data.valid, false);
  assert.ok(dialog.data.rules.some(({ id, status }) => id.includes("sibling-overlay") && status === "fail"));
  const badge = structured(await tools.invoke("validateComposition", { package: "brick", version: "0.1.11", source: "locked", owner: "notification-badge", composition: { parts: [{ id: "badge", component: "NotificationBadge", props: { count: 3 } }, { id: "button", component: "Button", props: { "aria-label": "Notifications: 3 unread" } }], relationships: [{ type: "wraps", from: "badge", to: "button" }], imports: ["@flowstack-ui/brick/badge", "@flowstack-ui/brick/button"], styles: ["styles.css", "badge.css", "button.css"] } }));
  assert.ok(badge.data.rules.some(({ id, status }) => id === "notification-badge-one-child" && status === "pass"));
  assert.ok(badge.data.rules.some(({ id, status }) => id === "notification-badge-mode" && status === "pass"));
  assert.equal(badge.data.valid, false, "uncheckable must rules require manual review");
});

test("gap reports link every owner to exact evidence without claiming semantic proof and reject structured Atom fallbacks", async () => {
  const tools = new FlowstackTools(await new FlowstackRepository({ sourceLock }).initialize());
  const unsafe = structured(await tools.invoke("createGapReport", { package: "brick", version: "0.1.11", source: "locked", interfaceJob: "Custom action", searchedOwners: ["button"], evidence: [{ owner: "button", artifact: "agents/button.json", finding: "Purple elephants prove this arbitrary nonsense claim." }], missingCapability: "Custom option", proposedOwner: "atom", fallback: { owner: "atom", layer: "behavior", description: "Use Atom Button directly" }, verification: ["Keyboard review"] }));
  assert.equal(unsafe.data.structuralValidation, false);
  assert.equal(unsafe.data.claimValidation.status, "not-semantically-verified");
  assert.equal(unsafe.data.status, "evidence-linked-proposal");
  assert.ok(unsafe.data.findings.some(({ code }) => code === "brick-direct-atom-fallback"));
  assert.ok(unsafe.data.findings.some(({ code }) => code === "unsafe-proposed-owner"));
  const unknown = await tools.invoke("createGapReport", { package: "brick", version: "0.1.11", source: "locked", interfaceJob: "Custom action", searchedOwners: ["not-a-real-owner"], evidence: [{ owner: "not-a-real-owner", artifact: "agents/button.json", finding: "Claim" }], missingCapability: "Custom option", proposedOwner: "brick", fallback: { owner: "brick", layer: "finished-interface", description: "Use a native button" }, verification: ["Keyboard review"] });
  assert.equal(unknown.isError, true);
  assert.equal(structured(unknown).attempted.version, "0.1.11");
  const missingEvidence = await tools.invoke("createGapReport", { package: "brick", version: "0.1.11", source: "locked", interfaceJob: "Custom action", searchedOwners: ["button", "link"], evidence: [{ owner: "button", artifact: "agents/button.json", finding: "Claim" }], missingCapability: "Custom option", proposedOwner: "brick", fallback: { owner: "brick", layer: "finished-interface", description: "Use an existing route" }, verification: ["Keyboard review"] });
  assert.equal(missingEvidence.isError, true);
  assert.match(structured(missingEvidence).error.message, /requires at least one exact artifact evidence/u);
});

test("unavailable versions and private content are explicit errors", async () => {
  const repository = await new FlowstackRepository({ sourceLock }).initialize();
  const tools = new FlowstackTools(repository);
  const unavailable = await tools.invoke("getPackageGuide", { package: "atom", version: "9.9.9", source: "locked", guide: "layer-selection" });
  assert.equal(unavailable.isError, true);
  assert.match(structured(unavailable).error.message, /unavailable/u);
  const rejected = await tools.invoke("createGapReport", { package: "brick", version: "0.1.11", source: "locked", interfaceJob: "private blueprint", searchedOwners: ["button"], evidence: [{ owner: "button", artifact: "agents/button.json", finding: "x" }], missingCapability: "x", proposedOwner: "brick", fallback: { owner: "brick", layer: "finished-interface", description: "x" }, verification: ["x"] });
  assert.equal(rejected.isError, true);
  assert.equal(structured(rejected).error.message, "private-content marker rejected");
});

test("privacy checks reject and redact machine paths across request, artifact, response, and error boundaries", () => {
  const paths = [
    "/Users/Alice/Flowstack/private.txt",
    "/HOME/Alice/Flowstack/private.txt",
    "/private/var/folders/source.json",
    "/var/folders/zz/cache/source.json",
    "/tmp/flowstack/source.json",
    String.raw`C:\Users\Alice\Flowstack\source.json`,
  ];
  for (const path of paths) {
    assert.throws(() => assertPublicRequest({ path }), /machine-specific path rejected/u);
    assert.throws(() => assertPublicArtifact(path), /artifact path rejected/u);
    assert.throws(() => assertPublicResponse({ path }), /response would expose a machine-specific path/u);
  }

  const message = publicErrorMessage(new Error(`failed at ${paths.join(" and ")}`));
  assert.doesNotMatch(message, /Alice|\/private\/|\/var\/folders\/|\/tmp\/|[A-Za-z]:\\Users\\/iu);
  assert.match(message, /<local-path>/u);
  assert.doesNotThrow(() => assertPublicRequest({ guidance: "Keep implementation details private." }));
});

test("exact project-installed fixtures expose declarations without version substitution", async () => {
  const temporary = await mkdtemp(join(tmpdir(), "flowstack-mcp-installed-"));
  const packageRoot = join(temporary, "node_modules/@flowstack-ui/atom");
  const brickRoot = join(temporary, "node_modules/@flowstack-ui/brick");
  try {
    await mkdir(join(packageRoot, "dist/agents"), { recursive: true });
    await mkdir(join(packageRoot, "docs"), { recursive: true });
    await mkdir(join(brickRoot, "dist/agents"), { recursive: true });
    await writeFile(join(temporary, "package.json"), "{\"private\":true}\n");
    await writeFile(join(packageRoot, "package.json"), `${JSON.stringify({ name: "@flowstack-ui/atom", version: "1.2.3", type: "module", files: ["README.md"], exports: { "./package.json": "./package.json", "./button": { types: "./dist/button.d.ts", default: "./dist/button.js" } } }, null, 2)}\n`);
    await writeFile(join(packageRoot, "dist/button.d.ts"), "export interface ButtonProps { api_key?: string; disabled?: boolean }\n");
    await writeFile(join(packageRoot, "dist/agents/manifest.json"), `${JSON.stringify({ package: "@flowstack-ui/atom", packageVersion: "1.2.3", components: [{ id: "button", name: "Button", json: "./button.json", markdown: "./button.md" }], guides: [] })}\n`);
    await writeFile(join(packageRoot, "dist/agents/coverage.json"), `${JSON.stringify({ package: "@flowstack-ui/atom", packageVersion: "1.2.3", components: [{ id: "button", publicSubpaths: ["./button"], publicSymbols: ["Button", "ButtonProps"], publicValueSymbols: ["Button"] }], failures: [] })}\n`);
    await writeFile(join(packageRoot, "dist/agents/button.json"), "{\"id\":\"button\"}\n");
    await writeFile(join(packageRoot, "dist/agents/button.md"), "# Button\n");
    await writeFile(join(packageRoot, "README.md"), "# Examples\n\n~~~tsx\nimport { Button } from '@flowstack-ui/atom/button'\n<Button>Save</Button>\n~~~\n\n```tsx\n<Button>Not canonical without an import</Button>\n```\n\n```tsx\nimport { Button } from '@flowstack-ui/atom/button'\n");
    await writeFile(join(packageRoot, "docs/secret.md"), "UNALLOWLISTED_SENTINEL\n");
    const tools = new FlowstackTools(await new FlowstackRepository({ projectRoot: temporary }).initialize());
    const result = structured(await tools.invoke("getComponentProps", { package: "atom", version: "1.2.3", source: "installed", component: "button" }));
    assert.equal(result.provenance.source, "project-installed");
    assert.equal(result.provenance.publicAuthority, "allowlisted-installed-package-artifact");
    assert.match(result.data.declarations, /ButtonProps/u);
    const examples = structured(await tools.invoke("getComponentExamples", { package: "atom", version: "1.2.3", source: "installed", component: "button", limit: 10 }));
    assert.equal(examples.data.examples.length, 1);
    assert.match(examples.data.examples[0].code, /from '@flowstack-ui\/atom\/button'/u);
    const search = structured(await tools.invoke("searchDocs", { package: "atom", version: "1.2.3", source: "installed", query: "UNALLOWLISTED_SENTINEL", limit: 10 }));
    assert.deepEqual(search.data, []);
    await writeFile(join(brickRoot, "package.json"), `${JSON.stringify({ name: "@flowstack-ui/brick", version: "2.3.4", type: "module", exports: { "./package.json": "./package.json", "./badge": { types: "./dist/badge.d.ts", default: "./dist/badge.js" } } }, null, 2)}\n`);
    await writeFile(join(brickRoot, "dist/badge.d.ts"), "export interface NotificationBadgeProps { count?: number }\n");
    await writeFile(join(brickRoot, "dist/agents/manifest.json"), `${JSON.stringify({ package: "@flowstack-ui/brick", packageVersion: "2.3.4", components: [{ id: "notification-badge", name: "NotificationBadge", json: "./notification-badge.json", markdown: "./notification-badge.md" }], guides: [] })}\n`);
    await writeFile(join(brickRoot, "dist/agents/coverage.json"), `${JSON.stringify({ package: "@flowstack-ui/brick", packageVersion: "2.3.4", components: [{ id: "notification-badge", publicSubpaths: ["./badge"], publicSymbols: ["NotificationBadge", "NotificationBadgeProps"], publicValueSymbols: ["NotificationBadge"] }], failures: [] })}\n`);
    await writeFile(join(brickRoot, "dist/agents/notification-badge.json"), "{\"id\":\"notification-badge\"}\n");
    await writeFile(join(brickRoot, "dist/agents/notification-badge.md"), "# NotificationBadge\n");
    const notificationProps = structured(await tools.invoke("getComponentProps", { package: "brick", version: "2.3.4", source: "installed", component: "notification-badge" }));
    assert.equal(notificationProps.data.canonicalMapping.publicSubpath, "./badge");
    assert.match(notificationProps.data.declarations, /NotificationBadgeProps/u);
    const wrong = await tools.invoke("getComponentProps", { package: "atom", version: "1.2.4", source: "installed", component: "button" });
    assert.equal(wrong.isError, true);
    await writeFile(join(temporary, "outside.d.ts"), "export interface Escaped {}\n");
    await unlink(join(packageRoot, "dist/button.d.ts"));
    await symlink(join(temporary, "outside.d.ts"), join(packageRoot, "dist/button.d.ts"));
    const escaped = await tools.invoke("getComponentProps", { package: "atom", version: "1.2.3", source: "installed", component: "button" });
    assert.equal(escaped.isError, true);
    assert.match(structured(escaped).error.message, /symlink/u);
  } finally { await rm(temporary, { recursive: true, force: true }); }
});

test("unsafe source locks, arbitrary URLs, and stdout contamination are rejected", async () => {
  const temporary = await mkdtemp(join(tmpdir(), "flowstack-mcp-security-"));
  try {
    const lock = join(temporary, "lock.json");
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [{ id: "atom", name: "@flowstack-ui/atom", version: "1.0.0", archive: "https://example.test/atom.tgz", snapshotFiles: [] }] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /must not be a URL/u);
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [{ id: "atom", name: "@flowstack-ui/atom", version: "1.0.0", archive: "../atom.tgz", snapshotFiles: [{ path: "../private.md", bytes: 0, sha256: "0".repeat(64) }] }] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /tgz basename/u);
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [{ id: "atom", name: "@flowstack-ui/atom", version: "1.0.0", archive: "atom.tgz", archiveBytes: 1, archiveSha256: "a".repeat(64), snapshotFiles: [{ path: "../private.md", bytes: 1, sha256: "a".repeat(64) }] }] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /path traversal/u);
    const required = ["package.json", "agents/manifest.json", "agents/coverage.json"].map((path) => ({ path, bytes: 1, sha256: "a".repeat(64) }));
    const validEntry = { id: "atom", name: "@flowstack-ui/atom", version: "1.0.0", archive: "atom.tgz", archiveBytes: 1, archiveSha256: "a".repeat(64), snapshotFiles: required };
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [validEntry, validEntry] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /duplicate locked package/u);
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [{ ...validEntry, snapshotFiles: [...required, required[0]] }] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /duplicate snapshot path/u);
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [{ ...validEntry, archiveBytes: 0 }] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /archiveBytes must be positive/u);
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [{ ...validEntry, archiveSha256: "not-a-hash" }] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /archiveSha256/u);
    await writeFile(lock, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [{ ...validEntry, snapshotFiles: required.slice(0, 2) }] })}\n`);
    await assert.rejects(() => new FlowstackRepository({ sourceLock: lock }).initialize(), /missing required agents\/coverage.json/u);
    const child = spawn(process.execPath, [bin, "--source-lock", "https://example.test/lock.json"], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    let stdout = "";
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    const [code] = await once(child, "exit");
    assert.notEqual(code, 0);
    assert.equal(stdout, "");
  } finally { await rm(temporary, { recursive: true, force: true }); }
});

test("locked artifacts reject symlink segments even when lock metadata matches the target", async () => {
  const temporary = await mkdtemp(join(tmpdir(), "flowstack-mcp-locked-symlink-"));
  const packageRoot = join(temporary, "packages/atom/1.0.0");
  try {
    await mkdir(join(packageRoot, "agents"), { recursive: true });
    const files = new Map([
      ["package.json", "{\"name\":\"@flowstack-ui/atom\",\"version\":\"1.0.0\"}\n"],
      ["agents/manifest.json", "{\"package\":\"@flowstack-ui/atom\",\"packageVersion\":\"1.0.0\",\"components\":[{\"id\":\"button\",\"name\":\"Button\",\"json\":\"./button.json\",\"markdown\":\"./button.md\"}],\"guides\":[]}\n"],
      ["agents/coverage.json", "{\"package\":\"@flowstack-ui/atom\",\"packageVersion\":\"1.0.0\",\"components\":[{\"id\":\"button\",\"publicSubpaths\":[\"./button\"],\"publicSymbols\":[\"Button\"],\"publicValueSymbols\":[\"Button\"]}],\"failures\":[]}\n"],
      ["agents/button.json", "{\"id\":\"button\"}\n"],
      ["agents/button.md", "# Button\n"]
    ]);
    for (const [path, content] of files) if (path !== "agents/button.json") await writeFile(join(packageRoot, path), content);
    await writeFile(join(temporary, "outside.json"), files.get("agents/button.json"));
    await symlink(join(temporary, "outside.json"), join(packageRoot, "agents/button.json"));
    const lock = { schema: "flowstack.agent-source-lock.v1", packages: [{ id: "atom", name: "@flowstack-ui/atom", version: "1.0.0", archive: "flowstack-ui-atom-1.0.0.tgz", archiveBytes: 1, archiveSha256: "a".repeat(64), snapshotFiles: [...files].map(([path, content]) => snapshot(path, content)) }] };
    const lockPath = join(temporary, "lock.json");
    await writeFile(lockPath, `${JSON.stringify(lock)}\n`);
    const tools = new FlowstackTools(await new FlowstackRepository({ sourceLock: lockPath }).initialize());
    const result = await tools.invoke("getComponentGuidance", { package: "atom", version: "1.0.0", source: "locked", id: "button" });
    assert.equal(result.isError, true);
    assert.match(structured(result).error.message, /symlink/u);
  } finally { await rm(temporary, { recursive: true, force: true }); }
});

test("locked package metadata rejects resolve-time digest and byte drift before attestation", async () => {
  const temporary = await mkdtemp(join(tmpdir(), "flowstack-mcp-metadata-drift-"));
  const packageRoot = join(temporary, "packages/atom/1.0.0");
  const original = "{\"name\":\"@flowstack-ui/atom\",\"version\":\"1.0.0\"}\n";
  try {
    await mkdir(packageRoot, { recursive: true });
    await writeFile(join(packageRoot, "package.json"), original);
    const entry = {
      id: "atom",
      name: "@flowstack-ui/atom",
      version: "1.0.0",
      archive: "flowstack-ui-atom-1.0.0.tgz",
      archiveBytes: 1,
      archiveSha256: "a".repeat(64),
      snapshotFiles: [snapshot("package.json", original), snapshot("agents/manifest.json", "x"), snapshot("agents/coverage.json", "x")]
    };
    const lockPath = join(temporary, "lock.json");
    await writeFile(lockPath, `${JSON.stringify({ schema: "flowstack.agent-source-lock.v1", packages: [entry] })}\n`);
    const repository = await new FlowstackRepository({ sourceLock: lockPath }).initialize();

    const digestDrift = original.replace("@flowstack-ui/atom", "@flowstack-ui/atxm");
    assert.equal(Buffer.byteLength(digestDrift), Buffer.byteLength(original));
    await writeFile(join(packageRoot, "package.json"), digestDrift);
    await assert.rejects(() => repository.resolvePackage("atom", "1.0.0", "locked"), /locked artifact digest drift: package\.json/u);

    await writeFile(join(packageRoot, "package.json"), `${original} `);
    await assert.rejects(() => repository.resolvePackage("atom", "1.0.0", "locked"), /locked artifact byte drift: package\.json/u);
  } finally { await rm(temporary, { recursive: true, force: true }); }
});
