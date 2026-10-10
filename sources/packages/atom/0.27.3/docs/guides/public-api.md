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

## Shared state

`useControllableState` composes sequential uncontrolled functional requests
before the next render. In controlled mode, each request is based on the last
value accepted by the owner; requesting a value does not replace that value.

## Migrating from 0.26.1 to 0.27.0

These changes describe 0.27.0, not the previously published
0.26.1 archive. This release includes intentional breaking changes and must
not be presented as a drop-in patch.

### OTPField becomes PinInput

Replace `OTPField` and `/otp-field` imports with `PinInput` and `/pin-input`.
There is no compatibility alias. Direct part, context and utility names use the
`PinInput` prefix, and the public character type is `PinInputType`.

- Root `value` and `defaultValue` change from `string` to `string[]`.
- `onValueChange` receives `{ value, valueAsString, complete }`, not a string.
  Store `value` directly: joining and splitting partial values loses empty cells.
- Set `otp` explicitly for one-time-code autocomplete; it defaults to `false`.
- Keep `onComplete(code: string)` for accepted complete transactions. Verification,
  expiry and storage remain application responsibilities.
- Rename authored `otp-field*` data-slot selectors to their `pin-input*`
  counterparts. Do not use CSS masking as a security mechanism.

```tsx
import { useState } from "react";
import { PinInput } from "@flowstack-ui/atom/pin-input";

export function VerificationCode() {
  const [value, setValue] = useState<string[]>(["", "", "", "", "", ""]);
  return (
    <PinInput.Root
      name="code" length={6} otp aria-label="Verification code"
      value={value} onValueChange={({ value }) => setValue(value)}
    >
      {Array.from({ length: 6 }, (_, index) => <PinInput.Input key={index} />)}
    </PinInput.Root>
  );
}
```

Root owns the named hidden submission input. Do not add a second proxy input.
Use array state for positional partial data; the submitted value is joined text.

### SkipLink.Target no longer creates a main landmark

The default host changes from `main` to `div`. Applications must retain their
main landmark explicitly. To preserve the previous structure:

```tsx
import { SkipLink } from "@flowstack-ui/atom/skip-link";

export function Page() {
  return (
    <>
      <SkipLink.Root href="#main-content">Skip to content</SkipLink.Root>
      <SkipLink.Target id="main-content" asChild>
        <main><h1>Page content</h1></main>
      </SkipLink.Target>
    </>
  );
}
```

If the page already has a `main`, put the default Target inside it instead.
Do not create a duplicate main landmark. Default explicit focus does not update
the URL hash; choose `focusTarget={false}` for native fragment navigation.

### Tree multiple-selection pointer behavior

In multiple mode, ordinary item clicks now replace selection instead of toggling
one item into the existing selection. Ctrl/Command-click toggles one item;
Shift-click extends the visible range. Space still toggles the active item
unless independent checking is enabled, when it checks that item instead.

Update interaction instructions and pointer tests that assumed every ordinary
click was additive. Selection (`value`) and checking (`checkedValue`) are
separate operations; do not use checked state as a drop-in replacement for
selection or add competing click handlers to recreate the old behavior.

### Fieldset invalidity and independent Fields

Fieldset still aggregates invalid descendants, but its group invalid state no
longer marks every nested Field invalid. For server errors, set `invalid` on
each affected Field explicitly. This prevents a group's aggregate error from
feeding back into valid siblings and keeping the group invalid after correction.

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
## Record selection utilities

`@flowstack-ui/atom/selection` exports `useSelection` and
`useSelectionCheckbox`, with their options/state/binding types. They are also
root exports. They own record-ID state, not rendering, layout, roles, or focus.

Pass unique nonempty string `orderedKeys` in current display order. Optional
`selectedKeys` controls the state; otherwise `defaultSelectedKeys` initializes
it. `onSelectionChange` receives a new immutable array. `mode` defaults to
`multiple`; `single` permits at most one selected ID. `disabled`, `readOnly`
and `disabledKeys` suppress user mutations. Filtering or paging does not delete
selected IDs outside the current order. Use `setSelection` to reconcile known
deletions explicitly; `clearSelection` clears all IDs.

The state exposes `isSelected`, `canSelect`, `setSelected`, `toggle`,
`setScopeSelected`, `getScopeState` and `selectRange`. Scope commands preserve
out-of-scope selections. `getScopeState` returns `none`, `some` or `all`, ignoring
disabled keys. Empty eligible scopes are `none`. Selection only represents
known IDs, not an implicit all-server-results query. Name scope controls
explicitly, such as “Select this page”.

Call `useSelectionCheckbox({ selection, value, rangeSelection: true })` inside
each row component and spread its props on Atom Checkbox. Range selection is
opt-in and coordinates Shift-click and Shift+Space from the last ordinary
checkbox activation. Order or mode changes reset that anchor. The hook is not
a native-input prop adapter and does not infer form names or submission.

`@flowstack-ui/atom/action-delegate` exports `ActionDelegate` and
`ActionDelegateProps`. Give it one non-Fragment child host and `targetId` of
a real visible descendant link, button or native checkbox. It expands ordinary
pointer activation to the row background without adding a role or tab stop.
Keep the actual control keyboard-accessible. Independent controls, text
selection, cancelled events, portal clicks and modified/middle clicks do not
delegate. Do not nest delegates. Use `data-action-delegate-ignore` on custom
interactive regions. Selection and primary activation remain separate.
