---
name: flowstack-ui-compose
description: Map a supplied Blueprint or explicit application plan through finished Brick components using exact-version guidance. Use after product and creative decisions exist; do not use to invent those decisions.
---

# FLOWSTACK UI Compose

Turn an explicit plan into public implementation ownership without becoming a Blueprint or product-policy engine.

## Require a plan

Start from a supplied Blueprint or an application plan that identifies the jobs, content/route intent, and relevant state or policy decisions. If those inputs are missing, ask for them or report the handoff gap. Do not invent product strategy, information architecture, business rules, persistence, analytics, art direction, private catalog ranking, or premium Blueprint content.

## Resolve exact public guidance

Inspect the target dependencies and lockfile and determine an exact version for Brick and every other selected public package; ask for the exact version when the environment cannot expose it. When local script execution is available, run `scripts/resolve-agent-knowledge.mjs` for every package and owner, passing an exact `--version` whenever that package is not installed. Read the resolved manifest, zero-failure coverage, package guides, and selected artifacts.

When local execution is unavailable, use the plugin-provided FLOWSTACK MCP tools. Call `list_flowstack_packages` and require each exact package/version with `locked-source` provenance. Call `list_components` for each exact package/version to establish its closed owner inventory and zero-failure coverage, then call `get_package_guide` for the required package guides and `get_component_guidance` for every selected owner. `resolve_interface_job` may narrow a supplied job, but it never replaces reading the exact guides and owners. Hosted results prove an exact locked public release, not the consumer's installed files.

Stop and report an unavailable version only when neither exact local resolution nor exact hosted MCP resolution succeeds. Never substitute latest, current-main, sibling-repository, or remembered guidance.

## Map the composition

1. Keep application-owned content, routes, business state, services, persistence, and analytics attached to the supplied plan.
2. Resolve every interface job through Brick's layer-selection and composition guides, then read every selected Brick component guide.
3. Use Atom directly only for an explicitly headless plan. A Brick guide may route to exact Atom behavior guidance, but finished application imports remain Brick-first.
4. For custom colors, preserve the order Colors review -> Theme definition/compilation -> compatible Theme artifacts -> Brick. Load Brick CSS and Theme artifacts as documented.
5. If the supplied plan includes an authorized paid Block already copied by the authenticated CLI, treat that code as application-owned and resolve its public Brick owners. Do not search for, infer, or reproduce paid registry metadata or source through Agent Tools.

Compose outside-in while preserving the supplied responsive and state handoffs. Use supported recipes, semantic tokens, public parts, and application-owned semantic HTML only where exact guides assign them.

## Verify and hand off gaps

Validate copied Block provenance, component anatomy, accessibility/interaction, responsive containment, CSS and Theme loading, appearance modes, types, focused tests, browser behavior, and production build.

For every unresolved job, record package/version, plan job, components searched, missing capability, temporary fallback, proposed owner (`Brick`, `Atom`, `Colors`, `Theme`, `Block`, `Blueprint`, or `application`), and required evidence. Return policy or creative gaps to the plan owner without exposing or fabricating private rules.
