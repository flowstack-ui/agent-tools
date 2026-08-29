import { McpServer } from "@modelcontextprotocol/server";
import { FlowstackRepository } from "./repository.mjs";
import { FlowstackTools } from "./tools.mjs";
import { TOOL_DEFINITIONS } from "./tool-registry.mjs";
import { SERVER_NAME, SERVER_VERSION } from "./constants.mjs";
import { registerFlowstackSkills } from "./skills.mjs";

const SERVER_INSTRUCTIONS = [
  "Use exact FLOWSTACK package versions; never substitute a tag, range, or another layer.",
  "For finished interfaces, begin with Brick. Use Atom only for explicitly headless behavior and Theme for theming workflows.",
  "This server exposes a closed public corpus. Private Blocks, paid source, Blueprints, and private workspace material are unavailable."
].join(" ");

const READ_ONLY_ANNOTATIONS = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false
};

export function createFlowstackServerFromRepository(repository) {
  const tools = new FlowstackTools(repository);
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions: SERVER_INSTRUCTIONS,
      capabilities: { extensions: { "io.modelcontextprotocol/skills": {} } }
    }
  );
  for (const definition of TOOL_DEFINITIONS) {
    server.registerTool(definition.name, { description: definition.description, inputSchema: definition.inputSchema, outputSchema: definition.outputSchema, annotations: READ_ONLY_ANNOTATIONS }, async (input) => tools.invoke(definition.method, input));
  }
  registerFlowstackSkills(server);
  return server;
}

export async function createFlowstackRepository(options = {}) {
  return new FlowstackRepository(options).initialize();
}

export async function createFlowstackServer(options = {}) {
  const repository = options.repository ?? await createFlowstackRepository(options);
  return createFlowstackServerFromRepository(repository);
}

export async function createFlowstackServerFactory(options = {}) {
  const repository = options.repository ?? await createFlowstackRepository(options);
  return () => createFlowstackServerFromRepository(repository);
}
