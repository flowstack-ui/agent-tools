# Badge agent guide

## Purpose

Present a short passive category, status, metadata label, or compact circular passive marker with a complete Brick visual recipe.

## Use when

- A short non-interactive label needs a bounded visual treatment that remains understandable in its surrounding content.

## Choose something else when

- The element performs an action, changes state, announces a live update, or displays a count attached to another element. Use Button, an appropriate control, a live-status pattern, or NotificationBadge.

## Required composition

- Place the short label directly in Badge; when an icon or separately styled Text is necessary, keep those children passive and let Badge own their spacing and foreground. Use size=xl with shape=circle only for a deliberate passive empty-state icon well.

## Rules

- **MUST:** Keep Badge passive; do not add click, press, selection, or disclosure behavior to it.
- **MUST:** Keep every count or status understandable from visible text or its owning control without relying on color, shape, or placement, and never assume Badge announces changes or joins a sibling control name automatically.
- **MUST:** When composing Text inside Badge, use tone=inherit unless that Text intentionally communicates a separate semantic tone, so the Badge recipe continues to own foreground contrast.
- **MUST:** Rely on Badge's gap for an icon and label instead of literal whitespace, wrapper margins, or positional offsets.
- **MUST:** Keep the label short and atomic; Badge stays on one line, so use ordinary Text for explanatory or prose-length content.
- **MUST:** Use shape=circle only for one compact passive icon or single character with nearby context; use IconButton for an action and Status for a dot-and-label state.
- **MUST:** Load styles.css or core.css plus badge.css.

## Common mistakes

- **Avoid:** Nesting default-tone Text in a Badge, manually spacing an icon and label, using a padded rounded Badge for a circular verification marker, or using Badge as an eyebrow solely for uppercase styling. **Instead:** Use plain Badge text when possible, tone=inherit for nested Text, Badge's own gap for children, shape=circle for a passive icon marker, and Text variant=eyebrow for a short editorial heading introduction.

## Validation checklist

- Check label brevity, one-line atomic sizing, passive semantics, child spacing, foreground contrast for every variant and tone, zoom, forced colors, and RTL.
- Confirm nested Text inherits the Badge foreground, circle geometry remains exactly square, and CSS is loaded.

## Related guidance

- `@flowstack-ui/atom/agents/badge`
- `text`
- `icon`
- `notification-badge`
- `button`
- `status`
- `z-stack`
