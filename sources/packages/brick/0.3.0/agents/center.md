# Center agent guide

## Purpose

Center authored content or guarantee a centered square or circle without taking over paint, icon semantics, or positioned overlay layout.

## Use when

- Content needs two-axis centering, or one fixed-size centered region must remain exactly square or circular under flex pressure.

## Choose something else when

- Children follow a row or column relationship, only general constraints are needed, the region needs paint, or layers overlap. Use Stack, Frame, Surface, or ZStack.

## Required composition

- Use Center for arbitrary two-axis alignment. Use Square or Circle with a required size when equal geometry and fixed flex participation are part of the contract.
- Compose Surface asChild around Square or Circle for background, boundary, elevation, or tone, and keep authored SVG sizing and accessibility on Icon.

## Rules

- **MUST:** Center inline changes display only and preserves normal surrounding-text baseline alignment. Square and Circle retain middle alignment as fixed inline ornaments. Internal two-axis centering is independent of vertical-align.
- **MUST:** Choose Center for arbitrary centering, Square for a guaranteed equal-size centered region, and Circle only when genuinely circular geometry is intended.
- **MUST:** Give Square and Circle one explicit scalar or responsive size; do not recreate equal inline and block dimensions with separate Frame constraints.
- **MUST:** Compose Surface or the purposeful finished owner for paint, padding, boundary, and elevation; Center, Square, and Circle own none of those jobs.
- **MUST:** Keep SVG size, tone, direction, and accessibility on Icon; the centered container does not turn the graphic into an action or supply its meaning.
- **MUST:** Use ZStack for positioned overlay centering; do not recreate AbsoluteCenter with application positioning or transforms.
- **MUST:** Author responsive size mobile first; omit initial to keep automatic baseline geometry, or supply it to replace that baseline, and include only the Brick breakpoint overrides that change.
- **MUST:** Load styles.css or core.css plus center.css.

## Common mistakes

- **Avoid:** Using a shrinkable Frame/HStack icon well, adding background and radius to Icon, or using Circle for every decorative icon. **Instead:** Use Square or Circle for invariant geometry, compose Surface for paint, and reserve Circle for deliberately circular presentation.

## Validation checklist

- Check computed centering, equal inline and block dimensions, fixed flex participation, responsive carry-forward, inline flow, RTL, and zoom.
- Confirm Surface and Icon composition preserves paint, radius, glyph containment, and accessibility without custom layout CSS.

## Related guidance

- `stack`
- `frame`
- `surface`
- `icon`
- `z-stack`
- `aspect-ratio`
- `badge`
