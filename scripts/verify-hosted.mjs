import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

const root = resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
assert.deepEqual(args.slice(0, 1), ["--origin"], "usage: npm run host:verify -- --origin https://agents.example.com");
assert.equal(args.length, 2, "pass exactly one --origin value");

const origin = new URL(args[1]);
assert.equal(origin.protocol, "https:", "host verification requires an HTTPS origin");
assert.equal(origin.pathname, "/", "origin must not contain a path; generated routes are origin-root absolute");
assert.equal(origin.search, "");
assert.equal(origin.hash, "");

const localIndexBytes = await readFile(join(root, "public", "index.json"));
const index = JSON.parse(localIndexBytes);
const digest = (content) => createHash("sha256").update(content).digest("hex");
const browserCache = "public, max-age=0, must-revalidate";
const boundedCdnCache = "public, max-age=300, stale-while-revalidate=86400";

function assertSecurityHeaders(response, path) {
  assert.equal(response.headers.get("content-security-policy"), "default-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'", `${path} CSP drifted`);
  assert.equal(response.headers.get("cross-origin-resource-policy"), "cross-origin", `${path} resource policy drifted`);
  assert.equal(response.headers.get("referrer-policy"), "no-referrer", `${path} referrer policy drifted`);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff", `${path} content-type protection drifted`);
  assert.equal(response.headers.get("x-frame-options"), "DENY", `${path} framing protection drifted`);
  assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow, noarchive", `${path} robot policy drifted`);
  assert.match(response.headers.get("permissions-policy") ?? "", /camera=\(\)/u, `${path} permissions policy drifted`);
  assert.match(response.headers.get("strict-transport-security") ?? "", /max-age=63072000/u, `${path} transport security drifted`);
}

async function fetchExact(path) {
  const url = new URL(path, origin);
  const response = await fetch(url, { redirect: "error" });
  assert.equal(response.ok, true, `${url} returned HTTP ${response.status}`);
  assertSecurityHeaders(response, path);
  assert.equal(response.headers.get("access-control-allow-origin"), "*", `${path} static CORS drifted`);
  assert.equal(response.headers.get("cache-control"), browserCache, `${path} browser cache policy drifted`);
  const cdnPolicy = response.headers.get("vercel-cdn-cache-control");
  if (cdnPolicy !== null) assert.equal(cdnPolicy, boundedCdnCache, `${path} CDN cache policy drifted`);
  assert.match(response.headers.get("x-vercel-cache") ?? "", /^(?:HIT|MISS|STALE|PRERENDER)$/u, `${path} did not traverse Vercel's bounded CDN`);
  return { content: Buffer.from(await response.arrayBuffer()), response };
}

assert.deepEqual((await fetchExact("/index.json")).content, localIndexBytes, "hosted /index.json differs from checked generated output");

const expected = [
  { path: index.corpus.llms.path, bytes: index.corpus.llms.bytes, sha256: index.corpus.llms.sha256 },
  ...index.routes,
];

const concurrency = 12;
for (let offset = 0; offset < expected.length; offset += concurrency) {
  await Promise.all(expected.slice(offset, offset + concurrency).map(async (route) => {
    const { content } = await fetchExact(route.path);
    assert.equal(content.length, route.bytes, `${route.path} hosted byte count drifted`);
    assert.equal(digest(content), route.sha256, `${route.path} hosted digest drifted`);
  }));
}

const missing = await fetch(new URL("/llms-full.txt", origin), { redirect: "error" });
assert.equal(missing.status, 404, "unqualified /llms-full.txt must remain absent");
assertSecurityHeaders(missing, "/llms-full.txt");

async function mcpRequest(method, headers = {}, body) {
  const response = await fetch(new URL("/mcp", origin), { method, headers, body, redirect: "error" });
  assertSecurityHeaders(response, `/mcp ${method}`);
  assert.equal(response.headers.get("cache-control"), "no-store", `/mcp ${method} must not be cached`);
  assert.equal(response.headers.has("set-cookie"), false, `/mcp ${method} set a cookie`);
  assert.equal(response.headers.has("mcp-session-id"), false, `/mcp ${method} created a session`);
  return response;
}

