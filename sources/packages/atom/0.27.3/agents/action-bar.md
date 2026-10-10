# ActionBar agent guide

## Purpose

Detached contextual action layer with controlled disclosure, dismissal and focus policy.

## Use when

- Selection or application context exposes temporary actions without an anchor.

## Choose something else when

- The panel must be anchored to a trigger. Use popover.
- Actions are a persistent keyboard composite. Use toolbar.

## Required composition

- Compose ActionBar.Root, Portal, optional Positioner and named Content. Use Positioner for fixed wrappers so visual layering follows the shared overlay stack. Supply selection count and action buttons yourself. Use CloseTrigger asChild for an existing button.

## Rules

- **MUST:** Keep record selection, translated messages and business effects application-owned. Closing does not clear selection.
- **MUST:** Name Content through Title or native aria-label. Default initialFocus is false; nonmodal opening preserves selection focus.
- **MUST:** Use closeOnInteractOutside=false or persistentElements for continued collection selection. Set unmountOnExit=false to retain child state.
- **MUST:** Pass the unchanged useActionBar result to RootProvider value for external control. RootProvider also retains legacy Root props. Positioner asChild/render must resolve to one host forwarding refs. Use present, immediate, skipAnimationOnMount and hideMode deliberately; Activity falls back to hidden mounting on React18. Do not pass anchored positioning or trigger-value options.

## Common mistakes

- **Avoid:** Using an invisible trigger to anchor bulk actions. **Instead:** ActionBar is detached and needs no trigger or anchor.

## Validation checklist

- Verify Tab access, Escape, cancellation, nested layers, outside dismissal, selection persistence and mount policy.

## Related guidance

- `popover`
- `toolbar`
- `dialog`
- `button`
