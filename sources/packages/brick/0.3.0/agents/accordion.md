# Accordion agent guide

## Purpose

Present a finished group of related disclosure sections while Atom owns expanded state, headings, linked panels, and keyboard navigation.

## Use when

- Several related sections belong to one scannable group and readers should reveal only the details they need.

## Choose something else when

- Only one independent in-flow region needs disclosure. Use Collapsible.
- Peer controls switch one shared content view. Use Tabs.
- Content must layer, dismiss outside, contain focus, or lock document scrolling. Use Dialog, Drawer, or another matching overlay component.

## Required composition

- Compose Root > Item > Header > Trigger with Indicator inside Trigger, then place Content > ContentInner as Header's sibling inside the same Item.
- Put visible panel padding and ordinary Brick layout in ContentInner so Content remains Atom's measured motion boundary.
- Choose Header levels from the host document and use Content landmark=false when many regions would make landmark navigation noisy.
- Use the default decorative Indicator when the standard down-when-closed and up-when-open state cue fits; authored Indicator children may replace only the artwork.
- Use size=xl for spacious marketing disclosures that need a 60px trigger and 18px label.
- Use variant=ghost with indicatorPlacement=start for disclosure sections that should blend into an owning inspector surface.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use useAccordion with RootProvider for an external controller. Root single values remain strings and multiple values arrays; controller setValue accepts an array. Root lazyMount and unmountOnExit default true. Set unmountOnExit=false to retain state after first opening. Activity pauses hidden effects on supported React, with display-none fallback otherwise. Closed retained panels are inert and aria-hidden; keep essential actions outside Content.
- **SHOULD:** Use sparse responsive size and variant objects at shared breakpoints. Preserve plain, ghost, soft and outline meanings; subtle paints the open item and enclosed adds a grouped boundary with open-item paint. Use component CSS variables for color customization, not semantic status tones. Nested roots and indicators follow their nearest owner.
- **MUST:** Use Root, Item, Header, Trigger, Content, and ContentInner rather than rebuilding disclosure state, relationships, measurement, or animation lifecycle.
- **MUST:** Let Trigger own its recipe, or use Trigger unstyled asChild with Button or IconButton as the sole visual owner. Root unstyled delegates trigger visuals and ContentInner spacing throughout that root; nested roots own their own recipes. Keep extra actions beside Header, not inside Trigger.
- **MUST:** Keep visible padding and panel layout in ContentInner rather than Content so Atom can measure and animate the panel accurately.
- **MUST:** Choose Header level from the page outline and opt out of optional Content landmarks when the resulting region count would be noisy.
- **MUST:** Load styles.css or core.css plus accordion.css.
- **MUST:** Keep grouped trigger corners continuous with the enclosing Root and verify that the complete focus ring remains visible at the first and last group edges.
- **MUST:** Keep the default Indicator pointing down while closed and up while open in both LTR and RTL. Use custom decorative artwork only for a deliberate alternate state language.
- **SHOULD:** Use the divided plain recipe when the open Item must remain transparent while every row, including the last, retains a visible structural edge and full-row hover feedback with logically inset content.
- **SHOULD:** Use the ghost recipe and logical start indicator when an inspector panel needs disclosure semantics without a second nested surface.

## Common mistakes

- **Avoid:** Using Accordion for one disclosure, nesting a finished Button in Trigger, or placing padding directly on Content. **Instead:** Use Collapsible for one region. Use Trigger unstyled asChild when delegating to Button, never nest buttons. Put panel spacing in ContentInner.
- **Avoid:** Accepting the default heading level or region landmark count without checking the host page. **Instead:** Set Header to the correct document level and use landmark=false when many open panels would create excessive landmarks.
- **Avoid:** Rounding every Trigger in one outlined group or clipping Root paint so the first and last Trigger focus rings are cut off. **Instead:** Treat Root as the group silhouette, keep interior Trigger edges square, round only exposed group corners, and preserve visible focus outside the group boundary.

## Validation checklist

- Check complete anatomy, unique values, heading order, Trigger names, linked panel relationships, landmark usefulness, and CSS delivery.
- Test Enter, Space, Home, End, orientation-aware arrows, RTL, disabled and locked-open state, single and multiple modes, and controlled and uncontrolled state.
- Test initial open, open and close motion, down/up Indicator state, dynamic panel measurement, reduced motion, complete first and last Trigger focus geometry, continuous grouped corners, long labels, narrow widths, zoom, and forced colors.

## Related guidance

- `collapsible`
- `tabs`
- `drawer`
- `stack`
- `text`
