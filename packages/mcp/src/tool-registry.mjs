import * as z from "zod/v4";
import { PACKAGE_IDS } from "./constants.mjs";

const packageId = z.enum(PACKAGE_IDS);
const version = z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u).describe("Exact package version; tags and ranges are rejected");
const source = z.enum(["auto", "installed", "locked"]).optional().describe("Exact source policy; auto tries an exact installed match before the explicit lock");
const packageVersion = { package: packageId, version, source };
const versions = z.object({ atom: version.optional(), brick: version.optional(), colors: version.optional(), theme: version.optional() }).refine((value) => Object.values(value).some(Boolean), "at least one exact package version is required");
const safeText = z.string().min(1).max(4000);
const outputSchema = z.looseObject({
  package: z.string(),
  layer: z.string(),
  version: z.string(),
  provenance: z.record(z.string(), z.unknown()),
  coverage: z.object({
    schema: z.string(),
    package: z.string(),
    packageVersion: z.string(),
    profile: z.unknown().optional(),
    summary: z.record(z.string(), z.unknown()),
    failures: z.array(z.unknown())
  }).optional(),
  data: z.unknown()
});

const definitions = [
  { name: "list_flowstack_packages", method: "listPackages", description: "List exact FLOWSTACK package versions available from the project installation and explicit source lock.", inputSchema: z.object({}) },
  { name: "list_components", method: "listComponents", description: "List canonical component or operation owners plus closed coverage evidence for one exact FLOWSTACK package version.", inputSchema: z.object({ ...packageVersion, query: z.string().max(200).optional() }) },
  { name: "resolve_interface_job", method: "resolveInterfaceJob", description: "Resolve an interface job through positive intent/use ownership fields in the deterministic selection map for an explicit finished, headless, or theming workflow; returns a selection gap below the confidence threshold.", inputSchema: z.object({ workflow: z.enum(["finished", "headless", "theming"]), job: safeText.max(500), versions, source }) },
  { name: "get_package_guide", method: "getPackageGuide", description: "Retrieve one package-owned guide from an exact package version.", inputSchema: z.object({ ...packageVersion, guide: z.string().regex(/^[a-z0-9-]+$/u) }) },
  { name: "get_component_guidance", method: "getComponentGuidance", description: "Retrieve canonical component or operation guidance from an exact package version.", inputSchema: z.object({ ...packageVersion, id: z.string().regex(/^[a-z0-9][a-z0-9/-]*$/u) }) },
  { name: "get_component_props", method: "getComponentProps", description: "Retrieve source-backed public TypeScript declarations for an installed exact component, or report the packed-artifact gap explicitly.", inputSchema: z.object({ ...packageVersion, component: z.string().regex(/^[a-z0-9-]+$/u) }) },
  { name: "get_component_examples", method: "getComponentExamples", description: "Find source-backed public examples for one exact component; returns an explicit gap when none ship.", inputSchema: z.object({ ...packageVersion, component: z.string().regex(/^[a-z0-9-]+$/u), limit: z.number().int().min(1).max(20).default(5) }) },
  { name: "get_theme_contract", method: "getThemeContract", description: "Retrieve the exact installed Brick theme contract, or report that the locked public snapshot lacks it.", inputSchema: z.object({ version, source }) },
  { name: "search_docs", method: "searchDocs", description: "Search bounded public package docs and Agent Knowledge for one exact version; arbitrary paths and URLs are never fetched.", inputSchema: z.object({ ...packageVersion, query: safeText.max(200), limit: z.number().int().min(1).max(50).default(10) }) },
  { name: "validate_composition", method: "validateComposition", description: "Evaluate structured parts and relationships against one exact owner guide's checkable anatomy and severity rules, returning manual checks explicitly.", inputSchema: z.object({ ...packageVersion, owner: z.string().regex(/^[a-z0-9][a-z0-9/-]*$/u), composition: z.object({ parts: z.array(z.object({ id: z.string().regex(/^[A-Za-z][A-Za-z0-9_-]*$/u), component: z.string().regex(/^[A-Za-z][A-Za-z0-9.]*$/u), props: z.record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({}) })).max(200).default([]), relationships: z.array(z.object({ type: z.enum(["contains", "siblings", "labels", "describes", "wraps", "portal-owner"]), from: z.string().regex(/^[A-Za-z][A-Za-z0-9_-]*$/u), to: z.string().regex(/^[A-Za-z][A-Za-z0-9_-]*$/u) })).max(400).default([]), imports: z.array(z.string().max(300)).max(100).default([]), styles: z.array(z.string().max(300)).max(100).default([]) }) }) },
  { name: "create_gap_report", method: "createGapReport", description: "Create an evidence-linked structured public gap proposal after exact-version manifest and selection-map searches; structural checks never claim semantic verification of submitted prose.", inputSchema: z.object({ ...packageVersion, interfaceJob: safeText.max(500), searchedOwners: z.array(z.string().regex(/^[a-z0-9][a-z0-9/-]*$/u)).min(1).max(50), evidence: z.array(z.object({ owner: z.string().regex(/^[a-z0-9][a-z0-9/-]*$/u), artifact: z.string().regex(/^[a-z0-9][a-z0-9/_.-]*$/u), finding: safeText.max(500) })).min(1).max(50), missingCapability: safeText.max(1000), proposedOwner: z.enum(["atom", "brick", "adapter", "theme", "block", "blueprint", "application"]), fallback: z.object({ owner: z.enum(["atom", "brick", "adapter", "theme", "block", "blueprint", "application"]), layer: z.enum(["behavior", "finished-interface", "adapter", "theme", "copied-composition", "blueprint", "application"]), description: safeText.max(1000) }), verification: z.array(safeText.max(500)).min(1).max(20) }) }
];

export const TOOL_DEFINITIONS = Object.freeze(definitions.map((definition) => Object.freeze({ ...definition, outputSchema })));
