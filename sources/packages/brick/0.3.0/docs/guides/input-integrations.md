# Input integrations

Brick Input remains a native text input. Forms, masking and payment formatting
are separate application dependencies, not built-in Brick features or required peers.
Ordinary Input and native forms need none of these packages.

## React Hook Form

Install `react-hook-form` in the application. The qualification target is 7.88.0.
Use `register` for DOM-owned values or `Controller` for controlled values; never
use both for the same field. Forward its ref and preserve its handlers. Use
Field.Label, Field.Description and Field.Error for one naming/error policy.
Test default values, reset, setValue, error focus and submitted values.

See the [Controller example source](https://github.com/flowstack-ui/brick/blob/main/playground/src/components/input/examples/InputHookForm.tsx).

## Input masks

Install `use-mask-input` separately. The qualification target is 3.14.2; use its
`useMaskInput` API, not a helper remembered from another version. Pass the mask
ref to Input's native ref. Compose multiple refs rather than overwriting them.
Use text/tel for identifiers; NumberInput is for numeric quantities, not phone
numbers or card identifiers. The sample submits formatted characters and only
demonstrates one national phone format. Verify paste, caret, middle edits,
backspace, clear and reset for the actual mask before shipping it.

The phone example disables `showMaskOnHover` and `showMaskOnFocus`, and uses
`positionCaretOnClick: "none"`. This avoids the formatter's deferred click
repositioning, which otherwise visibly moves the caret after the browser places
it. These are application mask options, not Brick input behavior.

See the [phone example source](https://github.com/flowstack-ui/brick/blob/main/playground/src/components/input/examples/InputMask.tsx).

## Card formatting

Install `react-payment-inputs` separately (qualification target 1.2.0; TypeScript
types 1.1.4). Preserve the prop getters' refs and event handlers. The example
uses Brick fields, not the optional styled wrapper. Explicit `type="text"`
narrows the third-party type without replacing its event contract.

Keep the getters' `cc-number`, `cc-exp` and `cc-csc` autocomplete hints unless
the application deliberately opts out. Saved-card suggestions are browser-owned
and depend on the browser's settings, stored cards and security policy.

This is formatting, not payment processing, PCI qualification or secure hosted
fields. Use synthetic test data only. Never persist, log or display a submitted
card/CVC payload. A production checkout needs the payment provider's integration.

See the [formatting example source](https://github.com/flowstack-ui/brick/blob/main/playground/src/components/input/examples/InputPayment.tsx).

## Composition rules

- `className`/`style` target the visual wrapper; `inputClassName`/`inputStyle`,
  native events, name, ARIA and the ref target the native input.
- Keep a single value owner. An uncontrolled Input stays DOM-owned so registered
  values and native formatting are not overwritten by a second state owner.
- Use adornments for content inside the field. Interactive suffixes need their
  own accessible name and keep their own focus. Use InputAddon with Group attached
  for external segments, setting matching sizes and recipes explicitly.
- Protect an attached action from shrinking with `Stack.Item shrink={0}`;
  the input can shrink while the button keeps its label on one line.
- Put character counts in `endAdornment`. A domain-extension NativeSelect can
  also be an end adornment, with its own accessible name and compact plain recipe.
- Input's boundary ring follows the text control, not an independently focused
  adornment. The domain example uses `size="xs"` and a logical `paddingInlineEnd: 0`
  on Input's public wrapper so the select's own padding is not doubled.
- Compatibility is version-specific. Passing a ref alone is not evidence of
  compatibility; test library state, DOM value, submission, reset and selection.
