# Image agent guide

## Purpose

Coordinate image loading, fallback visibility, and accessible native image semantics.

## Use when

- Media needs a fallback or loading-state composition that stays synchronized with the image.

## Choose something else when

- A native image is sufficient or a framework optimizer owns a required measured capability. Use a native img or a documented framework adapter.

## Required composition

- Compose Image.Content and Image.Fallback inside Image.Root; provide meaningful alt text or alt="" for decorative content.
- Keep the native img present in SSR and during loading. Delivery props belong on Content; do not add a detached preload. Fallback defaults to idle/error; loading covers are explicit opt-in. Custom hosts must forward their real img ref.
- Put canonical src and srcSet on Root for SSR-known loading state. Content srcSet overrides Root for compatibility, but Content-only/custom-host metadata cannot inform Root during SSR. Observe exactly one Content host per Root.

## Rules

- **MUST:** Give every Content a correct alt value based on the image's purpose.
- **MUST:** Do not let a visual fallback create a duplicate or misleading accessible name.
- **MUST:** Author meaningful fallback for informative media: Content is hidden on error, and without fallback the result is empty. Multiple state-specific fallbacks are allowed; loading overlays are opt-in.

## Common mistakes

- **Avoid:** Using CSS background images for meaningful content or omitting alt because a fallback exists. **Instead:** Use Content with intentional alt text and treat Fallback as loading or error presentation.

## Validation checklist

- Verify loaded, loading, error, cached, and source-change states.
- Confirm the accessible name remains correct in every state.
- Verify source removal returns idle, cached broken hosts with empty currentSrc, detached hosts, custom native source mutations and SSR srcSet-only discovery.

## Related guidance

- `avatar`
- `aspect-ratio`
