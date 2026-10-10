# Menubar agent guide

## Purpose

Present a finished persistent application command strip with coordinated top-level menus while Atom owns menubar semantics, roving focus, adjacent-menu handoff, and shared Menu behavior.

## Use when

- A desktop-like application has several persistent command categories such as File, Edit, and View that must behave as one keyboard menubar.

## Choose something else when

- There is one temporary command menu, ordinary website navigation, a route list, or a toolbar of immediately executable controls. Use DropdownMenu, NavigationMenu or NavList, or Toolbar.
- The application needs responsive mobile replacement or overflow orchestration. Use An application-owned composition using DropdownMenu, Drawer, or another appropriate command surface.

## Required composition

- Give Menubar.Root an accessible name and compose one or more uniquely valued Menubar.Menu scopes, each containing Menubar.Trigger and portalled Menubar.Content. Build Content from the shared command, selection, grouping, separator, static row, and paired submenu anatomy.
- Root owns sm, md, or lg density and horizontal or vertical orientation; Content and SubContent inherit that density. Reproduce any local Appearance scope on each portalled visual root.

## Rules

- **MUST:** Use Link variant=plain tone=inherit inside Item asChild and Icon size=inherit tone=inherit for leading artwork. Use Frame measure for mixed icon command layouts, not custom row CSS. Ordinary pointer highlight clears on leave, while top-level open state remains meaningful; triggerVariant=plain removes decorative strip fill. Keep strip and popup recipes independent and capability examples focused.
- **MUST:** Use useMenubar with Menubar.RootProvider and pass the unchanged controller; Root and RootProvider are alternatives, not nested behavior owners. RootProvider preserves Brick presentation. Use Context for public state, explicit TriggerIndicator for decorative artwork, and Atom-owned positioning, presence, controlled highlight and cancellable selection rather than custom event or focus logic.
- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use Menubar only for persistent application command categories, not website navigation, page tabs, route-current state, or a responsive application shell.
- **MUST:** Give the role=menubar Root an accessible name and keep every top-level Trigger as its role=menuitem child with one Atom-owned roving tab stop.
- **MUST:** Give every top-level Menu a unique value and keep its Trigger and Content within that Menu scope so controlled value and adjacent-menu handoff remain deterministic.
- **MUST:** Match orientation to the visible Root arrangement and preserve direction-aware Arrow movement, Home/End, first and last item opening, adjacent handoff, and nested submenu keys in LTR and RTL.
- **MUST:** Preserve uniquely valued item roles, real focus, typeahead, disabled navigation, checkbox and radio state, closeOnSelect, paired submenus, whole-root Tab exit, Escape restoration, and parent-modal ownership.
- **MUST:** Use Leading, ItemLabel, Description, Shortcut, ItemIndicator, and tone=danger for their documented jobs; shortcuts are visual hints and Menubar does not register global commands.
- **MUST:** Do not automatically wrap, collapse, or change Menubar semantics at a breakpoint; applications own an explicit scrolling region or a separately selected mobile command surface.
- **MUST:** When Content leaves a local Appearance scope through Portal, reproduce that scope on the portalled visual root or target a container inside it.
- **MUST:** Load styles.css or core.css plus menubar.css and every composed child component stylesheet.
- **MUST:** Choose size sm/md/lg and subtle/solid/plain popup variants before custom CSS. Root/popup tone selects highlighted colors; explicit item tone also selects resting foreground. Omitted item tone inherits and explicit neutral resets. Plain never removes keyboard-visible focus.
- **MUST:** Configure inset, itemInset and leadingSpace on Content or SubContent. itemInset=none removes inline row padding only; leadingSpace=reserve deliberately aligns artwork. SubContent inherits the nearest recipe across portals; a bare string Item needs no mandatory label wrapper.
- **MUST:** Use SubTrigger indicator: omission supplies the chevron, null suppresses it, and a ReactNode replaces it. Keep custom artwork decorative; never duplicate defaults or nest interactive controls inside Item. Item layout=stack changes presentation, not keyboard semantics.
- **MUST:** Apply documented local visual variables to Content, SubContent or the actual Item/part, not a DOM-less Root. Recipe props cross portals through React context; CSS variables follow DOM ancestry. Verify every size and direct part override, focus and state-paired supporting text.
- **MUST:** Keep strip size and menuSize independent when needed. barVariant controls plain/surface rail paint; triggerVariant controls subtle/plain trigger states. Popup tone does not recolor the strip. Preserve menuitem semantics rather than wrapping Trigger in Toggle.
- **MUST:** Overlay arrows share a 12px square-equivalent seed (--brick-overlay-arrow-size), exposed-edge artwork and owner surface/border paint. Prefer the shipped Arrow; do not add directional filters or translations. SVG Arrow width/height remain supported; positioning gutter measures the empty gap to the tip. Explicit positioning.offset remains raw. ToggleTip inherits Popover; Select/MultiSelect retain span hosts. NavigationMenu Indicator remains separately positioned.

## Common mistakes

- **Avoid:** Using Menubar as styled website navigation, omitting Root's name, duplicating top-level values, or implementing each heading as an independent dropdown. **Instead:** Use Menubar only for application commands and preserve its named, uniquely valued, orientation-aware top-level ownership.
- **Avoid:** Hiding or collapsing the command strip at a Brick breakpoint or treating Shortcut text as registered keyboard behavior. **Instead:** Let the application select a responsive alternative and keep shortcut execution in application code.

## Validation checklist

- Verify Root naming and orientation, unique Menu values, one top-level tab stop, Home/End, horizontal and vertical Arrow movement, LTR and RTL, pointer and touch opening, keyboard first and last opening, hover switching, controlled active value, disabled triggers, and adjacent-menu focus ownership.
- Verify shared item focus and typeahead, checkbox mixed and radio state, submenus, selection close policy, whole-root Tab exit, top-layer Escape, focus return, portals, parent-modal ownership, and asChild or render composition.
- Verify three densities, persistent Root and open-trigger paint, constrained popup scrolling, danger meaning, narrow overflow policy, zoom, long localization, reduced motion, forced colors, portalled appearance, and complete CSS.
- Verify compact 24/32/44px minimum rows and 12/14/16px regular text, popup and item inset, empty/reserved leading columns, root palette versus explicit item tone, plain keyboard focus, portal overrides, custom/null indicators and solid supporting-text contrast.

## Related guidance

- `@flowstack-ui/atom/agents/menubar`
- `@flowstack-ui/atom/agents/menu`
- `dropdown-menu`
- `context-menu`
- `navigation-menu`
- `nav-list`
- `toolbar`
- `drawer`
- `appearance`
