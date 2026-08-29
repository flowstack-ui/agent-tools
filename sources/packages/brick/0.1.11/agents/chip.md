# Chip agent guide

## Purpose

Present one compact authored or selected value with an optional, explicitly named remove action.

## Use when

- An applied filter, recipient, assignee, category, or other value already in application state needs compact presentation and may be removable.

## Choose something else when

- The content is passive metadata or status with no removal action. Use Badge.
- The user is choosing or toggling a value rather than removing an existing one. Use Toggle, ToggleGroup, CheckboxGroup, or another matching selection control.

## Required composition

- Compose Root with Label and include RemoveTrigger only when the surrounding application can remove that value; give every RemoveTrigger a value-specific ariaLabel and onPress handler.

## Rules

- **MUST:** Keep Root noninteractive; RemoveTrigger is the only removal control, so clicking the label does not silently perform the action.
- **MUST:** Name every RemoveTrigger with the value and action, such as ariaLabel="Remove Men filter"; never expose an unlabeled close icon.
- **MUST:** Treat onPress as a removal request; the parent owns state mutation, URL synchronization, focus recovery, and announcements.
- **MUST:** Keep the only removal action visible and operable at narrow widths, zoom, and increased text size.
- **MUST:** Load styles.css or core.css plus chip.css.

## Common mistakes

- **Avoid:** Using one Button for the complete chip so selecting the label removes the value, or adding a decorative x with no accessible action name. **Instead:** Use passive Chip.Root and Chip.Label with a separately named Chip.RemoveTrigger.
- **Avoid:** Using Chip as a complete editable token-entry system with automatic keyboard deletion and focus movement. **Instead:** Keep standalone Chip parent-controlled and use an Atom-backed collection owner when token-entry behavior is required.

## Validation checklist

- Check visible label, value-specific removal name, mouse and keyboard activation, disabled treatment, focus visibility, and parent-owned removal.
- Check narrow widths, zoom, long labels, RTL, forced colors, touch targeting, and CSS delivery.

## Related guidance

- `badge`
- `button`
- `toggle`
- `toggle-group`
- `checkbox-group`
