# MultiSelect agent guide

## Purpose

Present several selected predefined values in a compact finished control while Atom owns array state, popup listbox focus, persistent toggling, positioning, validation, and native multiple-select submission.

## Use when

- A person chooses zero or more values from a predefined moderate collection that should remain collapsed until requested.

## Choose something else when

- A short choice set should stay visible, only one value is allowed, or editable filtering, arbitrary tags, creation, range selection, or virtualization is required. Use CheckboxGroup, Select, Combobox, or a documented Brick gap or higher-layer specialized control.

## Required composition

- Inside Brick Dialog, keep Content's default portal enabled so the popup escapes the scrolling and clipping regions. Atom preserves modal focus and dismissal ownership across the portal. Do not set disablePortal merely because the control is nested in a modal; test popup edge hit targets, selection, Escape and focus return.
- Compose MultiSelect.Root with a named button Trigger containing Value and optional Icon, then exactly one Content or Listbox with stable uniquely valued Items and ItemText. Add Portal, Viewport, groups and labels, separators, scroll buttons, indicators, and a direct Arrow only as required. Brick For may own repeated Items while MultiSelect preserves its opaque render callback.
- Use all seven responsive control sizes consistently with adjacent button-like controls. Keep selected values, persistence, remote data, and application effects at the application boundary.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use explicit items records for opaque or async options and SSR labels/forms. Pass the original controller to RootProvider; State is render access. ClearTrigger is a sibling and unstyled asChild delegates only presentation. Use Atom mount/exit and outside callbacks. All seven responsive sizes share the control recipe; popup rows are compact, not full control-height.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use subtle for neutral muted fill with transparent border; soft remains distinct. ClearTrigger belongs beside Trigger with a localized name, never nested in a button. Trigger unstyled delegates presentation only. Configure closeOnSelect and loopFocus explicitly when changing default policies.
- **MUST:** Use MultiSelect only for several predefined values; do not add editable filtering, arbitrary tags, commands, destinations, range selection, or virtualization.
- **MUST:** Keep Trigger a separately named button rather than role=combobox and keep Content or Listbox as the focusable aria-multiselectable owner of required and read-only semantics.
- **MUST:** Use deduplicated arrays for value and defaultValue, route controlled changes through onValueChange, and keep the popup open by default while Items toggle.
- **MUST:** Give every Item a stable unique value and ItemText or label so summaries, option names, typeahead, and native options remain complete while the popup is closed.
- **MUST:** Preserve popup focus, Arrow/Home/End, typeahead, Space/Enter toggling with the configured closeOnSelect policy, Escape focus restoration, Tab dismissal, disabled skipping, native repeated-value submission, required validity, external form, and reset.
- **MUST:** Keep Trigger, summaries, and collision-aware popup contained under long localization, narrow widths, zoom, and RTL; do not place removal buttons inside the v1 button Trigger.
- **MUST:** Load styles.css or core.css plus multi-select.css and Field CSS when composed.
- **MUST:** MultiSelect.Arrow retains its span ref and host. Its default diamond uses --brick-overlay-arrow-size (12px); --brick-multi-select-arrow-size is the local override. Keep Arrow directly in Content, outside Viewport. Viewport owns scrolling so Content can leave the arrow visible. positioning.gutter measures empty space to the tip; do not add compensation. The trigger Icon is not the popup Arrow.

## Common mistakes

- **Avoid:** Giving Trigger combobox semantics, using selected summary as its name, bypassing closeOnSelect with manual closing, or deriving native options only from an open popup. **Instead:** Preserve the named button/listbox model, configured closing, static or explicit Item records, and complete native option contract.
- **Avoid:** Adding text entry, arbitrary tag creation, interactive descendants, or application persistence inside the component. **Instead:** Keep predefined noninteractive Items and choose an approved editable higher-layer pattern or record the missing Brick capability.

## Validation checklist

- Verify Trigger and listbox names, controlled and uncontrolled arrays and open state, deduplication, zero/one/many summaries and renderValue, popup focus, Arrow/Home/End, typeahead, Space/Enter closing policy, disabled Items, Escape, Tab, outside activation, and focus restoration.
- Verify read-only on the listbox, Field relationships, hidden multiple-select options and repeated submission, required inline/native validation, external form, reset, groups, indicators, Viewport, scroll buttons, Portal, direction, collision placement, and nested modal behavior.
- Verify all sizes, long summaries and option labels, narrow widths, zoom, RTL, touch targets, light and dark appearance, forced colors, and button-like control alignment.

## Related guidance

- `@flowstack-ui/atom/agents/multi-select`
- `@flowstack-ui/atom/agents/listbox`
- `field`
- `form`
- `select`
- `combobox`
- `checkbox-group`
- `for`
