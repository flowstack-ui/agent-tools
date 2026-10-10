# Tooltip agent guide

## Purpose

Present a finished brief supplemental text description for an already named trigger while Atom owns the description relationship, hover, focus-visible, touch hold, dismissal, portal, and positioning behavior.

## Use when

- A control, especially an unfamiliar IconButton, abbreviation, or compact trigger, needs a short non-interactive hint in addition to its complete accessible name.

## Choose something else when

- The information is required or lengthy, is a richer passive preview, or contains links, buttons, inputs, settings, or other interaction. Use Visible text, HoverCard, or Popover.

## Required composition

- Use Root or useTooltip with RootProvider, not both. Context exposes public state; Provider shares timing. Use unique Trigger values for shared hints, positioning for geometry, and lifecycle props for hidden retained content. Explicit interactive controls hover retention, never focusable content. Content supports asChild/render and alternative text.
- Compose Tooltip.Root with Tooltip.Trigger asChild around one already named focusable control, plus Tooltip.Portal and Tooltip.Content; add Tooltip.Arrow only when the styled hint needs a pointer. Use Tooltip.Provider when a coherent region shares timing policy.
- Use plain Content for one short hint or Root variant=rich with presentational Tooltip.Title and Tooltip.Description for a concise title and supporting text. Both recipes remain non-interactive descriptions. Reproduce any local Appearance scope on portalled Content.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Give Trigger a complete accessible name independently; Tooltip supplies only a supplemental aria-describedby description while open and never replaces the control name.
- **MUST:** Keep plain and rich Content free of links, buttons, inputs, and every other focusable control; use Popover for interaction.
- **SHOULD:** Keep plain Content to one short hint and rich Content to a concise Title and Description; render essential instructions, errors, warnings, recovery, and full truncated text visibly.
- **MUST:** Preserve Atom's hover, focus-visible, Escape, shared delay, and stationary 700 ms touch long-press behavior, including movement, scroll, second-touch, cancellation, disabled, unmount, compatibility-event, and finite dismissal handling.
- **MUST:** When Trigger uses asChild or render, preserve its native semantics, action, complete name, Atom handlers and refs, and generated description relationship.
- **SHOULD:** Use one Provider around a coherent region when tooltips should share open, close, and skip-delay timing; nest providers only for an intentional timing boundary.
- **MUST:** Use rounded by default and pill only for deliberately compact labels; keep optional Arrow decorative and aligned to the collision-resolved side without independently recoloring its surface seam.
- **MUST:** When Portal leaves a local Appearance scope, reproduce that scope on Content or target a portal container inside it.
- **MUST:** Load styles.css or core.css plus tooltip.css and every composed trigger component stylesheet.
- **MUST:** Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.

## Common mistakes

- **Avoid:** Using Tooltip as an IconButton's only name, placing interactive or essential help in rich Content, or hand-positioning a text bubble. **Instead:** Name Trigger directly, keep Content supplemental and non-interactive, show required information visibly, and use complete Tooltip anatomy.
- **Avoid:** Adding another touch-hold timer, assuming portalled Content inherits Appearance, or using Tooltip for a resource preview. **Instead:** Rely on Atom input handling, make the portal scope explicit, and choose HoverCard for a redundant passive preview.

## Validation checklist

- Verify Trigger's independent name, role=tooltip Content, aria-describedby only while open, controlled and disabled state, Provider and local delays, pointer hover, focus-visible opening, Trigger-to-Content hover bridge, focus leave, top-layer Escape, and stable focus.
- Verify stationary touch hold, early release, movement tolerance, scrolling, outside touch, second touch, touchcancel, compatibility events, disabled changes, unmount cleanup, and plain and rich finite dismissal without blocking ordinary activation or scrolling.
- Verify plain and rich brevity with no interactive descendants, rounded and pill shapes, optional Arrow on every resolved side, collision placement, narrow wrapping, zoom, LTR and RTL, reduced motion, forced colors, portalled appearance, and complete CSS.

## Related guidance

- `@flowstack-ui/atom/agents/tooltip`
- `icon-button`
- `hover-card`
- `popover`
- `appearance`
