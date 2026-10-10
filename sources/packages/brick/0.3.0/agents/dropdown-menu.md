# DropdownMenu agent guide

## Purpose

Present a finished compact command or settings menu from a visible button while Atom owns menu semantics, real item focus, keyboard navigation, selection, dismissal, portals, and collision-aware placement.

## Use when

- A visible named button should reveal a short list of commands, independent settings, exclusive settings, secondary destinations, or nested commands.

## Choose something else when

- Commands belong to a contextual gesture, several persistent application command categories, a form value, or ordinary site navigation. Use ContextMenu, Menubar, Select, or NavigationMenu or NavList.

## Required composition

- Compose DropdownMenu.Root with a named Trigger and Content. For finished command controls use Trigger asChild around Button or IconButton; for an avatar use the native Trigger directly around Avatar without Button padding. Content portals automatically; use Portal only for explicit destination control. Build Content from uniquely valued Item, CheckboxItem, RadioGroup and RadioItem, Group and Label, Separator, and paired Sub, SubTrigger, and SubContent parts; use Leading, ItemLabel, Description, Shortcut, and ItemIndicator for finished rows.
- For a genuine secondary destination, compose Item asChild around one Brick Link with variant=plain and preserve its href; command rows use onSelect. Reproduce any local Appearance scope on portalled Content and SubContent.
- Arrow is optional popup artwork, distinct from TriggerIndicator and the submenu chevron. Its default base/height are approximately 16.97/8.49px, matching a rotated 12px square. Numeric width and height customize the artwork. Place it inside Content and allow sufficient positioning.gutter (for example 12px). Keep ordinary triggers intrinsic; use Stack align=start rather than accidentally stretching buttons.

## Rules

- **MUST:** Use useDropdownMenu with DropdownMenu.RootProvider and pass the unchanged controller; Root and RootProvider are alternatives, not nested behavior owners. RootProvider preserves Brick presentation. Use Context for public state, explicit TriggerIndicator for decorative artwork, and Atom-owned positioning, presence, controlled highlight and cancellable selection rather than custom event or focus logic.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use DropdownMenu for commands or settings opened by a visible button; use Select for a form value, ContextMenu for contextual invocation, Menubar for persistent command categories, and navigation owners for route lists.
- **MUST:** Give Trigger a complete accessible name. Use asChild around finished Button or IconButton for command styling, or directly contain Avatar for an unpadded native button. Never nest a button in the default native Trigger. Preserve Atom's popup, expanded, controls, disabled and input-aware opening semantics.
- **MUST:** Use uniquely valued Item, CheckboxItem, and RadioItem for their matching roles, provide textValue when rendered children are not searchable text, and preserve real focus, typeahead, and disabled-item navigation without activation.
- **MUST:** Choose closeOnSelect by job: commands normally close while checkbox and radio settings normally remain open; do not close the tree with competing handlers or document listeners.
- **MUST:** Keep SubTrigger and SubContent inside one Sub and preserve direction-aware cascade keys, hover intent, whole-tree dismissal, and collision-resolved placement instead of inventing responsive drill-in behavior.
- **MUST:** Compose a genuine destination Item around one Brick Link so href and menuitem semantics share the same interactive owner; do not attach routing to a command-only div.
- **MUST:** Use Leading, ItemLabel, Description, Shortcut, ItemIndicator, and tone=danger for their documented jobs instead of rebuilding columns, selection glyphs, icon sizing, or destructive emphasis.
- **SHOULD:** Let Content use its collision-aware available height and native internal scrolling; verify three densities, long labels, zoom, narrow viewports, LTR and RTL, and reachable nested commands without semantic transformation.
- **MUST:** When Portal leaves a local Appearance scope, reproduce that scope on Content and SubContent or target a portal container inside it.
- **MUST:** Load styles.css or core.css plus dropdown-menu.css and every composed child component stylesheet.
- **MUST:** Choose size sm/md/lg and subtle/solid/plain popup variants before custom CSS. Root/popup tone selects highlighted colors; explicit item tone also selects resting foreground. Omitted item tone inherits and explicit neutral resets. Plain never removes keyboard-visible focus.
- **MUST:** Configure inset, itemInset and leadingSpace on Content or SubContent. itemInset=none removes inline row padding only; leadingSpace=reserve deliberately aligns artwork. SubContent inherits the nearest recipe across portals; a bare string Item needs no mandatory label wrapper.
- **MUST:** Use SubTrigger indicator: omission supplies the chevron, null suppresses it, and a ReactNode replaces it. Keep custom artwork decorative; never duplicate defaults or nest interactive controls inside Item. Item layout=stack changes presentation, not keyboard semantics.
- **MUST:** Apply documented local visual variables to Content, SubContent or the actual Item/part, not a DOM-less Root. Recipe props cross portals through React context; CSS variables follow DOM ancestry. Verify every size and direct part override, focus and state-paired supporting text.
- **MUST:** Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.

## Common mistakes

- **Avoid:** Using an unlabeled icon trigger, Popover for menu commands, DropdownMenu for form selection or primary navigation, or custom key and document dismissal handlers. **Instead:** Use a named Button or IconButton, choose the semantic owner, and rely on DropdownMenu and shared Menu behavior.
- **Avoid:** Nesting a Button inside Item, rebuilding row columns, or treating Shortcut text as registered keyboard behavior. **Instead:** Keep one interactive owner, compose the public row anatomy, and register application shortcuts outside DropdownMenu.

## Validation checklist

- Verify Trigger name and semantics, click, tap, Enter, Space, ArrowDown, and ArrowUp opening, initial real item focus, Home/End, typeahead, controlled and disabled state, Tab exit, Escape, outside dismissal, and focus return.
- Verify command, destination-link, checkbox mixed, radio, group, indicator, separator, and submenu behavior; unique values and textValue; close policies; modal and parent-modal ownership; and LTR and RTL cascade keys.
- Verify three densities, Leading geometry, danger meaning, constrained scrolling, collision placement, zoom, narrow viewports, reduced motion, forced colors, light and dark portalled appearance, and complete CSS.
- Verify compact 24/32/44px minimum rows and 12/14/16px regular text, popup and item inset, empty/reserved leading columns, root palette versus explicit item tone, plain keyboard focus, portal overrides, custom/null indicators and solid supporting-text contrast.

## Related guidance

- `@flowstack-ui/atom/agents/dropdown-menu`
- `@flowstack-ui/atom/agents/menu`
- `context-menu`
- `menubar`
- `select`
- `navigation-menu`
- `nav-list`
- `button`
- `icon-button`
- `link`
- `appearance`
