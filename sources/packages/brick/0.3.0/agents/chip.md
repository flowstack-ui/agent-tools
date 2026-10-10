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
- Use StartElement and EndElement for coordinated adornments. For a primary token action, place Label inside ActionTrigger and keep RemoveTrigger as its sibling.
- Use density=compact for compact passive tokens; interactive targets can increase the actual height. Keep tone and variant separate, such as accent with solid.
- Use sparse ResponsiveValue for size, variant and density. Defaults stay soft/neutral/md/comfortable/pill; the reference-like recipe is compact/surface/radius=control.
- All six parts use public Atom asChild/render projection. Root unstyled delegates its subtree; nested roots reset. Part unstyled delegates only that part.
- Subtle aliases soft. Contrast is inverse text/surface paint, not neutral. Customize six paired --brick-chip-tone-* variables instead of raw color-name tones.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Keep Root noninteractive; RemoveTrigger is the only removal control, so clicking the label does not silently perform the action.
- **MUST:** Name every RemoveTrigger with the value and action, such as ariaLabel="Remove Men filter"; never expose an unlabeled close icon.
- **MUST:** Treat onPress as a removal request; the parent owns state mutation, URL synchronization, focus recovery, and announcements.
- **MUST:** Keep the only removal action visible and operable at narrow widths, zoom, and increased text size.
- **MUST:** Load styles.css or core.css plus chip.css.
- **MUST:** Disable and fade only the unavailable action, not the entire value. Keep independent actions as siblings and avoid adding parent opacity.
- **MUST:** When using unstyled, the consumer owns visible focus, target geometry, colors and spacing. Do not nest interactive hosts.

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
- `tags-input`
- `avatar`
- `icon`
