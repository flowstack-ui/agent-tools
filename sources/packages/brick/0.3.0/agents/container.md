# Container agent guide

## Purpose

Own consistent centered content width, logical page gutters, and size variants for sections and application shells.

## Use when

- Page or section content needs a shared maximum inline size and responsive logical gutters.

## Choose something else when

- The region needs a visual boundary or only a local one-axis relationship. Use Surface/Card or Stack.

## Required composition

- Place section content inside Container, then use Stack or Grid for internal relationships; let full-bleed backgrounds live outside it.

## Rules

- **MUST:** Use measure=full for fluid parent width; use Stack for child alignment and Surface for paint. Container has no generic styling or responsive measure props. Defaults are wide (72rem) and md fluid gutters; omit them unless the example intentionally contrasts defaults.
- **MUST:** Use asChild with one non-Fragment child that forwards props and ref to adopt its host; do not also pass as. Classes and styles merge, Container's supplied keys win, handlers run Container then child, and both refs receive the host. Avoid competing child width/padding styles. Keep separate hosts when paint spans beyond the content measure.
- **MUST:** Use Container rather than repeating application max-width, auto-margin, and gutter CSS across sections.
- **MUST:** Give adjacent shell regions that must share alignment lines, such as an App Bar, hero content, and attached proof rail, the same Container measure and gutter recipe.
- **MUST:** Do not use Container as a visual card or background owner.
- **MUST:** Load styles.css or core.css plus container.css.

## Common mistakes

- **Avoid:** Applying a separate max-width class to every page section, giving visually connected shell regions different measures or gutters, or nesting Containers without a width reason. **Instead:** Use one deliberate Container boundary per aligned content region and repeat the same named measure and gutter where separate regions must share a grid line.

## Validation checklist

- Check gutters, max width, and shared alignment lines at all adopted breakpoints, zoom levels, and RTL.
- Confirm full-bleed and contained regions align intentionally and CSS is loaded.

## Related guidance

- `stack`
- `grid`
- `surface`
- `card`
- `app-bar`
