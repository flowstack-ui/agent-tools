import assert from "node:assert/strict";
import { resolve } from "node:path";
import test from "node:test";
import { Client } from "@modelcontextprotocol/client";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/client";
import { createFlowstackHttpHandler, HTTP_MCP_MAX_BODY_BYTES } from "../src/http.mjs";

const sourceLock = resolve(import.meta.dirname, "../../../sources/lock.json");

function webFetch(handler, responses = []) {
  return async (input, init) => {
    const response = await handler.fetch(new Request(input, init));
    responses.push(response);
    return response;
  };
}

function structured(result) {
  return result.structuredContent ?? JSON.parse(result.content.find(({ type }) => type === "text").text);
}

for (const mode of ["modern", "legacy"]) test(`hosted HTTP MCP serves exact locked knowledge through the official ${mode} client`, async () => {
  const handler = await createFlowstackHttpHandler({ sourceLock, allowedHostnames: ["agents.test"], allowedOrigins: ["https://agents.test"] });
  const responses = [];
  const transport = new StreamableHTTPClientTransport(new URL("https://agents.test/mcp"), { fetch: webFetch(handler, responses) });
  const client = new Client({ name: "flowstack-http-test", version: "1.0.0" }, { versionNegotiation: mode === "modern" ? { mode: "auto", probe: { timeoutMs: 2000 } } : { mode: "legacy" } });
  try {
    await client.connect(transport);
    assert.equal(client.getNegotiatedProtocolVersion(), mode === "modern" ? "2026-07-28" : "2025-11-25");
    assert.match(client.getInstructions(), /exact FLOWSTACK package versions/u);
    assert.match(client.getInstructions(), /begin with Brick/u);
    assert.match(client.getInstructions(), /Private Blocks/u);
    const listed = await client.listTools();
    assert.equal(listed.tools.length, 11);
    assert.ok(listed.tools.every(({ annotations }) => annotations.readOnlyHint === true && annotations.destructiveHint === false && annotations.idempotentHint === true && annotations.openWorldHint === false));
    const packages = structured(await client.callTool({ name: "list_flowstack_packages", arguments: {} }));
    assert.equal(packages.data.length, 4);
    assert.ok(packages.data.every(({ source, provenance }) => source === "locked-source" && provenance.source === "locked-source"));
    const components = structured(await client.callTool({ name: "list_components", arguments: { package: "brick", version: "0.1.12", query: "color" } }));
    assert.ok(components.data.some(({ id }) => id === "color-picker"));
    assert.ok(components.data.every(({ provenance }) => provenance.source === "locked-source"));
    const installed = await client.callTool({ name: "list_components", arguments: { package: "brick", version: "0.1.12", source: "installed" } });
    assert.equal(installed.isError, true);
    assert.match(structured(installed).error.message, /locked-only repository policy/u);
    assert.ok(responses.every((response) => response.headers.get("cache-control") === "no-store"));
    assert.ok(responses.every((response) => !response.headers.has("set-cookie") && !response.headers.has("mcp-session-id")));
  } finally {
    await client.close();
    await handler.close();
  }
});

test("hosted HTTP MCP rejects untrusted hosts and origins and handles CORS preflight", async () => {
  const handler = await createFlowstackHttpHandler({ sourceLock, allowedHostnames: ["agents.test"], allowedOrigins: ["https://agents.test"] });
  try {
    const host = await handler.fetch(new Request("https://evil.test/mcp", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" }));
    assert.equal(host.status, 403);
    assert.equal(host.headers.get("cache-control"), "no-store");
    const origin = await handler.fetch(new Request("https://agents.test/mcp", { method: "POST", headers: { "content-type": "application/json", origin: "https://evil.test" }, body: "{}" }));
    assert.equal(origin.status, 403);
    assert.equal(origin.headers.has("access-control-allow-origin"), false);
    const malformedOrigin = await handler.fetch(new Request("https://agents.test/mcp", { method: "POST", headers: { "content-type": "application/json", origin: "not a URL" }, body: "{}" }));
    assert.equal(malformedOrigin.status, 403);
    const preflight = await handler.fetch(new Request("https://agents.test/mcp", { method: "OPTIONS", headers: { origin: "https://agents.test" } }));
    assert.equal(preflight.status, 204);
    assert.equal(preflight.headers.get("access-control-allow-origin"), "https://agents.test");
    assert.match(preflight.headers.get("access-control-allow-headers"), /MCP-Protocol-Version/u);
    assert.equal(preflight.headers.get("access-control-allow-methods"), "POST, OPTIONS");
    const missing = await handler.fetch(new Request("https://agents.test/not-mcp"));
    assert.equal(missing.status, 404);
  } finally {
    await handler.close();
  }
});

test("hosted HTTP MCP enforces its bounded JSON-only request matrix", async () => {
  const handler = await createFlowstackHttpHandler({ sourceLock, allowedHostnames: ["agents.test"], allowedOrigins: ["https://agents.test"] });
  const headers = { accept: "application/json, text/event-stream", "content-type": "application/json" };
  try {
    for (const method of ["GET", "DELETE"]) {
      const response = await handler.fetch(new Request("https://agents.test/mcp", { method }));
      assert.equal(response.status, 405);
      assert.equal(response.headers.get("allow"), "POST, OPTIONS");
    }
    const contentType = await handler.fetch(new Request("https://agents.test/mcp", { method: "POST", headers: { ...headers, "content-type": "text/plain" }, body: "{}" }));
    assert.equal(contentType.status, 415);
    const accept = await handler.fetch(new Request("https://agents.test/mcp", { method: "POST", headers: { ...headers, accept: "application/json" }, body: "{}" }));
    assert.equal(accept.status, 406);
    const oversized = await handler.fetch(new Request("https://agents.test/mcp", { method: "POST", headers, body: "x".repeat(HTTP_MCP_MAX_BODY_BYTES + 1) }));
    assert.equal(oversized.status, 413);
    const legacy = await handler.fetch(new Request("https://agents.test/mcp", { method: "POST", headers, body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "codex-compatible", version: "1" } } }) }));
    assert.equal(legacy.status, 200);
    assert.match(await legacy.text(), /"protocolVersion":"2025-06-18"/u);
    assert.equal(legacy.headers.get("cache-control"), "no-store");
    assert.equal(legacy.headers.has("set-cookie"), false);
    assert.equal(legacy.headers.has("mcp-session-id"), false);
  } finally {
    await handler.close();
  }
});

test("locked-only repository policy requires a lock before opening the endpoint", async () => {
  await assert.rejects(() => createFlowstackHttpHandler({ allowedHostnames: ["agents.test"], allowedOrigins: [] }), /requires an explicit source lock/u);
});
