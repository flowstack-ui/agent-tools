import { readFileSync } from "node:fs";

const metadata = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

export const SERVER_NAME = "flowstack-mcp";
export const SERVER_PACKAGE = metadata.name;
export const SERVER_VERSION = metadata.version;

export const PACKAGES = Object.freeze({
  atom: { id: "atom", name: "@flowstack-ui/atom", layer: "behavior" },
  brick: { id: "brick", name: "@flowstack-ui/brick", layer: "finished-interface" },
  colors: { id: "colors", name: "@flowstack-ui/colors", layer: "color-engine" },
  theme: { id: "theme", name: "@flowstack-ui/theme", layer: "theme" }
});

export const PACKAGE_IDS = Object.freeze(Object.keys(PACKAGES));
export const PACKAGE_NAMES = Object.freeze(Object.values(PACKAGES).map(({ name }) => name));

export const PRIVATE_MARKERS = Object.freeze([
  "research memory",
  "creative intelligence",
  "private blueprint",
  "premium blueprint",
  "customer data",
  "ranking policy",
  "proprietary prompt",
  "commercial policy"
]);
