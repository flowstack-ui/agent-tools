# NotificationBadge agent guide

## Purpose

Overlay a Brick-owned visual count or dot on exactly one element while Atom Badge supplies only the passive span host and the child or nearby content owns all accessible notification meaning.

## Use when

- One icon, Avatar, Button, or other single element needs compact visual notification metadata whose full meaning is present in the owning control name or nearby text.

## Choose something else when

- The content is an inline label or status, must announce automatically, performs an action itself, or the count would be the only accessible notification meaning. Use Badge, Status, a deliberately chosen live-region pattern, Button, or visible Text.

## Required composition

- Wrap exactly one React element in NotificationBadge and choose either count mode or dot mode, then choose tone, size, logical placement, and overlap for the child's shape. Include count or status meaning in the child control's accessible name or nearby visible status text.
- Use count with a finite non-negative integer and deliberate max/showZero policy, or dot=true without count-only props. Keep child sizing, clipping, responsive placement, live announcements, and state effects outside NotificationBadge.

## Rules

- **MUST:** Wrap exactly one React element and keep NotificationBadge passive; the child retains its own element, interaction, focus, semantics, and accessible name.
- **MUST:** Treat the visual indicator, count normalization, maximum formatting, visibility, logical placement, overlap, and overlay geometry as Brick-owned; Atom Badge supplies only a passive span root, not notification behavior.
- **MUST:** Choose either dot mode or count mode; use only finite non-negative integer counts, understand invalid max falls back to 99, and use showZero deliberately because zero otherwise hides.
- **MUST:** Keep the private indicator aria-hidden and include meaningful count or status in the owning control's accessible name/description or nearby visible text because an overlaid sibling is not incorporated automatically.
- **MUST:** Do not assume changing count announces or add live semantics to the private indicator; use one deliberate application-owned live path only when urgency and frequency justify it.
- **MUST:** Choose circular or rectangular overlap from the child geometry, preserve logical placement in RTL, and verify child clipping, focus rings, count growth, zoom, and responsive size without using physical offsets.
- **MUST:** Load styles.css or core.css plus badge.css and the stylesheet for the wrapped Brick child.

## Common mistakes

- **Avoid:** Using the visual count as the only name, expecting it to announce, making the wrapper interactive, or passing count and dot together. **Instead:** Name the owning control or provide visible text, keep announcements application-owned, leave interaction on the child, and choose one visual mode.
- **Avoid:** Using physical placement for RTL, circular overlap on a rectangular child by habit, or allowing the child to clip the indicator or focus ring. **Instead:** Choose logical placement and overlap from actual geometry and verify the complete composed boundary at responsive sizes.

## Validation checklist

- Verify one child; count and dot modes; valid, zero, invalid, and above-max counts; fallback max; showZero; invisible; all tones/sizes/placements/overlaps; root ref; native span props; and absence of unsupported asChild.
- Verify indicator is aria-hidden, child semantics and focus remain intact, count meaning appears exactly once in the owning name/description or visible text, updates do not announce implicitly, and any application live path is not duplicated.
- Verify single-digit circles and multi-digit pills, logical RTL placement, rectangular/circular overlap, child clipping, focus visibility, narrow layout, zoom, light/dark appearance, forced colors, and wrapped Avatar/Button/Icon geometry.

## Related guidance

- `@flowstack-ui/atom/agents/badge`
- `badge`
- `avatar`
- `button`
- `icon-button`
- `status`
- `text`
