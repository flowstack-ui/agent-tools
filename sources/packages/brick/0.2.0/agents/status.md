# Status agent guide

## Purpose

Present a compact passive state with a semantic indicator and readable label, or a decorative indicator beside text that already carries the state.

## Use when

- A process, entity, availability, health, or review state needs a dot-plus-label presentation.

## Choose something else when

- The content is a category, accolade, count, progress value, consequential message, or avatar-only presence ring. Use Badge, NotificationBadge, Progress, Alert, or Avatar status.

## Required composition

- Compose Root with one decorative Indicator and one visible Label by default. Omit Label only when adjacent visible or visually hidden text already carries the complete state and the indicator-only Root is aria-hidden.

## Rules

- **MUST:** Always provide state text. Render it through Label by default; indicator-only composition is allowed only when adjacent visible or visually hidden text already carries the complete meaning and the Root is decorative.
- **MUST:** Choose success, warning, danger, info, accent, or neutral from the state meaning, not from decorative preference.
- **MUST:** Do not assume Status announces changes; author role=status or live-region attributes only when the application owns and validates that announcement policy.
- **MUST:** Load styles.css or core.css plus status.css.

## Common mistakes

- **Avoid:** Using success for a Call button, warning for a gold accolade, or Badge merely to draw a status dot. **Instead:** Use action hierarchy for operations, accent/neutral Badge for accolades, and Status for actual dot-plus-label state.

## Validation checklist

- Check visible state text, semantic tone, decorative indicator, primary label color, light/dark, forced colors, zoom, RTL, and deliberate live-region ownership.

## Related guidance

- `badge`
- `notification-badge`
- `avatar`
- `progress`
- `toast`
