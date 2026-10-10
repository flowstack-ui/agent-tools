# Fieldset agent guide

## Purpose

Render a finished native group for related controls with a legend, group messaging, and inherited Atom state.

## Use when

- Multiple related controls answer one group question.

## Choose something else when

- Only one control needs a label. Use Field.

## Required composition

- Compose Fieldset.Root -> Fieldset.Legend -> optional Description -> Content containing Fields or grouped choices -> optional Error. Content accepts responsive gap; Root accepts responsive size. Context/useFieldsetContext expose the existing group state.

## Rules

- **MUST:** Keep Legend directly under the native Root. Description stays 8px from Legend; size controls the separate 8/16/24px header-to-content gap. Content owns field spacing and its gap prop changes only that inner spacing. Hidden native validation inputs inserted by grouped controls do not require compensating wrappers or margins.
- **MUST:** Disabled labels and legends fade to 50%; the structural container does not fade. Descendant controls own their disabled treatment so Fieldset inheritance never compounds opacity.
- **MUST:** Give the related group a meaningful legend.
- **MUST:** Load styles.css or core.css plus fieldset.css and child component styles.

## Common mistakes

- **Avoid:** Using visual heading and div wrappers for a related choice group. **Instead:** Use Fieldset so the group label and state remain semantic.
- **Avoid:** Expecting a group error to invalidate every independent Field. **Instead:** Set invalid on the failing Field; Fieldset.Error summarizes the group without feeding aggregate invalidity back into siblings.

## Validation checklist

- Inspect fieldset and legend semantics.
- Check group messaging, state propagation, spacing, and responsive layout.

## Related guidance

- `@flowstack-ui/atom/agents/fieldset`
- `form`
- `field`
- `checkbox`
