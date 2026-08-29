import { resolve } from "node:path";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createFlowstackHttpHandler } from "../packages/mcp/src/http.mjs";

const canonicalHost = "agents.brick-ui.com";
const deploymentHost = process.env.VERCEL_URL;
const allowedHostnames = [canonicalHost, deploymentHost].filter(Boolean);
const allowedOrigins = allowedHostnames.map((host) => `https://${host}`);
const sourceLock = resolve(import.meta.dirname, "../sources/lock.json");

const handler = await createFlowstackHttpHandler({
  sourceLock,
  allowedHostnames,
  allowedOrigins
});

const nodeHandler = toNodeHandler(handler);

export default function flowstackMcp(request, response) {
  return nodeHandler(request, response);
}
