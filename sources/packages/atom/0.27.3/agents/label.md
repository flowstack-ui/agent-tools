# Label agent guide

## Purpose

Provide a server-safe native label for one form control, with optional consumer-owned state metadata and no independent behavior contract.

## Use when

- One native form control needs a standalone visible text label and does not require coordinated description, error, or Field state wiring.

## Choose something else when

- The control also needs coordinated required, disabled, invalid, description, or error relationships, or the text labels a group of controls. Use Field.Label or Fieldset.

## Required composition

- Render clear visible text in Root and either match htmlFor to exactly one labelable control id or wrap that control. Mirror optional metadata props only when useful for selectors, while applying real disabled, required, readOnly, and invalid state to the control itself.

## Rules

- **MUST:** Associate Root with one labelable control through matching htmlFor and id or valid native wrapped-control labeling.
- **MUST:** Use clear visible label text; do not replace an ordinary form label with placeholder text or an unlabeled icon.
- **MUST:** Treat disabled, required, readOnly, and invalid props as data metadata only and apply the corresponding native or ARIA state to the associated control.
- **MUST:** Use Field.Label when label, control, description, error, and shared state need coordinated IDs and relationships.
- **MUST:** Do not use one Label for several controls; use Fieldset and Legend or the component's group labeling contract.

## Common mistakes

- **Avoid:** Setting Label required or invalid and assuming the control announces or enforces that state. **Instead:** Apply actual required and invalid semantics to the control and keep Label metadata synchronized.
- **Avoid:** Using htmlFor that does not match an id, wrapping multiple controls, or using Label as general text styling. **Instead:** Maintain one valid native label-control association and use ordinary text elements for non-form content.

## Validation checklist

- Verify explicit htmlFor/id and wrapped-control variants focus or activate the intended native control and expose the correct accessible name.
- Verify disabled, required, read-only, and invalid data attributes reflect consumer state while the control independently exposes and enforces its real state.
- Confirm complex fields use Field, control groups use Fieldset or their group primitive, and asChild or render overrides preserve valid labeling semantics, props, and refs.

## Related guidance

- `field`
- `fieldset`
- `input`
