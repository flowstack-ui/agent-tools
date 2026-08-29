export default Object.freeze({
  repository: "flowstack-ui/agent-tools",
  node: Object.freeze({ minimum: 22, current: 24 }),
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
