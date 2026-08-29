import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import test from "node:test";
import { Client } from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import {
  SkillsGetResultSchema,
  SkillsListResultSchema
} from "../src/skills.mjs";

const root = resolve(import.meta.dirname, "..");
const bin = resolve(root, "bin/flowstack-mcp.mjs");
const sourceLock = resolve(root, "../../sources/lock.json");

test("MCP advertises and serves a complete digest-verified OpenAI static skill snapshot", async () => {
  const transport = new StdioClientTransport({ command: process.execPath, args: [bin, "--source-lock", sourceLock], cwd: root, stderr: "pipe" });
  const client = new Client({ name: "flowstack-static-skills-test", version: "1.0.0" });
  await client.connect(transport);
  try {
    assert.deepEqual(client.getServerCapabilities()?.extensions?.["io.modelcontextprotocol/skills"], {});
    const listed = await client.request({ method: "skills/list", params: {} }, SkillsListResultSchema);
    assert.deepEqual(listed.skills.map(({ frontmatter }) => frontmatter.name), [
      "flowstack-ui-builder",
      "flowstack-ui-compose",
      "flowstack-ui-maintainer",
      "flowstack-ui-review"
    ]);
    assert.equal(listed.nextCursor, undefined);
    for (const skill of listed.skills) {
      assert.equal(skill.uri, `skill://flowstack-ui/${skill.frontmatter.name}/SKILL.md`);
      assert.ok(skill.resources.length >= 3);
      assert.equal(skill.resources.some(({ uri }) => uri === skill.uri), true);
      const fetched = await client.request({ method: "skills/get", params: { uri: skill.uri } }, SkillsGetResultSchema);
      assert.deepEqual(fetched.skill, skill);
      for (const resource of skill.resources) {
        const result = await client.readResource({ uri: resource.uri });
        assert.equal(result.contents.length, 1);
        const content = result.contents[0];
        assert.equal(content.uri, resource.uri);
        assert.equal(typeof content.text, "string");
        assert.equal(`sha256:${createHash("sha256").update(content.text, "utf8").digest("hex")}`, resource.digest);
      }
    }
  } finally {
    await client.close();
  }
});
