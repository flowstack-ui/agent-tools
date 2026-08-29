import assert from "node:assert/strict";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { createFlowstackServerFactory } from "./server.mjs";

export const HTTP_MCP_MAX_BODY_BYTES = 256 * 1024;

function hostname(value) {
  return String(value).toLowerCase().replace(/:\d+$/u, "");
}

function parseOrigin(value) {
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol)) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

function jsonError(status, message, headers = {}) {
  return Response.json({ jsonrpc: "2.0", error: { code: -32600, message }, id: null }, { status, headers });
}

function secure(response, request, allowOrigin = false) {
  const headers = new Headers(response.headers);
  const origin = request.headers.get("origin");
  if (allowOrigin && origin) {
    headers.set("access-control-allow-origin", origin);
    headers.set("vary", [headers.get("vary"), "Origin"].filter(Boolean).join(", "));
  } else headers.delete("access-control-allow-origin");
  headers.set("access-control-expose-headers", "MCP-Protocol-Version");
  headers.set("cache-control", "no-store");
  headers.set("x-content-type-options", "nosniff");
  headers.delete("mcp-session-id");
  headers.delete("set-cookie");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

function acceptsMcp(request) {
  const values = (request.headers.get("accept") ?? "").toLowerCase().split(",").map((value) => value.split(";", 1)[0].trim());
  return values.includes("application/json") && values.includes("text/event-stream");
}

function hasJsonContentType(request) {
  return (request.headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase() === "application/json";
}

async function bodyExceedsLimit(request) {
  const declared = request.headers.get("content-length");
  if (declared && /^\d+$/u.test(declared) && Number(declared) > HTTP_MCP_MAX_BODY_BYTES) return true;
  if (!request.body) return false;
  const reader = request.clone().body.getReader();
  let bytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) return false;
      bytes += value.byteLength;
      if (bytes > HTTP_MCP_MAX_BODY_BYTES) {
        void reader.cancel();
        return true;
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function createFlowstackHttpHandler({ sourceLock, allowedHostnames, allowedOrigins, onerror } = {}) {
  assert.ok(Array.isArray(allowedHostnames) && allowedHostnames.length > 0, "HTTP MCP requires at least one allowed hostname");
  assert.ok(Array.isArray(allowedOrigins), "HTTP MCP requires an explicit allowed-origin list");
  const hosts = new Set(allowedHostnames.map(hostname));
  const origins = new Set(allowedOrigins.map(parseOrigin));
  assert.equal(origins.has(undefined), false, "HTTP MCP allowed origins must be valid HTTP(S) origins");
  const factory = await createFlowstackServerFactory({ sourceLock, policy: "locked-only" });
  const mcp = createMcpHandler(factory, { legacy: "stateless", responseMode: "json", onerror });

  return {
    async fetch(request) {
      const url = new URL(request.url);
      const host = hostname(request.headers.get("host") ?? url.host);
      if (!hosts.has(host)) return secure(jsonError(403, "Forbidden host"), request);
      const suppliedOrigin = request.headers.get("origin");
      const origin = suppliedOrigin ? parseOrigin(suppliedOrigin) : undefined;
      if (suppliedOrigin && (!origin || !origins.has(origin))) return secure(jsonError(403, "Forbidden origin"), request);
      const allowOrigin = Boolean(origin);
      if (!["/mcp", "/api/mcp"].includes(url.pathname)) return secure(jsonError(404, "Not found"), request, allowOrigin);
      if (request.method === "OPTIONS") {
        return secure(new Response(null, { status: 204, headers: { "access-control-allow-headers": "Content-Type, Accept, MCP-Protocol-Version, Mcp-Method, Mcp-Name", "access-control-allow-methods": "POST, OPTIONS", "access-control-max-age": "86400" } }), request, allowOrigin);
      }
      if (request.method !== "POST") return secure(jsonError(405, "Method not allowed", { allow: "POST, OPTIONS" }), request, allowOrigin);
      if (!hasJsonContentType(request)) return secure(jsonError(415, "Content-Type must be application/json"), request, allowOrigin);
      if (!acceptsMcp(request)) return secure(jsonError(406, "Accept must include application/json and text/event-stream"), request, allowOrigin);
      if (await bodyExceedsLimit(request)) return secure(jsonError(413, `Request body exceeds ${HTTP_MCP_MAX_BODY_BYTES} bytes`), request, allowOrigin);
      return secure(await mcp.fetch(request), request, allowOrigin);
    },
    close: () => mcp.close()
  };
}
