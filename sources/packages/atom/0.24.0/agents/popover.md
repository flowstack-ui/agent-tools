# Popover agent guide

## Purpose

Present a small interactive panel anchored to a trigger or explicit anchor with positioning, dismissal, focus, portal, and optional modal behavior.

## Use when

- A compact set of interactive controls or supporting content belongs near its trigger and needs collision-aware positioning and managed dismissal.

## Choose something else when

- The content is non-interactive help, a passive preview, or a larger blocking task. Use Tooltip, HoverCard, or Dialog.

## Required composition

- Compose Root around Content; add Trigger for local activation or omit it for controlled and triggerless workflows, add Anchor only when positioning must use another reference, and use Portal only when Content must leave its DOM location. Inside Content, use Title or native labeling for the accessible name, add Description and Close only when needed, and add Arrow only when the styled layer needs a pointer; when present, Arrow must be a direct Content child.

## Rules

- **MUST:** Give Content an accessible name with one Title or native aria-label or aria-labelledby; use Description or native aria-describedby only when descriptive text is present.
- **MUST:** Keep the default non-modal behavior for compact attached work; set modal only when the panel must trap focus, isolate the background, and lock document scrolling.
- **MUST:** Use onInteractOutside and preventDefault to veto dismissal; do not replace Atom's completed-interaction, focus-out, Escape, and nested controlled-layer handling.
- **MUST:** Preserve hover opening without focus movement, touch-safe Content focus, keyboard and pointer initial focus, outside-destination focus, and final-focus restoration unless explicit targets are required.
- **SHOULD:** Use Anchor only when positioning must reference a different element than Trigger, and style from resolved data-side and available-size variables rather than assuming the requested placement always wins.
- **MUST:** Keep Arrow as a direct Content child so it remains outside the generated viewport wrapper and can align with the resolved floating placement.

## Common mistakes

- **Avoid:** Using Popover for tooltip-like text, forcing it modal for every menu-sized panel, closing it with ad hoc document listeners, or placing Arrow inside an authored viewport wrapper. **Instead:** Choose by interaction job, keep ordinary popovers non-modal, use the preventable outside-interaction contract, and place Arrow directly under Content.

## Validation checklist

- Verify click and hover trigger modes, delays, controlled state, disabled state, accessible relationships, keyboard, pointer, touch, and hover focus behavior, Escape, outside interaction, focus-out dismissal, Close, and focus destination or restoration.
- Verify explicit Anchor and Trigger positioning, collision shifts and flips, LTR and RTL, available-size variables, direct Arrow geometry, nested portalled controlled layers, modal focus and isolation, and exit presence.

## Related guidance

- `tooltip`
- `hover-card`
- `dialog`
- `direction`
