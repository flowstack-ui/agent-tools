import { resolve } from "node:path";
import { toNodeHandler } from "@modelcontextprotocol/node";
import { createFlowstackHttpHandler } from "../packages/mcp/src/http.mjs";

const canonicalHost = "agents.brick-ui.com";
const deploymentHosts = [
  process.env.VERCEL_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_BRANCH_URL
].filter(Boolean);
const localHosts = process.env.VERCEL_ENV === "production" ? [] : ["localhost", "127.0.0.1"];
const allowedHostnames = [canonicalHost, ...deploymentHosts, ...localHosts];
const allowedOrigins = [
  `https://${canonicalHost}`,
  "https://brick-ui.com",
  ...deploymentHosts.map((host) => `https://${host}`),
  ...localHosts.flatMap((host) => [`http://${host}`, `https://${host}`])
];
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
