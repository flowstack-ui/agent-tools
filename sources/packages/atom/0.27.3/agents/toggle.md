# Toggle agent guide

## Purpose

Represent one command whose pressed state remains on or off with toggle-button semantics and controlled or uncontrolled state.

## Use when

- One command such as bold, pin, or favorite remains pressed until the user operates it again.

## Choose something else when

- The control changes an immediate setting, submits a form choice, or belongs to a related keyboard-navigable set of pressed controls. Use Switch, Checkbox, or ToggleGroup.

## Required composition

- Render Root with visible command text or an accessible label; use asChild or render only when a custom element must preserve the owned button and keyboard contract.

## Rules

- **MUST:** Give Root a complete accessible name, especially when its visible content is only an icon.
- **MUST:** Use pressed with onPressedChange for controlled state or defaultPressed for uncontrolled state and preserve aria-pressed rather than inventing checkbox or switch semantics.
- **MUST:** Use Toggle for persistent command state, not for an immediate setting or a form answer.
- **MUST:** Preserve native button behavior or Atom's role, tab stop, Enter, Space, disabled, props, handlers, and refs when composing a non-native element.

## Common mistakes

- **Avoid:** Using Toggle for a setting or form value, changing its meaning between pressed states, or replacing Atom keyboard handlers in asChild composition. **Instead:** Keep one stable command label and aria-pressed state, choose Switch or Checkbox for other semantics, and merge the owned behavior.

## Validation checklist

- Verify accessible name, controlled and uncontrolled pressed state, aria-pressed and data state, pointer, Enter, and Space activation, disabled behavior, consumer handler prevention, and ref/native-prop forwarding.
- Verify native button, asChild, and render paths keep one element with correct button semantics, tab order, children, and disabled exposure.

## Related guidance

- `toggle-group`
- `switch`
- `checkbox`
- `button`
