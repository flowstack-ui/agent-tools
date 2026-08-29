# AspectRatio agent guide

## Purpose

Reserve finished stable width-to-height geometry and optional neutral frame paint for media, embeds, or placeholders while Atom owns the authoritative ratio and children retain all semantics and interaction.

## Use when

- An image, video, iframe, preview, placeholder, or authored content region needs a predictable box before content loads or a consistent clipped frame.

## Choose something else when

- Intrinsic dimensions already provide the intended layout, image loading and fallback behavior is needed, the content is a general panel, or a loading placeholder owns the job. Use the semantic native media element, Image, Surface, or Skeleton.

## Required composition

- Wrap one semantic content region in AspectRatio.Root, pass a finite positive width-divided-by-height ratio when 16/9 is not correct, and choose plain, subtle, or outline plus radius and overflow. Size a child explicitly when it should fill the reserved box.
- Keep image alt text, iframe title, media controls and captions, focus, loading, and interaction on the child. Choose overflow=visible or an inset child focus treatment whenever clipping would hide focus.

## Rules

- **MUST:** Treat Root as geometry and optional frame paint only; do not assign it media roles, accessible names, loading state, focus, or interaction owned by its child.
- **MUST:** Express ratio as width divided by height and pass a finite positive number; understand that Atom normalizes zero, negative, NaN, and infinite values to 16/9.
- **MUST:** Give contained images appropriate alt text, iframes descriptive titles, and interactive media its native controls, keyboard behavior, captions, and visible focus.
- **MUST:** Do not override style.aspectRatio because Atom's ratio prop remains authoritative; use Brick variant, radius, overflow, and public frame variables for visual customization.
- **MUST:** Keep Root contained at available inline size and author responsive ratio changes outside the scalar prop; verify clipped children, full radius, narrow widths, and focus at zoom rather than assuming Root stretches or crops them.
- **MUST:** Load styles.css or core.css plus aspect-ratio.css and the stylesheet for every rendered child component.

## Common mistakes

- **Avoid:** Treating AspectRatio as Image or video, moving the child's name to Root, passing height divided by width, or relying on invalid ratio input. **Instead:** Keep Root structural, retain semantic native children, and pass a deliberate positive width/height ratio.
- **Avoid:** Assuming Root sizes or object-fits the child or clipping a child's focus ring. **Instead:** Size and fit the child explicitly and use visible overflow or inset focus when interaction reaches the frame edge.

## Validation checklist

- Verify default, square, portrait, and wide ratios; invalid normalization; reserved layout before loading; all variants/radii/overflow modes; authoritative ratio with other consumer styles preserved; native props; refs; and composition.
- Inspect final DOM for no Root role or ARIA and correct child image, iframe, video, keyboard, focus, captions, and loading semantics.
- Verify narrow width, responsive external CSS, zoom, full-radius geometry, clipping, RTL neutrality, light/dark appearance, forced colors, and focus visibility for interactive children.

## Related guidance

- `@flowstack-ui/atom/agents/aspect-ratio`
- `image`
- `surface`
- `skeleton`
