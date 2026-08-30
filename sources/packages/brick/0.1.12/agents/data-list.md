# Data List agent guide

## Purpose

Present repeated term/value metadata with native description-list semantics and a finished responsive recipe.

## Use when

- Several related labels and values describe one record, profile, object, or specification set.

## Choose something else when

- Items are peers rather than terms and descriptions, or the content is a columnar dataset. Use List for peers or Table/Data Grid for columnar data.
- The values are editable form controls. Use Field or Fieldset.

## Required composition

- Compose Root with Item groups; place one or more Label parts before one or more Value parts inside every Item.

## Rules

- **MUST:** Use Root, Item, Label, and Value so the rendered dl/div/dt/dd grammar remains valid; do not recreate the relationship with ul/li or generic Stack children.
- **MUST:** Keep one label-then-value source order and use responsive orientation rather than duplicating mobile and desktop metadata trees.
- **MUST:** Write visible meaningful labels; do not add empty Label parts solely to force alignment.
- **MUST:** Load styles.css or core.css plus data-list.css.

## Common mistakes

- **Avoid:** Using List for phone/email/title facts or adding ARIA term/definition roles to native Data List parts. **Instead:** Use DataList native anatomy and rely on its native semantics without redundant ARIA.

## Validation checklist

- Check dl/div/dt/dd anatomy, complete visible labels, source order, horizontal and vertical orientation, long values, links inside Value, zoom, RTL, forced colors, and CSS loading.

## Related guidance

- `list`
- `table`
- `data-grid`
- `field`
- `stack`
