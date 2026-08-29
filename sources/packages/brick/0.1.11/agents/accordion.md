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

## Rules

- **MUST:** Use Root, Item, Header, Trigger, Content, and ContentInner rather than rebuilding disclosure state, relationships, measurement, or animation lifecycle.
- **MUST:** Let Accordion Trigger own the finished control recipe; do not compose Button or IconButton into Trigger because competing recipes would own one element.
- **MUST:** Keep visible padding and panel layout in ContentInner rather than Content so Atom can measure and animate the panel accurately.
- **MUST:** Choose Header level from the page outline and opt out of optional Content landmarks when the resulting region count would be noisy.
- **MUST:** Load styles.css or core.css plus accordion.css.
- **MUST:** Keep grouped trigger corners continuous with the enclosing Root and verify that the complete focus ring remains visible at the first and last group edges.
- **MUST:** Keep the default Indicator pointing down while closed and up while open in both LTR and RTL; use custom decorative artwork only for a deliberate alternate state language.

## Common mistakes

- **Avoid:** Using Accordion for one disclosure, nesting a finished Button in Trigger, or placing padding directly on Content. **Instead:** Use Collapsible for one region, let Trigger own its visual recipe, and put panel spacing in ContentInner.
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
