# Group agent guide

## Purpose

Create a compact inline visual cluster and optionally attach direct children without changing their semantics or keyboard behavior.

## Use when

- Direct children need shared outside corners and joined interior borders.
- A small mixed set of controls or fields needs compact inline grouping.

## Choose something else when

- The relationship needs responsive direction, wrapping, distribution, or ordinary block layout. Use Stack/HStack/VStack.
- Commands need roving focus or items own pressed selection. Use Toolbar or ToggleGroup.
- Tags, skills, social destinations, profile facts, or responsive actions form a content collection rather than one attached control silhouette. Use List, Grid, DataList, or Stack.

## Required composition

- Place the intended bordered elements as direct children. Apply variants, sizes, semantics, accessible names, and events to those children.

## Rules

- **MUST:** Use attached only for one unwrapped row or column whose direct children form one continuous visual silhouette.
- **MUST:** Author role=group and an accessible name only when the controls form a genuine accessibility relationship; Group adds neither by default.
- **MUST:** Keep keyboard behavior with the composed controls; Group never substitutes for Toolbar, ToggleGroup, or a form group.
- **MUST:** Do not use Group for tags, skills, social destinations, profile facts, or responsive action rows; use List, Grid, DataList, or Stack unless direct children need one compact attached control silhouette.
- **MUST:** Load styles.css or core.css plus group.css and every composed child component stylesheet.

## Common mistakes

- **Avoid:** Using HStack plus local negative margins, using Toolbar merely to join borders, or using Group as a generic wrapper for unrelated content. **Instead:** Use Group only for the compact or attached direct-child relationship and select List, DataList, Grid, Stack, Toolbar, or ToggleGroup for the actual content or behavior.

## Validation checklist

- Check direct-child structure, shared borders, outside logical corners, hover/focus stacking, visible focus rings, RTL, vertical orientation, zoom, forced colors, and narrow containment.
- Confirm Group adds no role, name, selection, or keyboard behavior.

## Related guidance

- `stack`
- `data-list`
- `list`
- `grid`
- `button`
- `icon-button`
- `toolbar`
- `toggle-group`
