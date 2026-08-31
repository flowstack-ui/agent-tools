# @flowstack-ui/atom

[![CI](https://github.com/flowstack-ui/atom/actions/workflows/ci.yml/badge.svg)](https://github.com/flowstack-ui/atom/actions/workflows/ci.yml)

Headless accessible React primitives.

`@flowstack-ui/atom` owns behavior, semantic DOM, ARIA attributes, keyboard
interaction, focus management, controlled/uncontrolled state, compound context,
and portals. It does not ship CSS, visual themes, icons, app templates, routing
integrations, or product-specific data models.

## Installation

Install Atom in an existing React application:

```bash
npm install @flowstack-ui/atom
```

React and React DOM 18 or newer are peer dependencies and must be provided by
the consuming application. Atom installs its approved headless positioning and
color-interaction runtime dependencies automatically.

## Boundary

Atom is the behavior layer for React interfaces. Applications and styled
component packages should compose Atom primitives instead of reimplementing
accessibility, state, and keyboard behavior.

Atom provides:

- React primitives
- ARIA and keyboard behavior
- controlled and uncontrolled state
- focus, stack-aware escape dismissal, presence, and scroll-lock hooks
- compound component context
- portal utilities
- data attributes for styling hooks

Atom does not provide:

- CSS classes or Tailwind utilities
- colors, spacing, typography, density, or elevation
- icons or visual indicators
- router components
- schema validation
- data-grid sorting/filtering frameworks
- application shell templates

## Dependencies

Atom intentionally keeps runtime dependencies narrow.

```json
{
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "dependencies": {
    "@floating-ui/react": "^0.27.19",
    "@zag-js/color-picker": "1.43.3",
    "@zag-js/react": "1.43.3"
  }
}
```

`react-dom` is a peer dependency because Atom includes `Portal`.
`@floating-ui/react` is the approved headless positioning runtime for positioned
primitives such as menus, popovers, tooltips, hover cards, and select listboxes.
The exact Zag packages provide Color Picker's color-space model, accessible
area/channel state machine, form behavior, and React adapter. Atom exposes its
own public compound API and does not re-export Ark UI or Chakra components.

## Public API

The namespace exports are the stable API for new usage.

```tsx
import { Dialog, Select, Tabs } from "@flowstack-ui/atom";

export function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open settings</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content ariaLabel="Settings">
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Description>Update your preferences.</Dialog.Description>
          <Dialog.Close>Close</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

Subpath imports are also supported:

```tsx
import { Dialog } from "@flowstack-ui/atom/dialog";
import { Select } from "@flowstack-ui/atom/select";
import { Switch } from "@flowstack-ui/atom/switch";
```

Hooks and Portal have dedicated subpaths:

```ts
import {
  useControllableState,
  useOutsideInteraction,
} from "@flowstack-ui/atom/hooks";
import { Portal } from "@flowstack-ui/atom/portal";
```

`useOutsideInteraction` provides topmost-layer, completed-activation outside
handling and a custom preventable event that does not cancel the destination's
native click. The older `useClickAway` hook remains available but is deprecated.

Direct part exports are available from component subpaths for advanced
composition and migration. Prefer namespaces for new code. Shared primitives
retain their shared direct names, so direct names do not always repeat the
namespace part name.

```tsx
import { SelectRoot, SelectTrigger } from "@flowstack-ui/atom/select";
```

## Native DOM Props

Atom primitives accept native DOM attributes for the element they render by
default. Application code and styled layers can pass props such as `id`, `style`,
`title`, `data-testid`, and additional `aria-*` attributes directly to the
primitive.

Atom-owned behavior remains authoritative. Required roles, state attributes,
disabled behavior, focus management, and built-in event handlers are applied
after consumer props. Consumer event handlers are composed with Atom handlers,
and handlers that call `event.preventDefault()` can cancel Atom behavior where
that escape hatch is supported.

## Styling

Atom does not ship styles. Use native selectors, `data-slot`, and behavior state
attributes in your own CSS.

```css
[data-slot="button"][data-disabled] {
  opacity: 0.5;
}

[data-slot="dialog-content"][data-state="open"] {
  opacity: 1;
}
```

Avoid depending on internal file paths. Public imports should come from the root
package or a documented subpath.

## Browser support

Atom uses the pinned `baseline 2023 with downstream` browser floor and
qualifies portable behavior in current Chromium, Firefox, and Playwright
WebKit. See the [browser support guide](docs/guides/browser-support.md) for the
boundary between package, application, emulated-mobile, and physical-platform
claims.

## Forms

`Field` owns label, description, error, and shared form-question state. `Input`
and `Textarea` own native text-control behavior and inherit `Field` state when
rendered inside `Field.Root`.

```tsx
import { Field } from "@flowstack-ui/atom/field";
import { Input } from "@flowstack-ui/atom/input";

<Field.Root id="email" required invalid={hasError}>
  <Field.Label>Email</Field.Label>
  <Input.Root name="email" type="email" />
  <Field.Description>Use a work email.</Field.Description>
  <Field.Error>Email is required.</Field.Error>
</Field.Root>;
```

`Form.Root` owns the native form element, submit/reset event flow, validation
presentation policy, and aggregate form status data attributes. It
intentionally does not duplicate `Field`.

```tsx
import { Form } from "@flowstack-ui/atom/form";

<Form.Root validationBehavior="inline" preventDefaultOnSubmit onSubmit={handleSubmit}>
  {/* fields */}
  <button type="submit">Submit</button>
</Form.Root>;
```

`validationBehavior="inline"` preserves native constraints and invalid-submit
blocking while presenting invalid state through Atom's visible controls and
`Field.Error` or `Fieldset.Error`. Use `"native"` to retain the browser's
validation bubble as well. A control can override its Field, Fieldset, or Form.

## Overlays And Positioned Content

Positioned primitives use headless Floating UI behavior. Atom owns state,
triggers, ARIA behavior, keyboard behavior, focus handling, and unstyled
positioning data. Applications own visual treatment, animation, dimensions,
scrims, shadows, and arrows.

```tsx
import { Popover } from "@flowstack-ui/atom/popover";

<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content>
      <Popover.Title>Project settings</Popover.Title>
      <Popover.Description>Change compact options.</Popover.Description>
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>;
```

## Navigation

Use the primitive that matches the interaction model:

- `NavList` for native link navigation.
- `NavigationMenu` for navigation disclosure panels.
- `Tabs` for tab panels.
- `Menu`, `DropdownMenu`, `ContextMenu`, and `Menubar` for command menus.
- `Tree` for hierarchical one-dimensional navigation or selection.

```tsx
import { NavList } from "@flowstack-ui/atom/nav-list";

<NavList.Root aria-label="Docs">
  <NavList.List>
    <NavList.Item>
      <NavList.Link href="#dialog" active>
        Dialog
      </NavList.Link>
    </NavList.Item>
  </NavList.List>
</NavList.Root>;
```

## Data And Collections

Atom includes structural and interactive data primitives:

- `Table` for native semantic tables.
- `DataGrid` for ARIA grid keyboard behavior and cell focus.
- `TreeGrid` for hierarchical grid behavior.
- `List` for native list structure.
- `Listbox` for selectable option lists.
- `MultiSelect` for several predefined values behind one compact trigger.
- `Feed` for WAI-ARIA feed navigation.
- `Virtualizer` helpers for large scrollable collections.
- `Collection` helpers for registry-backed composite widgets.

Higher-level sorting, filtering, editing, column models, and data fetching are
intentionally outside Atom.

## Documentation

- [Getting started](docs/guides/getting-started.md)
- [Imports](docs/guides/imports.md)
- [Public API](docs/guides/public-api.md)
- [Component documentation](https://atom-ui.com)
