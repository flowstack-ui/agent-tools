import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import { join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";
import * as z from "zod/v4";

const SKILL_NAMESPACE = "flowstack-ui";
const SKILLS_ROOT = fileURLToPath(new URL("../skills/", import.meta.url));
const RESOURCE_SCHEMA = z.object({ uri: z.string(), digest: z.string().regex(/^sha256:[a-f0-9]{64}$/u) });
const SKILL_SCHEMA = z.object({
  uri: z.string(),
  frontmatter: z.record(z.string(), z.unknown()),
  resources: z.array(RESOURCE_SCHEMA)
});

export const SkillsListParamsSchema = z.object({ cursor: z.string().optional() });
export const SkillsListResultSchema = z.object({ skills: z.array(SKILL_SCHEMA), nextCursor: z.string().optional() });
export const SkillsGetParamsSchema = z.object({ uri: z.string() });
export const SkillsGetResultSchema = z.object({ skill: SKILL_SCHEMA });

function filesBelow(root, current = root) {
  const files = [];
  for (const name of readdirSync(current).sort()) {
    const path = join(current, name);
    const info = lstatSync(path);
    assert.equal(info.isSymbolicLink(), false, `skill resource must not be a symbolic link: ${path}`);
    if (info.isDirectory()) files.push(...filesBelow(root, path));
    else {
      assert.equal(info.isFile(), true, `skill resource must be a regular file: ${path}`);
      files.push(relative(root, path).split("\\").join("/"));
    }
  }
  return files;
}

function parseFrontmatter(text, path) {
  assert.ok(text.startsWith("---\n"), `${path} must begin with YAML front matter`);
  const end = text.indexOf("\n---\n", 4);
  assert.ok(end > 4, `${path} must close YAML front matter`);
  const frontmatter = {};
  for (const line of text.slice(4, end).split("\n")) {
    if (!line.trim()) continue;
    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s+(.+)$/u);
    assert.ok(match, `${path} uses unsupported front matter syntax: ${line}`);
    assert.equal(match[1] in frontmatter, false, `${path} repeats front matter key ${match[1]}`);
    frontmatter[match[1]] = match[2];
  }
  assert.match(frontmatter.name ?? "", /^[a-z0-9][a-z0-9-]*$/u, `${path} must declare a safe skill name`);
  assert.equal(typeof frontmatter.description, "string", `${path} must declare a description`);
  return frontmatter;
}

function resourceUri(skillName, resourcePath) {
  return `skill://${SKILL_NAMESPACE}/${skillName}/${resourcePath.split("/").map(encodeURIComponent).join("/")}`;
}

function loadCatalog() {
  const entries = [];
  const resources = new Map();
  for (const directory of readdirSync(SKILLS_ROOT).sort()) {
    const skillRoot = join(SKILLS_ROOT, directory);
    if (!lstatSync(skillRoot).isDirectory()) continue;
    const skillPath = join(skillRoot, "SKILL.md");
    const frontmatter = parseFrontmatter(readFileSync(skillPath, "utf8"), skillPath);
    assert.equal(frontmatter.name, directory, `skill directory must match its front matter name: ${directory}`);
    const listed = filesBelow(skillRoot).map((path) => {
      const content = readFileSync(join(skillRoot, path));
      const uri = resourceUri(directory, path);
      assert.equal(resources.has(uri), false, `duplicate skill resource URI: ${uri}`);
      resources.set(uri, { uri, text: content.toString("utf8") });
      return { uri, digest: `sha256:${createHash("sha256").update(content).digest("hex")}` };
    });
    assert.equal(listed[0]?.uri.endsWith("/SKILL.md") || listed.some(({ uri }) => uri.endsWith("/SKILL.md")), true);
    entries.push({ uri: resourceUri(directory, "SKILL.md"), frontmatter, resources: listed });
  }
  assert.ok(entries.length > 0 && entries.length <= 5, "OpenAI static skill import supports one to five skills");
  return Object.freeze({ entries: Object.freeze(entries), resources });
}

const catalog = loadCatalog();

export function registerFlowstackSkills(server) {
  server.server.setRequestHandler(
    "skills/list",
    { params: SkillsListParamsSchema, result: SkillsListResultSchema },
    async ({ cursor }) => {
      assert.equal(cursor, undefined, "FLOWSTACK exposes its complete static skill catalog in one page");
      return { skills: catalog.entries };
    }
  );
  server.server.setRequestHandler(
    "skills/get",
    { params: SkillsGetParamsSchema, result: SkillsGetResultSchema },
    async ({ uri }) => {
      const skill = catalog.entries.find((entry) => entry.uri === uri);
      assert.ok(skill, `unknown FLOWSTACK skill URI: ${uri}`);
      return { skill };
    }
  );
  for (const resource of catalog.resources.values()) {
    server.registerResource(resource.uri, resource.uri, { mimeType: "text/plain" }, async () => ({ contents: [resource] }));
  }
}

export function flowstackSkillCatalog() {
  return catalog.entries;
}
