# Switch agent guide

## Purpose

Present a finished immediately applied on/off setting while Atom owns switch semantics, controlled or uncontrolled state, keyboard activation, validation, and optional form participation.

## Use when

- A setting becomes active or inactive immediately when the user operates it.

## Choose something else when

- The choice is a form answer applied later, a command whose pressed state remains active, or one of several exclusive values. Use Checkbox, Toggle, or RadioGroup.

## Required composition

- Give Switch.Root a stable visible or native accessible setting name and add Switch.Thumb as its decorative movable part. Compose Root in Field when visible Label, Description, Error, required, or invalid context is needed; use name, value, and form when checked state must submit.
- Choose Root size sm, md, or lg for the finished track, thumb, travel, and target geometry. Keep Thumb decorative and let Atom state attributes drive Brick paint.

## Rules

- **MUST:** Use Switch only for an immediately applied on/off setting; use Checkbox for a deferred form answer and Toggle for a persistent pressed command.
- **MUST:** Give Root a complete stable accessible setting name with visible Field Label, native labeling, aria-label, or aria-labelledby; Thumb remains decorative and aria-hidden.
- **MUST:** Use checked with onCheckedChange for controlled state or defaultChecked for uncontrolled state and preserve role=switch with boolean aria-checked.
- **MUST:** Use readOnly when the setting must stay focusable while Enter, Space, pointer, and custom-element activation cannot change state; do not replace it with disabled.
- **MUST:** Preserve named checked-value submission, required validity, Field state and descriptions, validation focus, external form association, and uncontrolled reset when form behavior applies.
- **MUST:** Use Brick's canonical checked, unchecked, focus, disabled, read-only, and invalid paint; invalid changes the boundary without replacing the checked meaning, and mixed or loading state is unsupported.
- **SHOULD:** Keep intrinsic geometry and complete target size, allow surrounding label text to reflow, and verify logical thumb travel in RTL without reversing on/off meaning.
- **MUST:** Load styles.css or core.css plus switch.css and Field CSS when composed.

## Common mistakes

- **Avoid:** Using Switch for a submit-later checkbox or pressed command, relying on Thumb as the accessible control, or changing the setting label between states. **Instead:** Choose by timing and semantics, name Root directly, keep Thumb decorative, and preserve one stable setting name.
- **Avoid:** Using disabled when the value should remain discoverable and read-only or inventing mixed, loading, tone, or shape props. **Instead:** Use readOnly for locked focusable state and stay within the canonical binary visual recipe.

## Validation checklist

- Verify accessible name, role and aria-checked, controlled and uncontrolled updates, pointer, Enter, and Space activation, disabled and read-only behavior, Thumb state inheritance, and native, asChild, and render semantics.
- Verify named checked-value submission, required validity with and without name, invalid and Field descriptions, validation focus, external form association, and uncontrolled reset.
- Verify three sizes, checked and unchecked contrast, focus, disabled, read-only and invalid paint, intrinsic and narrow layout, mobile targets, 200% text and 400% zoom, RTL travel, reduced motion, forced colors, and complete CSS.

## Related guidance

- `@flowstack-ui/atom/agents/switch`
- `checkbox`
- `toggle`
- `radio-group`
- `field`
- `form`
