# Switch agent guide

## Purpose

Represent an immediately applied boolean setting through the compatible standalone button Root or the compound Field anatomy, with one state owner and one native form input.

## Use when

- A setting becomes active or inactive immediately when the user operates it.
- A styled layer needs associated visible labels, explicit native-input integration, decorative state artwork, or an external controller.

## Choose something else when

- The choice is a form answer applied later or a command whose pressed state remains active. Use Checkbox or Toggle.

## Required composition

- Keep existing standalone usage as Root with an explicit Thumb; Root retains its automatic form proxy when name or required needs one.
- For compound usage, compose one Field or RootProvider with exactly one Control and one HiddenInput. Add Label for visible associated text, Thumb for the movable visual, and Indicator or ThumbIndicator only for decorative checked/fallback artwork.

## Rules

- **MUST:** Use owner ids for custom control/label/input associations in SSR. Local part id overrides register after mounting; explicit aria-labelledby and htmlFor remain caller-owned.
- **MUST:** Give the switch a stable accessible name with compound Label, aria-label, aria-labelledby, or outer Field labeling; decorative parts remain aria-hidden and never contain actions.
- **MUST:** Use one checked-state owner: Field props, or one controller passed to RootProvider. Do not add checked state to Control or synchronize a second local switch.
- **MUST:** Author exactly one HiddenInput in compound mode. Do not add HiddenInput under standalone Root, which already owns its automatic proxy policy.
- **MUST:** Preserve the boolean onCheckedChange callback, Control focus target, native checked-only submission, required validation focus, uncontrolled reset, disabled omission, and controlled reset ownership.
- **MUST:** Keep links and other actions outside Control. A link may appear inside Label because native label activation keeps an interactive descendant independent.
- **MUST:** Use Switch only for an immediately applied on/off setting; do not substitute it for a deferred checkbox answer or pressed command.
- **MUST:** Keep read-only Switch focusable while preventing pointer, Enter, Space, label, and custom-host activation from changing state.

## Common mistakes

- **Avoid:** Using Root as a compound wrapper, rendering an automatic and explicit input together, placing a link inside Control, changing the accessible name with state artwork, or treating inputValue as controller state. **Instead:** Keep Root button-compatible, use Field or RootProvider for compound anatomy, author one HiddenInput, keep actions in Label, and reserve RootProvider.value for the controller.

## Validation checklist

- Verify Root compatibility, Field/Control/Label/Input associations, one input and tab stop, boolean controlled/uncontrolled updates, label/pointer/Enter/Space activation, read-only and disabled behavior, event cancellation, refs, SSR, and custom hosts across documents.
- Verify named and unnamed reset, checked-only and repeated-name FormData, required validation focus, external form ownership, disabled fieldsets, input handler/ref composition, provider reset policy, and stable decorative indicator naming.

## Related guidance

- `checkbox`
- `toggle`
- `field`
- `form`
