# AvatarGroup agent guide

## Purpose

Present several compact Avatar identities in one overlapping inline stack with optional explicit overflow.

## Use when

- Several people or entities need one compact identity footprint, shared Avatar presentation, or an explicit overflow summary.

## Choose something else when

- Identities should remain separated, wrap, or carry profile facts. Use HStack, Stack, List, or DataList.
- The overflow item must disclose participant actions or destinations. Use Compose renderOverflow with the owning Button, Link, Menu, or Popover.

## Required composition

- Separation is a border inside the named square with background clipped away from its outer edge. Groups with only one rendered item, including overflow-only groups, omit peer separation.
- Prefer filled Avatar variants for overlapping members. A transparent outline member reveals earlier members beneath it; use overlap="none" when that visibility is unwanted.
- Place explicit Avatar children directly inside AvatarGroup and make each Avatar alt/fallback decision from its context.
- Use max only when hiding identities is deliberate; provide a localized overflowLabel or a complete custom renderOverflow node.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Avatar children with group size, radius, tone and variant as defaults; explicit child props win. Borderless removes separation rings. Preserve owned controls when composing custom overflow.
- **MUST:** Keep all identities visible by default; use max only for an intentional bounded presentation and provide localized built-in overflow or a custom semantic renderer.
- **MUST:** Keep AvatarGroup passive; application-owned Button, Link, Menu, or Popover composition owns overflow interaction.
- **MUST:** Preserve child DOM order and use stacking only for paint order; do not use CSS or data order to change accessible reading order.
- **MUST:** Load styles.css or core.css plus avatar-group.css; the modular AvatarGroup stylesheet already includes Avatar CSS.

## Common mistakes

- **Avoid:** Recreating overlap with HStack negative margins, using attached Group, silently hiding after five identities, or using an English-only overflow label. **Instead:** Use AvatarGroup, opt into max explicitly, and provide localized or custom overflow semantics.

## Validation checklist

- Check direct-child identity semantics, source order, size/shape context, overlap, both stacking recipes, max/total arithmetic, localized/custom overflow, light/dark/forced colors, narrow widths, zoom, and RTL.
- Confirm the group adds no role, keyboard behavior, focus management, or live announcement unless supplied by the application composition.

## Related guidance

- `avatar`
- `group`
- `stack`
- `list`
- `data-list`
- `button`
- `link`
- `popover`
