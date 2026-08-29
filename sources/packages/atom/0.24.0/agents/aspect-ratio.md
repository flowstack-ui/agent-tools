# AspectRatio agent guide

## Purpose

Reserve stable width-to-height geometry for media, embeds, and placeholders while leaving all content semantics and interaction to the child.

## Use when

- An image, video, iframe, preview, or placeholder needs a predictable box before its content loads.

## Choose something else when

- The content's intrinsic dimensions already provide the intended stable layout or the task needs media loading fallback behavior rather than geometry alone. Use the semantic native media element or Image.

## Required composition

- Wrap one semantic content region in Root, provide a positive finite width-divided-by-height ratio when 16/9 is not correct, and put all image alt text, iframe titles, playback controls, and interactive semantics on the child itself.

## Rules

- **MUST:** Treat Root as geometry only; do not assign it media roles, accessible names, loading state, or interaction that belongs to its child.
- **MUST:** Express ratio as width divided by height and provide a finite positive number; invalid values normalize to 16/9.
- **MUST:** Give contained images suitable alt text, iframes descriptive titles, and interactive media its native keyboard and focus behavior.
- **MUST:** Do not try to override the resolved aspectRatio through consumer style; Atom preserves other style properties but owns the ratio value.

## Common mistakes

- **Avoid:** Treating AspectRatio as an image or video component or moving the child's accessible name to the wrapper. **Instead:** Keep Root structural and retain the native child element with its own semantics and accessible name.
- **Avoid:** Passing height divided by width or relying on zero, negative, or non-finite input. **Instead:** Pass the intended width divided by height as a finite positive number.

## Validation checklist

- Verify default, square, portrait, and wide ratios; invalid-ratio normalization; reserved layout before loading; and preservation of consumer styles outside aspectRatio.
- Inspect the final DOM to confirm Root adds no role or ARIA and the child retains correct image, iframe, media, keyboard, and focus semantics.
- Verify asChild and render composition preserve the authoritative ratio, native props, content, and ref.

## Related guidance

- `image`
