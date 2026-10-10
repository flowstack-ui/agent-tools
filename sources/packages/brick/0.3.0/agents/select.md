# Select agent guide

## Purpose

Present one compact finished choice from a predefined list while Atom owns selection, trigger and listbox semantics, keyboard behavior, positioning, dismissal, validation, and native select form behavior.

## Use when

- A person chooses exactly one value from a predefined list whose options should stay collapsed until opened.

## Choose something else when

- A short set should remain visible, several values may be selected, editable filtering or free-form entry is required, or rows are commands or destinations. Use RadioGroup, MultiSelect, Combobox, DropdownMenu, or Link.

## Required composition

- Inside Brick Dialog, keep Content's default portal enabled so the popup escapes the scrolling and clipping regions. Atom preserves modal focus and dismissal ownership across the portal. Do not set disablePortal merely because the control is nested in a modal; test popup edge hit targets, selection, Escape and focus return.
- Compose Select.Root with a named Select.Trigger containing Select.Value and optional Select.Icon, then exactly one Select.Content or Select.Listbox. Place stable uniquely valued Items with ItemText inside optional Viewport and Group with Label; add indicators, separators, scroll buttons, Portal, and a direct popup Arrow only when required. Brick For may own repeated Items while Select preserves its opaque render callback.
- Use the same seven-size responsive control size as adjacent controls. Popup items inherit that density so the open and closed Select stay aligned. Keep locale loading, routing, persistence, analytics, and every other effect in onValueChange at the application boundary.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use explicit items records for opaque or async options and SSR labels/forms. Pass the original controller to RootProvider; State is render access. ClearTrigger is a sibling and unstyled asChild delegates only presentation. Use Atom mount/exit and outside callbacks. All seven responsive sizes share the control recipe; popup rows are compact, not full control-height.
- **MUST:** Use outline for a transparent rest/hover control and surface for a neutral raised fill with the same border and geometry, without a shadow or extra Surface wrapper. Soft remains subdued. Popup backgrounds are independent; preserve explicit disabled, read-only, invalid and forced-colors states.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use subtle for neutral muted fill with transparent border; soft remains distinct. ClearTrigger belongs beside Trigger with a localized name, never nested in a button. Trigger unstyled delegates presentation only. Configure closeOnSelect and loopFocus explicitly when changing default policies.
- **MUST:** Use Select only for one predefined value and keep controlled value and open state aligned with their matching callbacks.
- **MUST:** Give Trigger a visible Field label or equivalent accessible name; placeholder and selected value are not the control name, and Trigger must retain combobox, expanded, controls, active-descendant, required, read-only, invalid, and disabled relationships.
- **MUST:** Give every Item a stable unique value and ItemText or label, keep interactive descendants out, and preserve that text for closed display, option naming, typeahead, and the hidden native select.
- **MUST:** Preserve Trigger-owned opening, Arrow/Home/End, typeahead, Enter/Space selection, Tab, Escape, disabled skipping, focus restoration, native select options and submission, required validity, external form association, and reset.
- **MUST:** Render Content or Listbox once, keep Arrow directly inside it, and keep scroll buttons outside the registered Viewport so Atom owns positioning, collision, dismissal, and overflow state.
- **MUST:** Keep translation loading, locale detection, persistence, navigation, analytics, and other effects in the application callback rather than inside Select.
- **MUST:** Load styles.css or core.css plus select.css and Field CSS when composed.
- **MUST:** Select.Arrow retains its span ref and host. Its default diamond uses --brick-overlay-arrow-size (12px); --brick-select-arrow-size is the local override. Keep Arrow directly in Content, outside Viewport. Viewport owns scrolling so Content can leave the arrow visible. positioning.gutter measures empty space to the tip; do not add compensation. The trigger Icon is not the popup Arrow.
- **MUST:** Use shared responsive sizes and variants: outline, surface, soft, subtle, ghost, plain, underline. Defaults are lg and outline. Underline has zero start inset and bottom-only focus; responsive variants exclude explicit shape/radius so corners can recover at later breakpoints. Invalid and forced-color focus must remain visible.

## Common mistakes

- **Avoid:** Using placeholder or a selected code as the only name, omitting ItemText, rendering both popup owners, or rebuilding options as clickable rows. **Instead:** Name Trigger separately and preserve one Atom-owned popup with registered stable Items and ItemText.
- **Avoid:** Using Select for multiple or editable choice, commands, navigation rows, or hidden application state and effects. **Instead:** Choose MultiSelect, Combobox, DropdownMenu, or Link and connect legitimate value effects through onValueChange.

## Validation checklist

- Verify Trigger naming and Field relationships, controlled and uncontrolled value and open state, placeholder and closed selected label, pointer/touch and keyboard opening, active descendant, Home/End, typeahead, selection, disabled Items, Tab, Escape, outside activation, and focus return.
- Verify hidden native options and submission, required inline/native validity, external form, reset, groups and labels, Viewport and scroll buttons, Portal and non-Portal paths, Arrow placement, direction, collision handling, and nested modal ownership.
- Verify all sizes, long localized labels, narrow widths, zoom, RTL, touch targets, light and dark appearance, forced colors, and alignment with adjacent button-like controls.

## Related guidance

- `@flowstack-ui/atom/agents/select`
- `@flowstack-ui/atom/agents/listbox`
- `field`
- `form`
- `radio-group`
- `combobox`
- `multi-select`
- `dropdown-menu`
- `link`
- `for`
