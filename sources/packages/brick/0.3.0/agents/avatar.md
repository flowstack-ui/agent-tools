# Avatar agent guide

## Purpose

Present one compact person or entity identity with a finished fixed-square image/fallback recipe and optional visual status ring.

## Use when

- A person, organization, workspace, or other named entity needs a compact fixed-square identity token with explicit fallback content.

## Choose something else when

- A larger editorial or profile portrait needs an authored aspect ratio, crop, focal position, or responsive measure. Use Image.
- A count or dot must attach to an identity. Use NotificationBadge composed around Avatar.

## Required composition

- Separation is a border inside the named square with background clipped away from its outer edge. Groups with only one rendered item, including overflow-only groups, omit peer separation.
- Standalone avatars have no separation ring by default. Optional and group rings stay inside the named size; grouping never enlarges an avatar's visible outer box.
- Provide explicit alt and localized fallback, or omit fallback for a generic person icon. Keep Avatar passive and let an owning Button or Link provide interaction, focus, and the functional accessible name.
- Keep visible identity or status text nearby when the image or status ring alone would be ambiguous or consequential.
- Use AvatarGroup when multiple Avatars need one overlap, stacking, size, shape, or overflow contract.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Avatar for compact fixed-square identity presentation, not generic media or larger editorial portraits.
- **MUST:** Decide alt from context: preserve meaningful identity when Avatar adds it, and use alt="" only when adjacent text or the owning control already supplies the same identity.
- **MUST:** Set src on Avatar or Avatar.Root and let Image inherit it. Native loading, srcSet, sizes and request attributes belong on Image or imageProps; never create a detached preload.
- **MUST:** Supply localized fallback when initials are desired; omission uses a generic person icon. Never infer identity or generate initials from a filename.
- **MUST:** Keep Avatar passive; wrap it with the public Button or Link that owns any action or destination.
- **MUST:** Provide separate accessible status text when a status ring communicates meaningful availability.
- **MUST:** Use named sizes 2xs through 5xl or full inside a constrained square parent. The compact progression is 24/32/36/40/44/48/64px through 2xl; use Image for authored non-square media.
- **MUST:** Load styles.css or core.css plus avatar.css.

## Common mistakes

- **Avoid:** Forcing a large 4:5 profile portrait into Avatar, using alt="" merely because a name appears somewhere nearby, generating fallback initials inside Brick, or treating the status ring as an announcement. **Instead:** Use Image for authored portrait media, make the alt decision from the specific context, provide explicit fallback content, and keep meaningful status in text.

## Validation checklist

- Check missing, idle, loading, loaded, changed-source, and error paths; delayed fallback timing; fixed square size; crop; informative and decorative naming; passive semantics; nearby identity/status text; light/dark/forced colors; zoom; and RTL.
- Confirm a named Avatar size is used, CSS is loaded, and any owning Button, Link, or NotificationBadge preserves its own public contract.

## Related guidance

- `@flowstack-ui/atom/agents/avatar`
- `avatar-group`
- `image`
- `button`
- `link`
- `notification-badge`
- `badge`
- `status`
