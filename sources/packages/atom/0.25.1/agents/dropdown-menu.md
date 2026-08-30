# DropdownMenu agent guide

## Purpose

Open a compact command or settings menu from a visible button with menu popup semantics, input-aware initial focus, and the shared Menu contract.

## Use when

- A visible button should reveal a short list of commands, independent settings, exclusive settings, or nested commands.

## Choose something else when

- Commands belong to a contextual gesture, several persistent application menu headings, a form value, or ordinary site navigation. Use ContextMenu, Menubar, Select, or NavList.

## Required composition

- Compose Root with a visibly named Trigger and Content. Add Portal and Arrow only when needed; fill Content with uniquely valued Item parts and the shared Menu Group, Label, CheckboxItem, RadioGroup with RadioItem, Separator, or paired Sub anatomy as the command model requires.

## Rules

- **MUST:** Use a visible, accessible Trigger that describes the menu; preserve its button, popup, expanded, controls, disabled, and custom-element keyboard semantics.
- **MUST:** Preserve input-aware opening: pointer or ordinary activation opens through the owned policy, ArrowDown and activation keys enter at the first item, and ArrowUp enters at the last item.
- **MUST:** Follow Menu's item roles, unique values, real focus, typeahead, disabled navigation, closeOnSelect, submenu, outside-dismissal, modal, portal, and focus-restoration contracts.
- **MUST:** When Trigger or retained Menu parts use asChild or render, merge Atom props, refs, handlers, ARIA, and children instead of replacing them.

## Common mistakes

- **Avoid:** Using an unlabeled icon trigger, putting ordinary navigation or a form select into DropdownMenu, or adding custom key and document dismissal handlers. **Instead:** Give Trigger a complete accessible name, select the correct semantic component, and rely on the shared Menu behavior.

## Validation checklist

- Verify Trigger naming and semantics, click, tap, Enter, Space, ArrowDown, and ArrowUp opening, initial item focus, controlled state, disabled behavior, Tab exit, Escape, outside dismissal, and focus return.
- Verify command, checkbox, radio, group, indicator, separator, and submenu behavior; typeahead; close policies; modal and parent-modal ownership; LTR and RTL; portals; and collision positioning.

## Related guidance

- `menu`
- `context-menu`
- `menubar`
- `select`
- `nav-list`
