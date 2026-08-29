import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { basename, join } from "node:path";

const releaseDirectory = process.env.RELEASE_DIR;
if (!releaseDirectory) throw new Error("RELEASE_DIR is required");

const releases = [
  JSON.parse(await readFile("package.json", "utf8")),
  JSON.parse(await readFile("packages/mcp/package.json", "utf8")),
];
const archives = await readdir(releaseDirectory);

for (const release of releases) {
  const prefix = release.name.replace(/^@/u, "").replace("/", "-");
  const filename = archives.find((entry) => entry === `${prefix}-${release.version}.tgz`);
  if (!filename) throw new Error(`missing exact archive for ${release.name}@${release.version}`);
  const archive = join(releaseDirectory, filename);
  const expectedIntegrity = `sha512-${createHash("sha512").update(await readFile(archive)).digest("base64")}`;
  const spec = `${release.name}@${release.version}`;
  const existing = run("npm", ["view", spec, "dist.integrity", "--json"], { allowFailure: true });
  if (existing.status === 0) {
    const registryIntegrity = JSON.parse(existing.stdout);
    if (registryIntegrity !== expectedIntegrity) {
      throw new Error(`${spec} exists with different archive integrity`);
    }
    console.log(`Verified existing ${spec} from ${basename(archive)}.`);
    continue;
  }
  run("npm", ["publish", archive, "--access", "public", "--provenance"]);
  let verified = false;
  for (let attempt = 0; attempt < 6; attempt += 1) {
    const result = run("npm", ["view", spec, "dist.integrity", "--json"], { allowFailure: true });
    if (result.status === 0 && JSON.parse(result.stdout) === expectedIntegrity) {
      verified = true;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 5_000));
  }
  if (!verified) throw new Error(`${spec} registry integrity did not converge`);
  console.log(`Published and verified ${spec} from ${basename(archive)}.`);
}

function run(command, args, { allowFailure = false } = {}) {
  const result = spawnSync(command, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  if (result.error) throw result.error;
  if (!allowFailure && result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed:\n${result.stdout}\n${result.stderr}`);
  }
  return result;
}
