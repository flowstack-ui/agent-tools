# Toast agent guide

## Purpose

Present queued finished transient updates while Atom owns store identity, timers, announcements, focus, hotkey access, portal, dismissal, swipe, and lifecycle.

## Use when

- A short non-blocking outcome or process update is useful, can be safely ignored, and remains recoverable or visible elsewhere without interrupting the current task.

## Choose something else when

- Feedback belongs beside a field, is essential or durable, represents numeric progress, or requires a response before continuing. Use Field or Form feedback, persistent application content, Progress, or AlertDialog.

## Required composition

- Install one Toaster near the application root. Create imperative updates with toast helpers, or use the public Toast.Root, Icon, Content, Title, Description, Actions, Action, Close, and Viewport parts for advanced rendering while preserving one Atom Provider and Viewport announcement path.
- Supply concise meaningful title or description, choose type by announcement priority, localize Toaster label and closeLabel, and include an optional action only when it is safe to ignore and may dismiss immediately.

## Rules

- **MUST:** Never make Toast the sole home of essential, response-required, validation, or durable information because it is transient and does not move focus when it appears.
- **MUST:** Keep Viewport's persistent polite and assertive announcers as the only live path; do not add role=status, role=alert, or aria-live to visible Root cards.
- **MUST:** Use warning and error assertion only for genuinely important feedback, keep Title and Description concise, include meaning beyond color and glyph, and update content only when a new announcement is intended.
- **MUST:** Preserve normalized duration, hover/focus/page-focus pause, localized hotkey access, focused Escape dismissal, and focus restoration; never steal focus merely because a toast appeared.
- **MUST:** Use Brick's single Action only for a callback that may dismiss immediately; Brick has no Cancel part, and async interaction that must stay open belongs in persistent application UI.
- **MUST:** Keep Close, Escape, timeout, or another obvious path available; directional swipe is optional and never the sole dismissal mechanism.
- **MUST:** Choose logical position, responsive/compact/full width, and separated/overlap stacking deliberately; keep safe areas, fixed chrome, software keyboards, narrow screens, zoom, RTL, and viewport offsets under styled or application ownership.
- **MUST:** Load styles.css or core.css plus toast.css.

## Common mistakes

- **Avoid:** Using Toast for validation or confirmation, adding a second live region, choosing assertive type by color preference, or expecting Action to remain open during async work. **Instead:** Use inline or blocking UI for those jobs, preserve one announcement path, choose priority semantically, and move persistent async interaction outside Toast.
- **Avoid:** Making swipe the only dismissal, mounting multiple Toasters casually, or allowing fixed application chrome to cover the viewport. **Instead:** Provide an obvious non-swipe dismissal, keep one application-level viewport, and set documented logical offsets for measured chrome collisions.

## Validation checklist

- Verify imperative create/update/dismiss and promise flows, declarative Root, stable IDs, type priority, duration and maxVisible normalization, queue and stacking, close inheritance, entry/exit lifecycle, forceMount, auto-close, pause policies, and meaningful updates announced once.
- Verify localized Viewport label/hotkey, polite/assertive announcers, no visible-card live region, focus-within pause, Escape and restoration, Action and Close callbacks/dismissal, optional swipe threshold/direction/cancel, non-swipe dismissal, custom renderToast, portal container, and logical positions.
- Verify six types, all width/stacking/position recipes, title-only and description-only geometry, long localized content, safe-area and application offsets, 320px, zoom, RTL, light/dark appearance, forced colors, and reduced motion.

## Related guidance

- `@flowstack-ui/atom/agents/toast`
- `alert-dialog`
- `field`
- `form`
- `progress`
