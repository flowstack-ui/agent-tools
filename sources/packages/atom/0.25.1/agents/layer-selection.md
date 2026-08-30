# Atom layer selection

## Purpose

Decide whether reusable headless behavior belongs in Atom, an existing native element, Brick, a higher composition layer, or the application before composing a primitive.

## Decision order

1. Start from the semantic and interaction job, not the desired appearance.
2. Use an existing native element when it already provides the complete reusable behavior contract.
3. Use an Atom primitive when reusable semantics, state, focus, keyboard, pointer, touch, portal, positioning, or compound composition are required.
4. Use Brick instead when the consumer needs a finished visual component; ordinary Brick applications should not import Atom directly.
5. Keep product workflows, page layout, content, routing, persistence, and analytics in higher layers.

## Selection map

- **native action:** use Button. Choose Link for ordinary navigation and Pressable only for custom interactive surfaces.
- **application header structure:** use AppBar. Compose Toolbar only when grouped controls require toolbar keyboard behavior.
- **site or application navigation:** use NavList, NavigationMenu, Breadcrumb, BottomNavigation, Tabs, or Pagination. Select by the navigation relationship, not by visual resemblance.
- **temporary commands or settings:** use DropdownMenu from a visible button, ContextMenu from a contextual gesture, Menubar for persistent application command groups, or Menu as the shared direct/custom foundation. Use Select or Listbox when choosing a form value and keep important contextual actions discoverable elsewhere.
- **supplemental floating disclosure:** use Tooltip for a brief hint or HoverCard for a richer passive preview. Choose Popover when the content is interactive and visible native content when the information is essential.
- **choice or persistent control state:** use CheckboxGroup for independent form choices, RadioGroup for one visible form answer, Switch for an immediately applied on/off setting, Toggle for one pressed command, or ToggleGroup for related pressed commands. Choose by semantics and application timing rather than visual shape.
- **spatial numeric input:** use Slider for a general scalar or range adjusted by feel, or Rating for a short ordered score. Choose NumberInput when exact typed entry matters and Progress when the value is read-only.
- **option selection presentation:** use Listbox for a visible composite list, Select for one collapsed fixed value, MultiSelect for several collapsed fixed values, or Combobox for editable filtering and optional valid free-form entry. Choose RadioGroup or CheckboxGroup when short form choices should remain separate visible controls.
- **specialized text entry:** use NumberInput for exact numeric entry with stepping, OTPField for a short one-time code split across cells, or PasswordToggleField for a revealable reusable secret. Keep ordinary text and digit-like identifiers in Input.
- **local file selection and drop:** use FileUpload. Use a native file input when custom picker, drop, validation feedback, and selected-item behavior are unnecessary; always validate uploads again on the server.
- **copy known text with status:** use Clipboard. Choose Button when asynchronous copy state and authored feedback are unnecessary.
- **short non-blocking update:** use Toast. Use inline content for contextual or durable feedback and AlertDialog when a response is required.
- **gesture-enhanced row actions:** use SwipeableItem. Keep an obvious tap or click path and choose Menu when many actions or discovery make swipe unsuitable.
- **one inline disclosure region:** use Collapsible. Choose Accordion for several coordinated sections or Dialog for a modal task.
- **row and column data:** use Table for read-oriented comparison, DataGrid for flat two-dimensional keyboard navigation or row selection, or TreeGrid for hierarchical interactive rows. Keep sorting, editing, filtering, resizing, and virtualization application-composed and preserve full logical indexes when windowing.
- **hierarchical item navigation:** use Tree for one primary item column or TreeGrid for several navigable columns. Choose Accordion when branches contain general disclosure content rather than selectable items.
- **dynamic article stream:** use Feed. Choose List for a static set and add virtualization only when scale justifies its focus and accessibility cost.
- **literal query highlighting in plain text:** use Highlight. Keep result navigation and rich-content traversal in the application and visual treatment in Brick.
- **stable media geometry:** use AspectRatio. Use Image when loading fallback is also required and keep all media semantics on the child.
- **compact identity or contextual status:** use Avatar for a named entity or Badge for a short contextual count or status. Keep essential identity visible and use Progress for ongoing completion rather than status text.
- **form control labeling:** use Label for one standalone native control or Field.Label for coordinated control, description, error, and state wiring. Use Fieldset for a group of controls.
- **ongoing work status:** use Progress for determinate or indeterminate completion. Choose the native meter element for a stable measurement, Slider for user adjustment, or Toast for a short nonblocking update.
- **assistive-only text:** use VisuallyHidden. Prefer visible text when it benefits everyone and use aria-hidden rather than VisuallyHidden for decorative content.
- **direction-aware Atom subtree:** use Direction together with the matching native dir attribute. Provider mirrors Atom behavior but never replaces browser text-direction semantics; prefer a component's local dir prop only for an intentional nested override.
- **ordinary blocking task, form, or information surface:** use Dialog. Choose AlertDialog for an urgent consequential choice, Drawer for a side sheet, or Popover for a compact attached panel.
- **custom modal-family primitive foundation:** use Modal. Application work should prefer the purpose-built modal-family components.
- **scrollable viewport with owned scrollbar behavior:** use ScrollArea. Keep ordinary document scrolling native.
- **resilient media loading:** use Image. Use a native img when loading state and fallback composition are unnecessary.
- **grouped disclosure sections:** use Accordion. Choose Collapsible for one independent disclosure and Tabs for one shared switching panel.
- **static ordered or unordered content:** use List. Choose NavList or an interactive collection primitive when items navigate, select, or activate.

## Rules

- **MUST:** Keep Atom guidance and compositions headless; do not add visual recipes, color, theme, product copy, or application layout policy.
- **MUST:** Preserve native semantics and behavior unless Atom explicitly owns the added reusable contract.
- **MUST:** Do not rebuild focus, keyboard, pointer, touch, portal, positioning, or controlled-state behavior already owned by an Atom primitive.
- **SHOULD:** When building with Brick, consume Brick public components and let Brick consume Atom rather than importing both layers directly.

## Native fallback

1. Search Atom's manifest, public exports, and related component guides for the required behavior before using a native fallback.
2. Use the narrowest semantic native element only when no Atom primitive owns the behavior and no reusable state or interaction contract is being recreated.
3. Record the missing primitive or intentional native choice so repeated gaps can be evaluated by Atom maintainers.

## Validation checklist

- Name the selected semantic and interaction job and its owning layer.
- Confirm no visual or application policy entered the Atom composition.
- Confirm the rendered elements, accessible names, state, focus, keyboard, pointer, touch, and RTL behavior that apply.
- Record any native fallback and the Atom capability searched first.

## Related guidance

- `behavior-composition`
- `button`
- `link`
- `pressable`
- `app-bar`
- `navigation-menu`
- `menu`
- `dropdown-menu`
- `context-menu`
- `menubar`
- `tooltip`
- `hover-card`
- `checkbox-group`
- `radio-group`
- `switch`
- `toggle`
- `toggle-group`
- `slider`
- `rating`
- `listbox`
- `select`
- `multi-select`
- `combobox`
- `number-input`
- `otp-field`
- `password-toggle-field`
- `file-upload`
- `clipboard`
- `toast`
- `swipeable-item`
- `collapsible`
- `table`
- `data-grid`
- `tree`
- `tree-grid`
- `feed`
- `highlight`
- `aspect-ratio`
- `avatar`
- `badge`
- `label`
- `progress`
- `visually-hidden`
- `direction`
- `modal`
- `dialog`
- `alert-dialog`
- `drawer`
- `popover`
- `accordion`
- `list`
