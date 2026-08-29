# Tooltip agent guide

## Purpose

Provide a short supplemental text description on hover, focus-visible interaction, and stationary touch long press with an owned aria-describedby relationship.

## Use when

- A control, especially an unfamiliar icon, needs a brief non-interactive hint in addition to its complete accessible name.

## Choose something else when

- The information is important enough to remain visible, is a richer passive preview, or contains links, buttons, inputs, or other interaction. Use visible text, HoverCard, or Popover.

## Required composition

- Compose Root with Trigger and Content; add Provider when descendant tooltips should share timing, Portal only when Content must leave its DOM location, and Arrow only when the styled hint needs a pointer. Plain and rich Content may differ in text structure, but both remain non-interactive tooltips.

## Rules

- **MUST:** Give Trigger a complete accessible name independently; Tooltip supplies only a supplemental aria-describedby description while open.
- **MUST:** Keep both plain and rich Content free of links, buttons, inputs, and other focusable controls; use Popover for interaction.
- **SHOULD:** Keep plain Content to a short hint and use rich only for concise non-interactive title and supporting text; render important information visibly.
- **MUST:** Preserve hover, focus-visible, Escape, shared delay, and stationary 700 ms touch long-press behavior, including movement, scroll, second-touch, cancellation, disabled, unmount, compatibility-event, and finite dismissal handling.
- **MUST:** When Trigger uses asChild or render, preserve its native semantics, Atom handlers and refs, and the generated description relationship.

## Common mistakes

- **Avoid:** Using Tooltip as the control's accessible name, placing interactive content in the rich variant, hiding essential instructions only on hover, or implementing a second touch long-press timer. **Instead:** Name Trigger independently, keep Content supplemental and non-interactive, show essential information visibly, and rely on Tooltip's owned input contract.

## Validation checklist

- Verify Trigger's independent name, role=tooltip Content, aria-describedby only while open, controlled and disabled state, provider and local delays, pointer hover, focus-visible opening, pointer transfer into Content, focus leave, top-layer Escape, and exit presence.
- Verify stationary touch long press, early release, movement tolerance, scrolling, outside touch, second touch, touchcancel, compatibility events, disabled changes, unmount cleanup, plain and rich release-time dismissal, portals, direction, collision placement, and optional Arrow geometry.

## Related guidance

- `hover-card`
- `popover`
