# Fieldset agent guide

## Purpose

Render a finished native group for related controls with a legend, group messaging, and inherited Atom state.

## Use when

- Multiple related controls answer one group question.

## Choose something else when

- Only one control needs a label. Use Field.

## Required composition

- Compose Fieldset.Root -> Fieldset.Legend -> optional description/error -> Fields or grouped choices.

## Rules

- **MUST:** Give the related group a meaningful legend.
- **MUST:** Load styles.css or core.css plus fieldset.css and child component styles.

## Common mistakes

- **Avoid:** Using visual heading and div wrappers for a related choice group. **Instead:** Use Fieldset so the group label and state remain semantic.

## Validation checklist

- Inspect fieldset and legend semantics.
- Check group messaging, state propagation, spacing, and responsive layout.

## Related guidance

- `@flowstack-ui/atom/agents/fieldset`
- `form`
- `field`
- `checkbox`
