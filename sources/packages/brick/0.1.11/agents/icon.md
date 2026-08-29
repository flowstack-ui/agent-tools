# Icon agent guide

## Purpose

Normalize one consumer-authored SVG with Brick sizing, semantic foreground, alignment, direction, and decorative-or-informative accessibility semantics.

## Use when

- An authored SVG needs Brick size, currentColor-based tone, alignment, or opt-in directional RTL mirroring.

## Choose something else when

- The graphic performs an action or needs its own touch target. Use Button, IconButton, Toggle, or the owning interactive component.
- The content is a photo, raster asset, responsive media object, fallback, or loading state. Use Image.
- The graphic is a logo, illustration, chart, or multiregion visual with independent semantics. Use an application-owned SVG or media composition with explicit semantics.

## Required composition

- Pass exactly one consumer-authored SVG element; prefer the default span wrapper and use asChild only when the direct root must remain that SVG.
- When visible nearby text already provides the meaning, keep Icon decorative; when a standalone icon conveys information, provide label or aria-labelledby.
- Inside an icon-only control, label the control and leave its nested Icon decorative.

## Rules

- **MUST:** Use Icon only for visual content; never use it as an interactive host or touch target.
- **MUST:** Keep the decorative default when meaning is redundant, or provide exactly one nonempty label or aria-labelledby reference when the standalone graphic is informative.
- **MUST:** Give an icon-only Button, IconButton, Toggle, or other control its accessible name on the control, not on its nested Icon.
- **SHOULD:** Use currentColor for single-color SVG fills or strokes so Brick tone and inherited control state can apply.
- **MUST:** Enable directional only for glyphs whose meaning reverses in RTL, such as arrows and forward/back controls.
- **MUST:** Use asChild only with one direct non-interactive SVG; never compose Icon onto a button, anchor, input, or other interactive host.
- **MUST:** Use Brick Stack, layout components, or an owning component icon slot for sibling alignment instead of wrapper spans or application offsets.
- **MUST:** Load styles.css or core.css plus icon.css.

## Common mistakes

- **Avoid:** Using a raw SVG with ad hoc width, color, alignment, or ARIA inside ordinary Brick composition. **Instead:** Wrap the authored SVG in Icon, choose the semantic size/tone recipe, and let the owning Stack or control align it.
- **Avoid:** Giving both the control and its nested Icon the same accessible label. **Instead:** Label the control and keep the nested Icon decorative to prevent duplicate announcements.
- **Avoid:** Using directional on logos, status symbols, checks, clocks, or other glyphs that do not reverse meaning in RTL. **Instead:** Leave directional false unless the glyph itself communicates direction.

## Validation checklist

- Check decorative and informative accessibility trees, icon-only control naming, all sizes and tones, currentColor adoption, flex shrinking, and RTL directional mirroring.
- Confirm asChild targets only one SVG and that CSS is present.

## Related guidance

- `icon-button`
- `image`
- `button`
- `stack`
- `text`
