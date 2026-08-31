# Badge agent guide

## Purpose

Wrap a short contextual label, count, or status as normal inline semantic content without adding interaction or automatic announcement behavior.

## Use when

- A compact count or status word supplements nearby content and can be understood from its visible owning context.

## Choose something else when

- The element performs an action, communicates task completion, represents identity, or a changing update must be announced automatically. Use Button, Progress, Avatar, or a deliberately chosen live-region pattern.

## Required composition

- Place concise Badge text beside the content it qualifies. Include a visual count attached to a control in that control's accessible naming or owning context, and add live-region semantics outside Badge only when the update's urgency and frequency justify announcement.

## Rules

- **MUST:** Keep Badge noninteractive; use a real Button or Link when the content activates an action or navigation.
- **MUST:** Provide enough nearby text or owning-control context for a count or status to be understood without relying on color, shape, or position alone.
- **MUST:** When Badge is visually attached to a control, ensure the meaningful count or status is included in that control's accessible name or description because a sibling Badge is not incorporated automatically.
- **MUST:** Do not assume Badge announces changes; add an appropriate live region deliberately only when an update needs announcement and avoid noisy duplicate paths.
- **MUST:** Do not rely on aria-label to give the default generic span meaning; use understandable text and surrounding semantics.

## Common mistakes

- **Avoid:** Making Badge clickable or using a color-only dot as an essential status. **Instead:** Use an actual interactive primitive for actions and include concise textual status in an understandable context.
- **Avoid:** Assuming a notification count beside an icon button is part of the button name or will announce when it changes. **Instead:** Author the control name or description and live behavior explicitly.

## Validation checklist

- Verify concise count and text-status variants are understandable in reading order and without color, and that no unintended role, Tab stop, or keyboard behavior exists.
- Inspect controls with attached Badges to confirm their accessible names or descriptions contain the meaningful status independently of visual proximity.
- For dynamic updates, verify the chosen announcement owner, priority, and frequency and confirm Badge does not create a duplicate live path; verify server-safe subpath and composition behavior.

## Related guidance

- `button`
- `progress`
- `avatar`
- `toast`
