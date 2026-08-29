# Atom behavior composition

## Purpose

Compose Atom primitives without duplicating their owned semantics, state, accessibility, focus, or interaction behavior.

## Decision order

1. Write the semantic, state, focus, keyboard, pointer, touch, and assistive-technology requirements.
2. Choose the primitive whose public contract owns that behavior.
3. Follow its required anatomy and preserve the relationships between Root, trigger, content, label, description, and items.
4. Use native props, asChild, or render only when the replacement preserves resolved semantics and required handlers.
5. Test the behavior before adding any higher-layer styling or product workflow.

## Selection map

- **one behavior owner:** use one public Atom primitive. Do not combine primitives that compete for the same focus or state contract.
- **compound anatomy:** use the documented Root and named parts. Keep required parts inside their owning context.
- **several related disclosure sections:** use Accordion. Preserve Item, Header, Trigger, and Content relationships and choose heading levels from the host document.
- **static item or sequence semantics:** use List. Keep ordered or unordered native meaning and do not invent an interaction model.
- **custom element integration:** use asChild or render. Merge props and refs instead of replacing Atom handlers.
- **controlled application state:** use the primitive's controlled props. Keep business effects outside the primitive.

## Rules

- **MUST:** Follow each primitive's documented anatomy and required labeling relationships.
- **MUST:** Preserve Atom props, handlers, refs, IDs, ARIA attributes, and data state when custom rendering.
- **MUST:** Do not replace an Atom contract with hand-written event listeners, focus movement, or ARIA.
- **SHOULD:** Keep pure structural composition server-safe and introduce a client boundary only where behavior requires it.

## Native fallback

1. Verify that no Atom primitive or native element already owns the complete behavior.
2. Use semantic native HTML for ordinary document structure and behavior that needs no reusable Atom contract.
3. Document any repeated manual behavior as a potential Atom gap instead of silently normalizing it in applications.

## Validation checklist

- Inspect the final DOM rather than only the JSX component names.
- Exercise keyboard, pointer, touch, focus return, dismissal, disabled state, controlled state, and RTL behavior as applicable.
- Run automated accessibility checks and perform the component's manual protocol for material interaction changes.
- Confirm application effects do not replace or fight the primitive's state owner.

## Related guidance

- `layer-selection`
- `form`
- `field`
- `fieldset`
- `navigation-menu`
- `menu`
- `dropdown-menu`
- `context-menu`
- `menubar`
- `tooltip`
- `hover-card`
- `checkbox-group`
- `radio-group`
- `switch`
- `toggle`
- `toggle-group`
- `slider`
- `rating`
- `listbox`
- `select`
- `multi-select`
- `combobox`
- `number-input`
- `otp-field`
- `password-toggle-field`
- `file-upload`
- `clipboard`
- `toast`
- `swipeable-item`
- `collapsible`
- `table`
- `data-grid`
- `tree`
- `tree-grid`
- `feed`
- `aspect-ratio`
- `avatar`
- `badge`
- `label`
- `progress`
- `visually-hidden`
- `direction`
- `modal`
- `dialog`
- `alert-dialog`
- `drawer`
- `popover`
- `tabs`
- `toolbar`
- `accordion`
- `list`