for (const method of ["GET", "DELETE"]) {
  const response = await mcpRequest(method);
  assert.equal(response.status, 405, `/mcp ${method} must be rejected`);
  assert.equal(response.headers.get("allow"), "POST, OPTIONS");
}
const preflight = await mcpRequest("OPTIONS", { origin: origin.origin });
assert.equal(preflight.status, 204);
assert.equal(preflight.headers.get("access-control-allow-origin"), origin.origin);
assert.equal(preflight.headers.get("access-control-allow-methods"), "POST, OPTIONS");
const forbiddenOrigin = await mcpRequest("OPTIONS", { origin: "https://untrusted.example" });
assert.equal(forbiddenOrigin.status, 403);
assert.equal(forbiddenOrigin.headers.has("access-control-allow-origin"), false);
const mcpAccept = "application/json, text/event-stream";
assert.equal((await mcpRequest("POST", { accept: mcpAccept, "content-type": "text/plain" }, "{}")).status, 415);
assert.equal((await mcpRequest("POST", { accept: "application/json", "content-type": "application/json" }, "{}")).status, 406);
assert.equal((await mcpRequest("POST", { accept: mcpAccept, "content-type": "application/json" }, "x".repeat(256 * 1024 + 1))).status, 413);
const legacy = await mcpRequest("POST", { accept: mcpAccept, "content-type": "application/json" }, JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-11-25", capabilities: {}, clientInfo: { name: "host-verifier", version: "1" } } }));
assert.equal(legacy.status, 400, "hosted MCP must reject the legacy protocol");

const checkedResponses = [];
const transport = new StreamableHTTPClientTransport(new URL("/mcp", origin), { fetch: async (input, init) => {
  const response = await fetch(input, { ...init, redirect: "error" });
  assertSecurityHeaders(response, "/mcp official client");
  checkedResponses.push(response);
  return response;
} });
const client = new Client({ name: "flowstack-host-verifier", version: "1.0.0" }, { versionNegotiation: { mode: "auto", probe: { timeoutMs: 5000 } } });
try {
  await client.connect(transport);
  assert.equal(client.getNegotiatedProtocolVersion(), "2026-07-28", "hosted MCP did not negotiate the current protocol");
  assert.match(client.getInstructions() ?? "", /exact FLOWSTACK package versions/u, "hosted MCP instructions drifted");
  const tools = await client.listTools();
  assert.equal(tools.tools.length, 11, "hosted MCP tool inventory drifted");
  assert.ok(tools.tools.every(({ annotations }) => annotations.readOnlyHint === true && annotations.destructiveHint === false && annotations.idempotentHint === true && annotations.openWorldHint === false), "hosted MCP tool safety annotations drifted");
  const result = await client.callTool({ name: "list_flowstack_packages", arguments: {} });
  assert.notEqual(result.isError, true, "hosted MCP package inventory failed");
  const value = result.structuredContent ?? JSON.parse(result.content.find(({ type }) => type === "text").text);
  assert.equal(value.data.length, index.packages.length, "hosted MCP package count differs from the delivery index");
  assert.ok(value.data.every(({ source, provenance }) => source === "locked-source" && provenance.source === "locked-source"), "hosted MCP escaped locked-only source policy");
  assert.deepEqual(value.data.map(({ name, version }) => ({ name, version })).sort((a, b) => a.name.localeCompare(b.name)), index.packages.map(({ name, version }) => ({ name, version })).sort((a, b) => a.name.localeCompare(b.name)), "hosted MCP package identities differ from the delivery index");
  assert.ok(checkedResponses.every((response) => response.headers.get("cache-control") === "no-store" && !response.headers.has("set-cookie") && !response.headers.has("mcp-session-id")), "official MCP exchange violated stateless no-store policy");
} finally {
  await client.close();
}

console.log(`Verified ${expected.length} hosted Agent Knowledge routes and locked-only 11-tool MCP at ${origin.origin}.`);
