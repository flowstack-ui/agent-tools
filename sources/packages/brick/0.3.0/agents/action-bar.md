# ActionBar agent guide

## Purpose

Floating contextual actions with theme-owned surface, spacing and motion.

## Use when

- Selection exposes temporary actions at the viewport bottom.

## Choose something else when

- A panel needs a trigger anchor. Use popover.
- Persistent keyboard action grouping is needed. Use toolbar.

## Required composition

- Compose Root, Portal, Positioner and named Content. Add SelectionTrigger, Separator, Buttons and CloseTrigger asChild with CloseButton.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep selection, counts, translations and business operations application-owned. Closing is not clearing selection.
- **MUST:** Set placement on Positioner. Use child Button sizes instead of inventing ActionBar sizes. Load aggregate styles or core plus action-bar and child component styles.
- **MUST:** Name Content. Opening preserves focus by default; retain collection interaction through closeOnInteractOutside=false or persistentElements.
- **MUST:** Use useActionBar with RootProvider value for external control; pass the unchanged controller. Positioner supports asChild/render. Content uses compact md corners by default. Root presence options include present, immediate, skipAnimationOnMount and hideMode. Keep examples focused and retain exhaustive matrices in qualification.

## Common mistakes

- **Avoid:** Applying CSS overrides to Popover coordinates. **Instead:** Use ActionBar for detached actions.

## Validation checklist

- Check light/dark, safe-area placement, RTL, narrow wrapping, nested Dialog and loading alignment.

## Related guidance

- `popover`
- `toolbar`
- `button`
- `close-button`
- `divider`
- `format-number`
