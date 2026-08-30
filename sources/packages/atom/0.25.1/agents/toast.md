# Toast agent guide

## Purpose

Queue, display, announce, pause, act on, and dismiss short non-blocking updates through declarative or imperative toast state and a persistent accessible notification viewport.

## Use when

- A short status update is useful but must not interrupt the current task or require a response before work continues.

## Choose something else when

- Feedback belongs beside a field, is essential or durable, or the user must respond before continuing. Use inline feedback, persistent application content, or AlertDialog.

## Required composition

- Place one Viewport under Provider for queued and announced toasts. Create imperative toasts with toast helpers or compose declarative Root with concise Title and optional Description; add Action, Cancel, or Close only when the toast needs those dismissing controls.

## Rules

- **MUST:** Do not place essential, sole, or response-required information only in Toast because it is transient and never moves focus on appearance.
- **MUST:** Keep Viewport's persistent polite and assertive announcers as the sole live path; do not add role=status, role=alert, or aria-live to visible store-rendered Root cards.
- **MUST:** Choose toast type by announcement priority, keep Title and Description concise, and update content only when a meaningful new announcement is intended.
- **MUST:** Preserve finite duration normalization, hover/focus/page-focus pause policies, labelled hotkey access, focused Escape dismissal, and focus restoration; never move focus merely because a toast appeared.
- **MUST:** Use Action and Cancel only when running their callbacks should then dismiss; move async interactions that must remain open into separate persistent UI.
- **MUST:** Keep Close, Escape, timeout, or another obvious dismissal path available; directional swipe is optional enhancement and never the only mechanism.
- **SHOULD:** Keep safe-area, persistent chrome, software-keyboard, and viewport positioning decisions in the styled or application layer while consuming Atom's logical position and state.

## Common mistakes

- **Avoid:** Using Toast for validation or confirmation, adding a second live region to visible cards, making swipe the only dismissal, or expecting an action to remain open during async work. **Instead:** Use inline or blocking UI for those jobs, preserve the single announcer path and equivalent dismissal, and move persistent async interaction out of the toast.

## Validation checklist

- Verify imperative create/update/dismiss and declarative Root, stable IDs, type role priority, duration and maxVisible normalization, queue order and stack anchoring, close inheritance, entry/exit lifecycle, forceMount, auto-close, hover/focus/page pause, and meaningful update announcements exactly once.
- Verify labelled Viewport and hotkey, polite/assertive persistent announcers, no visible-card live region, focus-within pause, focused and viewport Escape, focus restoration, Action/Cancel/Close callbacks and dismissal, pointer swipe threshold/direction/cancel, non-swipe dismissal, custom renderToast, asChild viewport insertion, portal container, and logical positions.

## Related guidance

- `alert-dialog`
- `field`
