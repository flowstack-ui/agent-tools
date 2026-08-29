import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { SERVER_PACKAGE, SERVER_VERSION } from "../src/constants.mjs";

const root = resolve(import.meta.dirname, "..");
const temporary = await mkdtemp(join(tmpdir(), "flowstack-mcp-pack-"));
const archiveDirectory = join(temporary, "archive");
const consumer = join(temporary, "consumer");
const cache = join(temporary, "npm-cache");
const env = { ...process.env, npm_config_cache: cache };
function run(command, args, cwd = root) { return execFileSync(command, args, { cwd, env, encoding: "utf8", maxBuffer: 40 * 1024 * 1024 }); }

try {
  await mkdir(archiveDirectory, { recursive: true });
  const packed = JSON.parse(run("npm", ["pack", "--json", "--silent", "--ignore-scripts", "--pack-destination", archiveDirectory]));
  assert.equal(packed.length, 1);
  assert.equal(packed[0].filename, `flowstack-ui-mcp-${SERVER_VERSION}.tgz`, "archive filename must carry the authoritative exact version");
  const archive = join(archiveDirectory, packed[0].filename);
  const listing = run("tar", ["-tzf", archive]).trim().split("\n").filter(Boolean).sort();
  assert.ok(listing.includes("package/bin/flowstack-mcp.mjs"));
  assert.ok(listing.includes("package/generated/tool-registry.json"));
  assert.ok(listing.includes("package/generated/capabilities.json"));
  for (const path of listing) {
    assert.ok(path.startsWith("package/"));
    assert.equal(/(?:^|\/)(?:test|scripts|node_modules|sources|private|research)(?:\/|$)/iu.test(path), false, `unsafe development/private path packed: ${path}`);
  }
  const packageJson = JSON.parse(run("tar", ["-xOf", archive, "package/package.json"]));
  assert.equal(packageJson.name, SERVER_PACKAGE);
  assert.equal(packageJson.version, SERVER_VERSION);
  assert.equal(packageJson.private, undefined);
  assert.deepEqual(packageJson.publishConfig, { access: "public", registry: "https://registry.npmjs.org/" });
  assert.deepEqual(packageJson.repository, { type: "git", url: "git+https://github.com/flowstack-ui/agent-tools.git", directory: "packages/mcp" });
  assert.equal(packageJson.bin["flowstack-mcp"], "./bin/flowstack-mcp.mjs");
  for (const generatedPath of ["package/generated/tool-registry.json", "package/generated/capabilities.json"]) {
    const generated = JSON.parse(run("tar", ["-xOf", archive, generatedPath]));
    assert.equal(generated.package, packageJson.name, `${generatedPath} package identity drifted`);
    assert.equal(generated.version, packageJson.version, `${generatedPath} version drifted`);
  }

  await mkdir(consumer, { recursive: true });
  await writeFile(join(consumer, "package.json"), "{\"name\":\"flowstack-mcp-consumer\",\"private\":true,\"type\":\"module\"}\n");
  run("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund", archive, "@modelcontextprotocol/client@2.0.0"], consumer);
  const smoke = `import assert from 'node:assert/strict';\nimport { Client } from '@modelcontextprotocol/client';\nimport { StdioClientTransport } from '@modelcontextprotocol/client/stdio';\nconst transport = new StdioClientTransport({command: process.execPath,args:['node_modules/.bin/flowstack-mcp'],cwd:process.cwd(),stderr:'pipe'});\nconst client = new Client({name:'packed-smoke',version:'1.0.0'});\nawait client.connect(transport);\nconst listed=await client.listTools();\nassert.equal(listed.tools.length,11);\nconst result=await client.callTool({name:'list_flowstack_packages',arguments:{}});\nconst value=result.structuredContent ?? JSON.parse(result.content[0].text);\nassert.equal(value.package,'@flowstack-ui/mcp');\nassert.deepEqual(value.data,[]);\nawait client.close();\n`;
  await writeFile(join(consumer, "smoke.mjs"), smoke);
  run(process.execPath, ["smoke.mjs"], consumer);
  const bin = join(consumer, "node_modules/.bin/flowstack-mcp");
  const child = spawn(bin, [], { cwd: consumer, stdio: ["ignore", "pipe", "pipe"] });
  let stdout = "";
  child.stdout.on("data", (chunk) => { stdout += chunk; });
  setTimeout(() => child.kill("SIGTERM"), 100);
  await once(child, "exit");
  assert.equal(stdout, "", "packed server wrote non-protocol output to stdout");
  console.log(`Verified ${packed[0].filename}: exact archive, 11 tools, clean npx-style JSON-RPC consumer, and stdout purity.`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
