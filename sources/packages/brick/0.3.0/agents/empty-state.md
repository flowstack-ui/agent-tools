# EmptyState agent guide

## Purpose

Present empty content with consistent visual hierarchy and application-owned next steps.

## Use when

- A collection or workspace has no content to display.

## Choose something else when

- Content is temporarily loading. Use Spinner or Skeleton.
- A durable error needs status emphasis. Use Alert.

## Required composition

- Compose Root and Content with optional Indicator, Title, Description and authored actions. Choose Title's heading level independently from size.
- Group Title and Description with VStack gap={2}; Content separates the glyph, text group and ButtonGroup. Size and align accept sparse responsive values; omitted initial values use md and center. Keep paint on Card or Surface.

## Rules

- **MUST:** Keep copy, data classification, filtering and actions application-owned; EmptyState has no implicit live role or viewport height.
- **MUST:** Load styles.css or core.css plus empty-state.css and the CSS of additional composed owners.

## Common mistakes

- **Avoid:** Using the indicator slot as a full-size image frame. **Instead:** Place authored illustration content in Image or Frame outside the fixed glyph slot.

## Validation checklist

- Check three densities, invariant icon geometry, transparent roots, heading semantics, long RTL copy and wrapping actions in light/dark.

## Related guidance

- `alert`
- `spinner`
- `skeleton`
- `card`
- `icon`
- `image`
