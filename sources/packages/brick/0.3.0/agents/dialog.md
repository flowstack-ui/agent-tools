# Dialog agent guide

## Purpose

Present a finished modal task, form, settings flow, or focused information surface while Atom owns focus, dismissal, portal, background-isolation, and scroll-lock behavior.

## Use when

- A user must focus on a temporary blocking task, form, settings flow, or detailed information surface before returning to the underlying application.

## Choose something else when

- The user must make an urgent consequential choice, the surface belongs at a screen edge, or the panel is compact and anchored to a trigger. Use AlertDialog, Drawer, or Popover.
- The content is an in-page disclosure, a command menu, or passive transient feedback. Use Collapsible or Accordion, Menu, or Toast.

## Required composition

- Compose Dialog.Root with Dialog.Trigger and Dialog.Portal; inside Portal render Dialog.Overlay beside Dialog.Positioner, with Dialog.Content inside Positioner. Inside Content, arrange Dialog.Header with Dialog.Title and an optional Dialog.Description, put scrollable task content in Dialog.Body, place inline close actions in Dialog.Footer, and use Dialog.Close placement="corner" as a direct Content child only for an authored top-end dismiss control.
- Use Dialog.Branch only for an unavoidable consumer-owned third-party portal that cannot mount inside Content. When a local Appearance scope owns the trigger, portal into that scope or apply the same Appearance to the portalled visual root.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Dialog for an ordinary blocking task or information surface; use AlertDialog for an urgent consequential decision and Popover for compact anchored work.
- **MUST:** Keep Overlay outside Content ancestry; render it beside Positioner and put Content inside Positioner.
- **MUST:** Give Content an accessible name with one visible Title or an explicit native aria-label or aria-labelledby; add Description only when it supplies useful context.
- **MUST:** Use Dialog-owned focus containment and restoration, background isolation, scroll locking, Escape handling, direct-target backdrop dismissal, and nested top-layer behavior instead of recreating them.
- **MUST:** Put task content in Body. Use Positioner scrollBehavior to choose inside or outside scrolling; short viewports must keep full actions reachable.
- **MUST:** Use Footer justify for simple action distribution and Brick layout components for complex grouping; preserve a clear primary action and a visible close or cancellation path when the workflow requires one.
- **MUST:** Use Close placement="corner" only as a direct Content child with a completely named authored IconButton; keep footer Cancel actions on the default inline placement.
- **MUST:** Keep managed Brick portals enabled to escape clipping while retaining modal ownership. Register third-party outside portals with Branch.
- **SHOULD:** Choose xs, sm, md, lg, xl, cover or full; size accepts sparse responsive values. Use Positioner for viewport modes, placement and scrollBehavior. Verify all transitions and short-view actions.
- **MUST:** When Portal leaves a local Appearance scope, reproduce that scope on the portalled visual root or target a portal container inside it.
- **MUST:** Load styles.css or core.css plus dialog.css.

## Common mistakes

- **Avoid:** Nesting Content inside Overlay, hand-building focus or document listeners, or using Dialog for an anchored utility panel. **Instead:** Keep Overlay and Content siblings, rely on Dialog and Atom Modal behavior, and choose Popover for compact anchored work.
- **Avoid:** Hand-building outside scrolling or assuming an unrelated third-party portal is automatically owned. **Instead:** Use Positioner scrollBehavior and register third-party outside content with Branch.
- **Avoid:** Rebuilding a corner close inset inside Header with overlap utilities or local CSS. **Instead:** Compose a named IconButton through Dialog.Close placement="corner" as a direct child of Content.

## Validation checklist

- Verify trigger semantics, accessible name and optional description, keyboard, pointer, touch, and programmatic initial focus, Tab containment, Close, top-layer Escape, direct-target backdrop dismissal, and focus restoration.
- Verify controlled state, nested dialogs and every Branch, background isolation, document scroll lock, long Body scrolling, footer reflow, exit presence, zoom, reduced motion, forced colors, and narrow and short viewports.
- Check light and dark appearance on the actual portalled Content and confirm Dialog CSS plus every composed child component stylesheet is loaded.

## Related guidance

- `@flowstack-ui/atom/agents/dialog`
- `@flowstack-ui/atom/agents/modal`
- `alert-dialog`
- `drawer`
- `popover`
- `button`
- `icon-button`
- `appearance`
