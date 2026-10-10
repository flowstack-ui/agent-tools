# Field agent guide

## Purpose

Arrange a labelled control or a targeted compound value with description, error and Atom-owned relationships.

## Use when

- One finished control needs a visible label and may need help or error text.

## Choose something else when

- Several independent questions need a shared group legend. Use Fieldset, with Field inside when individual controls also need labels.

## Required composition

- Compose Field.Root -> Field.Label -> one control -> optional Field.Description -> optional Field.Error.
- For a compound value, give each Item a unique value, set Root.target to the primary Item, and name secondary controls independently. Set authored IDs through Root.ids, not only on the control. Compatible Brick controls consume Item context; raw native controls require explicit ID and ARIA wiring.
- Use responsive size/orientation and labelWidth for horizontal composition. Context/useFieldContext read relationships and state. ErrorIcon is optional decorative artwork and follows Icon props.
- Use size=xs or sm with tone=secondary for dense property rows; keep the default md/primary hierarchy for ordinary forms.

## Rules

- **MUST:** Disabled labels and legends fade to 50%; the structural container does not fade. Descendant controls own their disabled treatment so Fieldset inheritance never compounds opacity.
- **MUST:** Use one control, or uniquely named Item controls with an intentional target and secondary accessible names.
- **MUST:** Field.Label already renders the default required marker; never add a second asterisk or RequiredIndicator unless the default is disabled.
- **MUST:** Load styles.css or core.css plus field.css and the owned control stylesheet.

## Common mistakes

- **Avoid:** Adding a manual required asterisk beside a required Field.Label. **Instead:** Set required on Field.Root and use the built-in Label marker, or explicitly replace it once.

## Validation checklist

- Confirm label, description, and error relationships.
- Confirm exactly one required marker.
- Check xs, sm, and md label density plus primary and secondary hierarchy.
- Check vertical and horizontal layouts at narrow widths.

## Related guidance

- `@flowstack-ui/atom/agents/field`
- `form`
- `fieldset`
- `input`
- `textarea`
- `checkbox`
