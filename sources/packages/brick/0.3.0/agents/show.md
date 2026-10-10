# Show agent guide

## Purpose

Render conditional content with when, or preserve mounted content with CSS-only from visibility. The modes are exclusive.

## Use when

- A complete region should appear only at selected Brick breakpoints.

## Choose something else when

- Content must remain available to assistive technology while visually hidden, or access needs authorization. Use VisuallyHidden or application/server authorization.

## Required composition

- Wrap the smallest complete composition whose responsive presence changes; combine with Hide only for intentional alternate desktop/mobile structures.

## Rules

- **MUST:** Choose when with optional fallback and typed function children, or from with native host props. Never mix modes. Conditional mode has no host/ref and uses JS truthiness; test collection length explicitly. Responsive asChild projects onto one non-Fragment prop/ref-forwarding host and preserves its display. Do not use CSS visibility to stop effects, form submission or portalled overlays.
- **MUST:** Use Show's CSS breakpoint contract rather than client viewport detection for responsive first paint.
- **MUST:** Keep IDs, landmarks, form relationships, and focus order valid in every visible alternative.
- **MUST:** Rely on Show's layout-transparent visible state inside parent layouts and put paint or geometry on a child layout component.
- **MUST:** Omit default-valued props such as as=div; use as only for deliberate HTML semantics or valid document structure.
- **MUST:** Load styles.css or core.css plus show.css.

## Common mistakes

- **Avoid:** Adding application CSS to repair Show spacing or writing as=div even though div is the default. **Instead:** Rely on Show's layout-transparent default and specify as only when semantics require another host.
- **Avoid:** Forgetting show.css or rendering duplicate visible navigation because Show and Hide use the wrong thresholds. **Instead:** Load the modular CSS and verify exact breakpoint boundaries.

## Validation checklist

- Test boundary pixels, zoom, first paint, hydration, focus order, landmarks, and duplicate IDs.
- Confirm CSS is loaded.

## Related guidance

- `hide`
- `visually-hidden`
- `app-bar`
- `drawer`
