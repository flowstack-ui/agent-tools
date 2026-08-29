# AlertDialog agent guide

## Purpose

Present a finished urgent or consequential decision that requires an explicit response, safe initial focus, and non-dismissible backdrop behavior.

## Use when

- A destructive, irreversible, security-sensitive, unsaved-change, or otherwise consequential action requires a safe cancellation choice and an explicit response before continuing.

## Choose something else when

- The surface presents an ordinary form, information, or multi-step task rather than one urgent decision. Use Dialog.
- The content is an anchored utility panel or passive feedback that does not require a response. Use Popover or Menu, or Toast or Status.

## Required composition

- Compose AlertDialog.Root with AlertDialog.Trigger and AlertDialog.Portal; inside Portal keep AlertDialog.Overlay and AlertDialog.Content as siblings. Inside Content, arrange Header with the required Title and Description, use a short optional Body only when needed, and place Cancel before Action in Footer.
- Compose Brick Button through Cancel and Action so each response keeps its visual and behavioral role. When a local Appearance scope owns the trigger, portal into that scope or apply the same Appearance to the portalled visual root.

## Rules

- **MUST:** Reserve AlertDialog for one urgent or consequential decision; use Dialog for ordinary tasks, forms, or complex workflows.
- **MUST:** Keep the alertdialog semantics and provide both an accessible name with visible Title or native labeling and an accessible description with Description or native aria-describedby.
- **MUST:** Place a visible enabled Cancel before Action and make Cancel the safe initial focus target for consequential actions unless an explicitly safer workflow target is supplied.
- **MUST:** Do not add backdrop dismissal; require Cancel, Action, or an intentionally permitted Escape path to resolve the decision.
- **MUST:** Render Overlay and Content as siblings inside Portal and rely on AlertDialog's inherited modal focus, isolation, scroll, and top-layer ownership.
- **MUST:** Apply destructive or cautionary tone to the Action Button, not to the entire dialog surface, and keep Cancel visually safe and unambiguous.
- **MUST:** When an Action starts asynchronous validation or work, prevent its automatic close until the application confirms success, preserves errors, and intentionally updates open state.
- **MUST:** Keep permissions, authorization, persistence, pending state, error recovery, and the actual destructive operation in application code; AlertDialog owns presentation and interaction semantics only.
- **SHOULD:** Keep the decision concise; use the bounded Body only for essential supporting context and move complex forms or third-party interactive portals to Dialog.
- **MUST:** When Portal leaves a local Appearance scope, reproduce that scope on the portalled visual root or target a portal container inside it.
- **MUST:** Load styles.css or core.css plus alert-dialog.css.

## Common mistakes

- **Avoid:** Using AlertDialog for an ordinary form, focusing the destructive Action first, omitting the description, or making the backdrop dismiss the choice. **Instead:** Use Dialog for ordinary tasks; for consequential decisions provide Title, Description, safe Cancel focus, explicit Action, and no backdrop dismissal.
- **Avoid:** Closing immediately while an asynchronous destructive operation is still pending or styling the whole surface as destructive. **Instead:** Prevent automatic close until application work succeeds and communicate danger through the Action Button and concise decision copy.

## Validation checklist

- Verify alertdialog role, accessible name and description, visible Cancel before Action, safe Cancel initial focus for keyboard, pointer, touch, and programmatic opening, Tab containment, and that backdrop interaction cannot close the layer.
- Verify Cancel and Action close reasons, prevented asynchronous Action behavior, pending and error recovery, controlled state, intentionally permitted Escape behavior, nested top-layer ownership, scroll lock, background isolation, exit presence, and focus restoration.
- Verify long-label footer reflow, optional Body overflow, zoom, narrow and short viewports, reduced motion, forced colors, light and dark appearance on portalled Content, and required CSS.

## Related guidance

- `@flowstack-ui/atom/agents/alert-dialog`
- `dialog`
- `button`
- `popover`
- `toast`
- `appearance`
