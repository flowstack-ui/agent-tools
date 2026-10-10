# InputAddon agent guide

## Purpose

Present a noninteractive external segment attached to a native input.

## Use when

- A prefix or suffix belongs in a separate segment outside the input boundary.

## Choose something else when

- Content belongs inside the input boundary. Use Input startAdornment/endAdornment.

## Required composition

- Compose Group attached with InputAddon and Input. Set matching size and variant explicitly on both; Group does not propagate Input recipes.

## Rules

- **MUST:** Keep InputAddon noninteractive. Use Button or IconButton for actions and Field for labels; meaningful units must be present in accessible descriptions.
- **MUST:** Load styles.css or core.css with input-addon.css, input.css and group.css when composing.

## Common mistakes

- **Avoid:** Using an addon as the only label or as a button. **Instead:** Use Field.Label and a real named Button for actions.

## Validation checklist

- Check attached edges, matching heights, RTL, narrow widths and responsive recipes.

## Related guidance

- `input`
- `group`
- `field`
