# Surface agent guide

## Purpose

Apply semantic background tones and layers, boundaries, elevation, radius, inset, and optional decorative media layering without implying a specific content object.

## Use when

- A region needs a semantic visual plane but Card, Dialog, or another purposeful component would add the wrong anatomy.
- Decorative image, video, canvas, or authored artwork needs to sit behind foreground content with an optional contrast scrim.

## Choose something else when

- The region represents one bounded subject with card anatomy. Use Card.

## Required composition

- Choose Surface level and boundary by hierarchy, then compose public layout and content components inside. Use asChild around Section when paint must cover the Section rhythm without another host. For background media, author Media, optional Scrim, and Content in that order. When layered foreground content needs four-sided breathing room, set inset on the Surface root; Content owns foreground layering, not padding. Use xl and 2xl for page-sized panels or heroes, and the responsive value shape when that inset should grow with the viewport.

## Rules

- **SHOULD:** Choose surface level by information hierarchy, not decoration alone.
- **SHOULD:** Use accent tone only for a branded or conversion plane, never as a generic status surface.
- **MUST:** Use asChild only with one existing non-Fragment host that already owns the required semantics or layout; preserve that child's meaning and keep Surface responsible only for paint.
- **MUST:** Load styles.css or core.css plus surface.css.
- **MUST:** Use the Surface inset recipe for four-sided internal spacing; Surface.Content provides z-order only, and Stack startSpacing/endSpacing remain axis-specific.
- **SHOULD:** Use sm through lg for local panels and reserve xl or 2xl for page-sized panels, heroes, and split layouts.
- **MUST:** Write responsive inset mobile first with a required initial value and only the breakpoint overrides that change; omit a scalar inset none because none is already the default.
- **MUST:** Change a centered child's Frame or Container measure when the visible issue is line length or available width; Surface inset moves every child edge and does not replace content measure.
- **MUST:** Treat Surface.Media as decorative and noninteractive; keep meaningful media and controls in Content or ordinary document flow.
- **MUST:** Give Brick Image explicit fill inside Surface.Media so its actual Content and Fallback consume the complete media layer.
- **MUST:** Put every foreground child inside Surface.Content when Media or Scrim is used.
- **SHOULD:** Choose Scrim strength through the public prop and let the theme provide only the semantic scrim color unless one deliberate instance requires an advanced recipe override.
- **MUST:** Verify foreground contrast against every media state; Scrim does not prove contrast by itself.

## Common mistakes

- **Avoid:** Using arbitrary background colors to recreate a surface. **Instead:** Use Surface and theme its semantic tokens.
- **Avoid:** Adding absolute-positioning and z-index CSS for ordinary background media. **Instead:** Use Surface.Media, Surface.Scrim, and Surface.Content.
- **Avoid:** Expecting Surface.Content or Stack edge spacing to create padding on every foreground edge. **Instead:** Set inset on the Surface root, then use Stack only for child arrangement and primary-axis spacing.
- **Avoid:** Repeating page-panel padding in Block CSS. **Instead:** Use a larger or responsive Surface inset; use the public padding token only for one deliberate asymmetric relationship that the closed recipe cannot express.
- **Avoid:** Increasing inset to make a narrow centered child look wider. **Instead:** Adjust the child's Frame or Container measure independently.

## Validation checklist

- Check foreground contrast against the selected surface in every appearance.
- Confirm nested surfaces communicate hierarchy without excessive borders or elevation.
- Confirm Media and Scrim fill the root, remain hidden from assistive technology and pointer input, and Content stays above both.
- Check that layered foreground content has intentional spacing on all four logical edges at narrow and wide sizes.
- Check that responsive inset changes at the intended shared breakpoint while media and scrim remain edge-to-edge.

## Related guidance

- `card`
- `section`
- `container`
- `stack`
- `grid`
