# Link agent guide

## Purpose

Render finished native navigation as inline, standalone, or button-like content without changing its link semantics.

## Use when

- The user moves to a route, URL, document, download, email address, or telephone destination.

## Choose something else when

- The interaction changes current state without navigating. Use Button.

## Required composition

- Size accepts sparse ResponsiveValue<LinkSize> with inherit as the baseline; an explicit inherit breakpoint resets family, size, leading and tracking. asChild accepts optional parent href and owns all content and icons.
- Provide a real href or compose a router-owned anchor. Keep the default underline for prose, use subtle for recognizable navigation with hover/focus/active decoration, and reserve plain for unmistakable navigation without an underline. Theme is a deprecated explicit compatibility variant, not the default. All recipes retain a visible keyboard focus ring. Neutral navigation stays primary at rest and gains semantic accent emphasis on hover and press.
- When a Link completes a sentence or paragraph, keep it inside that semantic Text owner and leave its default inherited size so typography and wrapping remain one coherent text flow; use layout components only for independently meaningful peer items.

## Rules

- **MUST:** Preserve anchor semantics and a real destination even when the link looks like a button.
- **MUST:** Keep a Link that completes surrounding prose inside the owning sentence or paragraph and inherit its typography; do not split one sentence into layout siblings merely to align it.
- **MUST:** When color alone distinguishes an inline link at rest, require at least 3:1 contrast against adjacent text plus normal text/background contrast; hover-only decoration cannot repair missing resting distinction. Prefer underline for prose. Subtle and plain require clear context.
- **MUST:** Load styles.css or core.css plus link.css. Decoration paint is independent of variant: persistent and interaction-only lines default to 20% currentColor. Use --brick-link-decoration-color for a stronger scoped line when it is the sole identifying cue; validate the complete resting affordance without fading the anchor or focus ring.

## Common mistakes

- **Avoid:** Replacing ordinary inline or standalone navigation with Button only to increase emphasis. **Instead:** Use Link for ordinary navigation; use Button with a real href only when the destination intentionally needs a filled, soft, outlined, or ghost action treatment.
- **Avoid:** Rendering prose and the Link that completes it as separate Stack children, or explicitly restating Link's default inherited size. **Instead:** Render one semantic Text sentence with an inline Link and leave its inherited size implicit; reserve Stack for independent peers.
- **Avoid:** Removing resting underlines globally without validating links against surrounding text. **Instead:** Keep the default underline, or validate the actual resting text distinction and navigation context for subtle/plain; do not treat hover as a substitute. Existing Theme policies apply only to the deprecated theme variant.

## Validation checklist

- Inspect href and accessible name.
- For inline prose links, confirm the Link remains inside the owning sentence or paragraph, inherits its typography, and wraps as one text flow.
- Test focus, Enter navigation, visited/external behavior when relevant, and contrast.
- For no-resting-underline compositions, verify actual adjacent-text distinction and the interactive underline; theme compilation alone does not qualify arbitrary prose.
- For explicit plain navigation, verify no interaction underline appears, neutral destinations gain semantic accent hover/press emphasis, and container, current, and focus treatments still communicate the destination.

## Related guidance

- `@flowstack-ui/atom/agents/link`
- `text`
- `stack`
- `button`
