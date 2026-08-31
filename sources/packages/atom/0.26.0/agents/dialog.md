# Dialog agent guide

## Purpose

Present an ordinary blocking task, form, or information surface with modal focus, dismissal, labeling, portal, background-isolation, and scroll-lock behavior.

## Use when

- A user must focus on a temporary blocking task, form, or information surface before returning to the underlying application.

## Choose something else when

- The user must make an urgent consequential choice, the task is a side sheet, or the panel is small, attached, and should usually remain non-modal. Use AlertDialog, Drawer, or Popover.

## Required composition

- Compose Root around Content; add Trigger for local activation or omit it for controlled and triggerless workflows, and use Portal only when the layer must leave its DOM location. When Overlay is rendered, keep it as a sibling of Content. Inside Content, use Title or native labeling for the accessible name, add Description only when useful, and add Close only when the task needs an owned close control.

## Rules

- **MUST:** Render Overlay and Content as siblings inside Portal; never nest Content beneath the aria-hidden Overlay.
- **MUST:** Give Content an accessible name with one Title or native aria-label or aria-labelledby; render Description only when useful or provide an explicit native description relationship.
- **MUST:** Use Dialog-owned focus containment and restoration, background isolation, scroll locking, Escape handling, direct-target backdrop dismissal, and nested top-layer behavior instead of recreating them.
- **MUST:** Mount descendant interactive portals inside Content when possible; otherwise register an unavoidable consumer-owned third-party portal with Modal.Branch.
- **SHOULD:** Use initialFocus or finalFocus for explicit workflow targets and preserve Dialog's touch-safe content focus and restoration fallbacks for ordinary use.

## Common mistakes

- **Avoid:** Putting Content inside Overlay, omitting an accessible name, or adding custom document listeners and focus traps around Dialog. **Instead:** Keep Overlay and Content siblings, label Content, and rely on the Dialog and shared Modal contracts.

## Validation checklist

- Verify trigger semantics, accessible name and optional description, keyboard, pointer, touch, and programmatic initial focus, Tab containment, Close, top-layer Escape, direct-target backdrop dismissal, and focus restoration.
- Verify controlled state, nested dialogs and descendant portals, background isolation, document scroll lock, long-content scrolling, exit presence, and authored-style cleanup.

## Related guidance

- `alert-dialog`
- `modal`
- `drawer`
- `popover`
