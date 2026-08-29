export default Object.freeze({
  schemaVersion: 1,
  id: "agent-tools",
  kind: "public-package",
  repository: "flowstack-ui/agent-tools",
  node: Object.freeze({ minimum: 22, current: 24 }),
  commands: Object.freeze({
    focused: "check:focused",
    repository: "check:repository",
    release: "check:release",
    contract: "verify:repository-contract",
  }),
  servers: Object.freeze([]),
  browserConfigs: Object.freeze([]),
  workflows: Object.freeze({
    ci: ".github/workflows/ci.yml",
    audit: ".github/workflows/audit.yml",
    publish: ".github/workflows/publish.yml",
  }),
  impact: Object.freeze({
    strategy: "conservative-repository",
    conservativePaths: Object.freeze([
      "package.json",
      "package-lock.json",
      "packages/mcp",
      "scripts",
      "skills",
      "sources",
      "verification.config.mjs",
    ]),
  }),
  manual: Object.freeze([
    "review public/private boundary changes before source ingestion",
    "verify npm provenance and canonical hosted bytes after release",
  ]),
  packages: Object.freeze([
    Object.freeze({ path: ".", name: "@flowstack-ui/agent-tools" }),
    Object.freeze({ path: "packages/mcp", name: "@flowstack-ui/mcp" }),
  ]),
  sourcePackages: Object.freeze([
    "@flowstack-ui/atom",
    "@flowstack-ui/brick",
    "@flowstack-ui/colors",
    "@flowstack-ui/theme",
  ]),
  skills: Object.freeze([
    "flowstack-ui-builder",
    "flowstack-ui-compose",
    "flowstack-ui-maintainer",
    "flowstack-ui-review",
  ]),
  hostedBaseUrl: "https://agents.brick-ui.com",
});
