# Image agent guide

## Purpose

Coordinate image loading, fallback visibility, and accessible native image semantics.

## Use when

- Media needs a fallback or loading-state composition that stays synchronized with the image.

## Choose something else when

- A native image is sufficient or a framework optimizer owns a required measured capability. Use a native img or a documented framework adapter.

## Required composition

- Compose Image.Content and Image.Fallback inside Image.Root; provide meaningful alt text or alt="" for decorative content.

## Rules

- **MUST:** Give every Content a correct alt value based on the image's purpose.
- **MUST:** Do not let a visual fallback create a duplicate or misleading accessible name.

## Common mistakes

- **Avoid:** Using CSS background images for meaningful content or omitting alt because a fallback exists. **Instead:** Use Content with intentional alt text and treat Fallback as loading or error presentation.

## Validation checklist

- Verify loaded, loading, error, cached, and source-change states.
- Confirm the accessible name remains correct in every state.

## Related guidance

- `avatar`
- `aspect-ratio`
