# Editable agent guide

## Purpose

Present inline text editing with Atom-owned draft, commit, cancel and focus behavior.

## Use when

- An existing text value should become an input or textarea on demand.

## Choose something else when

- The field should always be editable. Use Input or Textarea.

## Required composition

- Use Root or RootProvider, Area, Preview and exactly one Input or Textarea. Provide Label or an accessible name, with optional Control and triggers.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use Root textStyle with shared Text recipes (responsive supported), weight, tone and align for synchronized preview/editor typography. Use textStyle=inherit inside an existing text context. Size controls density, not a typography limit. Do not style only the preview or duplicate a title value.
- **MUST:** Use Root/Area/Control/Preview asChild for one structural host. Keep native Input, Textarea and Label. Custom Preview children must read Context.valueText. Use Trigger unstyled asChild for Button/IconButton so one recipe owns visuals. Preview highlight=none removes hover fill while keeping focus.
- **MUST:** Separate draft changes from commit requests; saving, errors and retries belong to the application.
- **MUST:** Update controlled value and edit in their callbacks. Create an external controller inside the Field scope when it must inherit Field state.
- **MUST:** Load styles.css or core.css plus editable.css and the styles of composed components.

## Common mistakes

- **Avoid:** Rendering both Input and Textarea or saving every draft as a completed edit. **Instead:** Use one named native editor and save on the explicit commit boundary.

## Validation checklist

- Verify empty and defaultEdit rollback, controlled refusal, keyboard, outside events and IME.
- Verify Field/form reset, textarea autoresize, nested Dialog focus, preview/editor geometry, RTL, appearances and forced colors.

## Related guidance

- `@flowstack-ui/atom/agents/editable`
- `field`
- `form`
- `input`
- `textarea`
- `button`
- `dialog`
