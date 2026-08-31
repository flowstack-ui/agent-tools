# Avatar agent guide

## Purpose

Represent a person, team, organization, or other named entity with a tracked image, loading or error fallback, and optional nonsemantic grouping.

## Use when

- A picture or short fallback helps users recognize a named entity and the interface can provide sufficient identity context.

## Choose something else when

- The content is a status, count, arbitrary image, or the avatar would be the only source of essential identity. Use Badge, Image, or visible identity text paired with the appropriate content.

## Required composition

- Compose Root with the tracked src, an Image using the same src, and a Fallback that is meaningful while idle, loading, or errored. Add delayMs only to avoid brief fallback flashes. Use Group only for several Avatars and add group semantics explicitly only when the collection needs an announced name.

## Rules

- **MUST:** Pass the source to Root for preloading and use the same source on Image so rendered content matches the tracked loading status.
- **MUST:** Keep visible identifying text nearby whenever identity is important; do not make an image or initials the sole source of essential identity.
- **MUST:** Use meaningful Image alt text only when the image communicates identity not already stated nearby; otherwise use alt empty and hide redundant Fallback text from assistive technology.
- **MUST:** Provide a fallback that remains understandable for missing, loading, and failed images, and choose any loading delay without leaving essential identity temporarily unavailable.
- **SHOULD:** Keep Group structural by default; add role group and an accessible name only when users benefit from the avatars being announced as one collection.

## Common mistakes

- **Avoid:** Using different Root and Image sources or treating onLoadingStatusChange as proof that an image remains available indefinitely. **Instead:** Keep sources aligned and treat loading status as current rendering state, with a durable fallback.
- **Avoid:** Repeating an adjacent person's name in Image alt and visible Fallback text. **Instead:** Use a decorative image and aria-hidden fallback when nearby text already supplies the identity.

## Validation checklist

- Verify missing, idle, loading, loaded, changed-source, and error paths; callback status; delayed fallback timing and cleanup; and that Image and Fallback never render as competing identity output.
- Check meaningful and decorative variants with nearby visible identity text, appropriate alt text, fallback accessibility, and no color- or image-only essential meaning.
- Verify Group remains nonsemantic unless deliberately labelled and all parts preserve native props, asChild or render composition, and refs.

## Related guidance

- `image`
- `badge`
