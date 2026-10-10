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
- Choose responsive size, subtle/bold variant, orientation and labelWidth. PropsProvider supplies styling defaults without a host; explicit Root props override them, including false and sparse maps.

## Rules

- **MUST:** Use Root, Item, Label, and Value so the rendered dl/div/dt/dd grammar remains valid; do not recreate the relationship with ul/li or generic Stack children.
- **MUST:** Keep one label-then-value source order and use responsive orientation rather than duplicating mobile and desktop metadata trees. Horizontal measures are bounded to 40% of the row; the label-size token also works with auto. Do not squeeze comparison examples into narrow fixed-label columns.
- **MUST:** Write visible meaningful labels; do not add empty Label parts solely to force alignment.
- **MUST:** Load styles.css or core.css plus data-list.css.

## Common mistakes

- **Avoid:** Using List for phone/email/title facts or adding ARIA term/definition roles to native Data List parts. **Instead:** Use DataList native anatomy and rely on its native semantics without redundant ARIA.

## Validation checklist

- Check dl/div/dt/dd anatomy, complete visible labels, grouped and nested facts, all refs, provider overrides, both responsive orientation directions, sparse maps, measured sizes, long values, links inside Value, zoom, RTL, forced colors, and CSS loading.

## Related guidance

- `list`
- `table`
- `data-grid`
- `field`
- `stack`
