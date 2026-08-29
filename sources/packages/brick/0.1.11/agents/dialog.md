# Dialog agent guide

## Purpose

Present a finished modal task, form, settings flow, or focused information surface while Atom owns focus, dismissal, portal, background-isolation, and scroll-lock behavior.

## Use when

- A user must focus on a temporary blocking task, form, settings flow, or detailed information surface before returning to the underlying application.

## Choose something else when

- The user must make an urgent consequential choice, the surface belongs at a screen edge, or the panel is compact and anchored to a trigger. Use AlertDialog, Drawer, or Popover.
- The content is an in-page disclosure, a command menu, or passive transient feedback. Use Collapsible or Accordion, Menu, or Toast.

## Required composition

- Compose Dialog.Root with Dialog.Trigger and Dialog.Portal; inside Portal keep Dialog.Overlay and Dialog.Content as siblings. Inside Content, arrange Dialog.Header with Dialog.Title and an optional Dialog.Description, put scrollable task content in Dialog.Body, and place actions and Dialog.Close in Dialog.Footer as the workflow requires.
- Use Dialog.Branch only for an unavoidable consumer-owned third-party portal that cannot mount inside Content. When a local Appearance scope owns the trigger, portal into that scope or apply the same Appearance to the portalled visual root.

## Rules

- **MUST:** Use Dialog for an ordinary blocking task or information surface; use AlertDialog for an urgent consequential decision and Popover for compact anchored work.
- **MUST:** Render Overlay and Content as siblings inside Portal; never place Content beneath the aria-hidden Overlay.
- **MUST:** Give Content an accessible name with one visible Title or an explicit native aria-label or aria-labelledby; add Description only when it supplies useful context.
- **MUST:** Use Dialog-owned focus containment and restoration, background isolation, scroll locking, Escape handling, direct-target backdrop dismissal, and nested top-layer behavior instead of recreating them.
- **MUST:** Put long or variable task content in Body so the header and footer remain available while the body owns overflow within the safe viewport bounds.
- **MUST:** Use Footer justify for simple action distribution and Brick layout components for complex grouping; preserve a clear primary action and a visible close or cancellation path when the workflow requires one.
- **MUST:** Mount descendant interactive portals inside Content when possible; otherwise wrap only the unavoidable same-document third-party portal owner with Branch.
- **SHOULD:** Choose sm, md, or lg from the content measure rather than importance, and verify safe-area bounds, Body overflow, footer reflow, zoom, and narrow or short effective viewports.
- **MUST:** When Portal leaves a local Appearance scope, reproduce that scope on the portalled visual root or target a portal container inside it.
- **MUST:** Load styles.css or core.css plus dialog.css.

## Common mistakes

- **Avoid:** Nesting Content inside Overlay, hand-building focus or document listeners, or using Dialog for an anchored utility panel. **Instead:** Keep Overlay and Content siblings, rely on Dialog and Atom Modal behavior, and choose Popover for compact anchored work.
- **Avoid:** Letting long content scroll the whole surface or assuming an unrelated third-party portal is automatically inside the modal. **Instead:** Put overflow in Body and mount the descendant portal inside Content or register its owner with Branch.

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
- `appearance`
