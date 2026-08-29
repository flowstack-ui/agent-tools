# Accordion agent guide

## Purpose

Coordinate a group of related disclosure sections with linked headings, triggers, panels, expanded state, and keyboard navigation.

## Use when

- Several related sections form one scannable disclosure group and readers should reveal only the details they need.

## Choose something else when

- Only one independent in-flow region needs disclosure. Use Collapsible.
- Peer controls switch one shared content view rather than independently revealing sections. Use Tabs.
- Content must layer, dismiss outside, contain focus, or lock document scrolling. Use Dialog, Drawer, or another matching overlay primitive.

## Required composition

- Compose Root > Item > Header > Trigger and place the matching Content as a sibling of Header inside the same Item.
- Give every Item a stable unique value and choose the Header level from the surrounding document outline.
- Use landmark=false on Content when many simultaneous regions would make landmark navigation noisy.

## Rules

- **MUST:** Keep each Trigger and Content inside one Item so Atom can own their IDs, expanded state, labeling, and focus navigation.
- **MUST:** Set Header to the heading level required by the host document; do not rely on the default when it would skip or duplicate the page outline.
- **MUST:** Use Root controlled or uncontrolled props for expanded state instead of adding competing click handlers or manual ARIA attributes.
- **MUST:** Treat Accordion as interactive client behavior and keep the client boundary at the smallest composition that owns its state or handlers.

## Common mistakes

- **Avoid:** Using Accordion for one disclosure, placing Trigger outside Header, or writing aria-expanded and aria-controls manually. **Instead:** Use Collapsible for one region and preserve Accordion's complete Item, Header, Trigger, and Content anatomy.
- **Avoid:** Leaving every Content as a region in a large or multiple-open Accordion. **Instead:** Use landmark=false when the number of regions would make assistive-technology landmark navigation noisy.

## Validation checklist

- Check unique Item values, heading order, Trigger accessible names, aria-expanded and aria-controls relationships, and Content labeling.
- Test Enter, Space, Home, End, orientation-aware arrow navigation, RTL, disabled items, single and multiple state, and controlled and uncontrolled use.
- Check mounted and unmounted closed content, focus retention, reduced motion integration, and whether region landmarks remain useful.

## Related guidance

- `collapsible`
- `tabs`
- `drawer`
- `dialog`
