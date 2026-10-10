# AlertDialog agent guide

## Purpose

Require an explicit response to an urgent or consequential decision with alertdialog semantics, safe initial focus, and non-dismissible backdrop behavior.

## Use when

- A destructive, irreversible, security-sensitive, or otherwise consequential action requires the user to choose a safe cancellation or explicit action before continuing.

## Choose something else when

- The surface presents ordinary information, a form, or a task that is not an urgent consequential decision. Use Dialog.

## Required composition

- Compose Root around Content; add Trigger for local activation or omit it for controlled and triggerless workflows, and use Portal only when the layer must leave its DOM location. When Overlay is rendered, keep it as a sibling of Content. Inside Content, supply the required accessible name and description with Title and Description or native ARIA relationships, and use Cancel and Action when the decision needs those owned controls.

## Rules

- **MUST:** Keep the fixed alertdialog role and provide both an accessible name with Title or native labeling and an accessible description with Description or native aria-describedby.
- **MUST:** Make Cancel the safe initial focus target for consequential actions unless an explicitly safer workflow target is supplied.
- **MUST:** Do not add backdrop dismissal; require Cancel, Action, or an intentional permitted Escape path to resolve the decision.
- **MUST:** Render Overlay and Content as siblings inside Portal and rely on AlertDialog's inherited modal focus, isolation, scroll, and top-layer ownership.
- **MUST:** Use Cancel and Action for the decision controls so close reasons and interaction details remain available to controlled workflows.

## Common mistakes

- **Avoid:** Using AlertDialog for ordinary forms, focusing the destructive Action first, omitting Description, or making the backdrop dismiss the decision. **Instead:** Use Dialog for ordinary tasks; for consequential decisions provide Title, Description, safe Cancel focus, explicit Action, and no backdrop dismissal.

## Validation checklist

- Verify alertdialog role, accessible name and description, safe Cancel initial focus for keyboard, pointer, touch, and programmatic opening, Tab containment, and that backdrop interaction cannot close the layer.
- Verify Cancel and Action close reasons, controlled state, permitted Escape behavior, nested top-layer ownership, document scroll lock, background isolation, exit presence, and focus restoration.

## Related guidance

- `dialog`
- `modal`
