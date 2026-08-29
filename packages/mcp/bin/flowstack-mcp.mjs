#!/usr/bin/env node
import { resolve } from "node:path";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { publicErrorMessage } from "../src/privacy.mjs";
import { createFlowstackServer } from "../src/server.mjs";

function argument(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  const value = process.argv[index + 1];
  if (!value || value.startsWith("--")) throw new Error(`${name} requires a local path`);
  if (/^https?:\/\//iu.test(value)) throw new Error(`${name} rejects arbitrary URLs`);
  return resolve(value);
}

const projectRoot = argument("--project-root") ?? (process.env.FLOWSTACK_MCP_PROJECT_ROOT ? resolve(process.env.FLOWSTACK_MCP_PROJECT_ROOT) : process.cwd());
const sourceLock = argument("--source-lock") ?? (process.env.FLOWSTACK_MCP_SOURCE_LOCK ? resolve(process.env.FLOWSTACK_MCP_SOURCE_LOCK) : undefined);

void serveStdio(() => createFlowstackServer({ projectRoot, sourceLock }), {
  legacy: "serve",
  onerror(error) { console.error(`[flowstack-mcp] ${publicErrorMessage(error)}`); }
});
