# Float agent guide

## Purpose

Attach authored content across a local edge without allocating layout space.

## Use when

- A badge, status or independent action must straddle a local content edge.

## Choose something else when

- Content contributes to layered layout size, crosses padding, represents notification counts or needs popup behavior. Use ZStack, Bleed, NotificationBadge, or Popover.

## Required composition

- Use Float.Anchor around in-flow content followed by Float.Root. Use Anchor inline for intrinsic sizing; parent alignment still controls stretch.
- Keep Float.Root beside clipped Avatar/Card content, not inside it. Paint and size remain on Badge, Surface, Frame, Circle or Icon.

## Rules

- **MUST:** Supply a deliberate positioned containing block; Anchor adds no size without in-flow content or Frame constraints.
- **MUST:** Use signed offset, offsetInline and offsetBlock; axis overrides include zero. Numbers are base factors; numeric strings preserve spacing tokens. Centered axes ignore offsets.
- **MUST:** Float adds no accessible meaning, hiding, announcements or interaction. Name meaningful content and keep independent interactive controls siblings.
- **MUST:** Use sparse CSS-only responsive placement and offsets without reordering the DOM; start/end mirror in RTL.
- **MUST:** Load styles.css or core.css plus float.css and child CSS. Never remove child clipping or use Float as a portal/collision engine.
- **MUST:** Keep the wrapper when a child owns transform, position or display. Use asChild only on compatible hosts.

## Common mistakes

- **Avoid:** Replacing NotificationBadge with Float or floating inside a clipped Avatar. **Instead:** Keep notification policy on NotificationBadge; wrap Avatar and Float as siblings in Anchor.

## Validation checklist

- Measure all nine placements, signed offsets, responsive carry-forward, RTL, nested roots and parent size.
- Verify focus/pointer access, clipping boundaries, narrow width, appearance and packed CSS.

## Related guidance

- `z-stack`
- `bleed`
- `notification-badge`
- `frame`
- `surface`
- `avatar`
- `badge`
- `icon-button`
