# Public API

Atom UI exposes three public API layers.

## Namespace Exports

Namespace exports are the stable API for application and styled-layer usage.

```tsx
import { Select } from "@flowstack-ui/atom";

<Select.Root>
  <Select.Trigger />
  <Select.Content />
</Select.Root>;
```

## Subpath Exports

Subpaths are stable focused entrypoints.

```tsx
import { Select } from "@flowstack-ui/atom/select";
import { Link } from "@flowstack-ui/atom/link";
import { Clipboard } from "@flowstack-ui/atom/clipboard";
import { Carousel } from "@flowstack-ui/atom/carousel";
import { Image } from "@flowstack-ui/atom/image";
import { useControllableState } from "@flowstack-ui/atom/hooks";
```

Every supported subpath is declared by the package and provides JavaScript plus
TypeScript declarations.

## Direct Part Exports

Direct exports are available from component subpaths for migration and
advanced composition.

```tsx
import { SelectRoot, SelectTrigger } from "@flowstack-ui/atom/select";
```

Prefer namespace usage for new code unless a direct part export improves local
readability. Shared primitives retain their shared direct names. For example,
`Dialog.Root` is directly exported as `ModalRoot` because Dialog composes the
shared Modal root behavior. Check the component subpath declarations rather
than assuming every direct export is named by concatenating its namespace and
part names.

## Non-API Files

The following are not public package API:

- files under `src/primitives/**`
- files under `src/utils/**`, except `Portal` through `@flowstack-ui/atom/portal`
- tests
- internal helper functions that are not exported from a public subpath

These implementation files may change between releases even when the public
entrypoints remain compatible.

## Composition

Components that document `asChild` clone their only child and merge Atom props
onto it. Components that document `render` can replace the default element with
an intrinsic tag, element, or render callback. Both paths preserve forwarded
refs, native props, and Atom-owned behavior.

Choose a composed element whose native semantics match the interaction. For
example, a Button link composition should expose its destination through an
`href` prop so Atom preserves link semantics instead of adding button behavior:

```tsx
import { Button } from "@flowstack-ui/atom";

<Button.Root asChild>
  <a href="/settings">Settings</a>
</Button.Root>;
```

The same rule applies to custom link adapters and `render` elements: keep
`href` visible on the element passed to Button. This lets Button identify link
semantics and replace `href`, `target`, and `rel` with `null` while disabled or
loading. Native anchors and permissive adapters render without those
attributes.

A router component that requires `href` to remain a string is not safe for
direct inactive composition. Use a render adapter that bypasses the router
component and returns a destination-free anchor when `aria-disabled` is true.
Atom does not ship router-specific bindings, inspect framework-specific
navigation props, or retain a live destination on an inactive link.

The generic `Link.Root` is narrower than Button link mode. Its default render
requires `href`, while `render` or `asChild` may supply a router adapter that
owns the final destination. Link does not add action, loading, disabled, or
router-provider behavior and remains server-safe.
