# Spinner agent guide

## Purpose

Present visual loading without owning request state or announcements.

## Use when

- A task needs a compact indeterminate visual indicator.

## Choose something else when

- A named progress task exposes completion or a range. Use ProgressCircle.

## Required composition

- Use responsive size for breakpoint-specific diameters; inherit follows typography.
- Use asChild for one passive SVG/artwork element, never a control or focusable subtree. Artwork owns its stroke; Spinner supplies size, color and motion without ring paint.
- Pair a decorative Spinner with visible status text; keep Button loading and Toast announcements on their existing owners.

## Rules

- **MUST:** Keep Spinner decorative unless a standalone graphic needs an authored label; do not add a duplicate live region.
- **MUST:** Load styles.css or core.css plus spinner.css.

## Common mistakes

- **Avoid:** Replacing ProgressCircle or a button's busy semantics with Spinner. **Instead:** Keep the semantic owner and use Spinner only for visual feedback.

## Validation checklist

- Check square geometry, normal/reduced motion, forced colors, RTL, light/dark and one accessible name.

## Related guidance

- `button`
- `icon-button`
- `toast`
- `progress-circle`
- `icon`
