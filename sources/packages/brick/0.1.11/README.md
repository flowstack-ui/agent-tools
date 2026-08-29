# @flowstack-ui/brick

Finished, accessible React components built on
[`@flowstack-ui/atom`](https://www.npmjs.com/package/@flowstack-ui/atom).

Brick provides static CSS, semantic design tokens, light and dark appearances,
responsive defaults, and documented customization hooks. Components are ready
to use without requiring an application-level CSS processor.

The complete stylesheet also gives the document body a token-driven canvas,
foreground, and default body typography. Themes change those semantic tokens;
applications can deliberately override the low-specificity foundation later.

## Installation

```bash
npm install @flowstack-ui/brick
```

Brick installs its compatible Atom version automatically. The consuming
application must provide React and React DOM 18 or newer.

## Styles

Import the complete stylesheet once in the application root:

```ts
import "@flowstack-ui/brick/styles.css";
```

New applications may opt into Brick's separate neutral reset for page sizing,
body, `figure`, and `blockquote` margin removal, and browser normalization.
Higher-level FLOWSTACK packs may require this complete two-import setup:

```ts
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/styles.css";
```

Use the token entry point when only Brick's semantic variables are needed:

```ts
import "@flowstack-ui/brick/tokens.css";
```

Do not import `tokens.css` together with `styles.css`; the complete stylesheet
already includes the tokens.

Route-aware applications may opt into modular CSS instead of `styles.css`:

```ts
import "@flowstack-ui/brick/styles/core.css";
import "@flowstack-ui/brick/styles/button.css";
import "@flowstack-ui/brick/styles/card.css";
```

Import `core.css` once before any component styles, then import the stylesheet
matching each Brick JavaScript subpath the route renders. A component
stylesheet includes every shared visual recipe that component renders
internally, so `checkbox-group.css`, for example, does not require a separate
`checkbox.css` import. Component styles do not repeat tokens or foundations.
Do not combine this modular path with `styles.css` or `tokens.css`. The complete
stylesheet remains the recommended default unless measured route CSS makes the
additional import ownership worthwhile.

## Quick start

```tsx
import {
  Button,
  Card,
  Field,
  HStack,
  Input,
  Text,
  VStack,
} from "@flowstack-ui/brick";

export function AccountCard() {
  return (
    <Card.Root>
      <Card.Content>
        <VStack gap="4">
          <Text as="h2" variant="title-md">
            Account settings
          </Text>

          <Field.Root id="account-email">
            <Field.Label>Email</Field.Label>
            <Input name="email" type="email" />
          </Field.Root>

          <HStack gap="2" wrap>
            <Button>Save changes</Button>
            <Button tone="neutral" variant="outline">
              Cancel
            </Button>
          </HStack>
        </VStack>
      </Card.Content>
    </Card.Root>
  );
}
```

Components can also be imported through documented subpaths:

```tsx
import { Button } from "@flowstack-ui/brick/button";
```

## Appearance and customization

With no explicit appearance, Brick follows `prefers-color-scheme`. Set an
appearance on the document or any subtree:

```html
<html data-brick-appearance="dark">
```

Use the server-safe Appearance utility to place a typed local scope on exactly
one existing Brick host without adding a wrapper:

```tsx
import { Appearance } from "@flowstack-ui/brick/appearance";

<Appearance value="dark">
  <AppBar.Root>...</AppBar.Root>
</Appearance>
```

Override public semantic variables with ordinary CSS:

```css
.brand-theme {
  --brick-color-accent-solid: #5b5bd6;
  --brick-color-accent-on-solid: #ffffff;
  --brick-radius-control: 0.75rem;
}
```

See [Appearance and tokens](docs/guides/appearance-and-tokens.md) for the full
customization guide. Theme tooling can discover Brick's generated
[`flowstack.brick-theme-contract.v1`](docs/guides/theme-contract.md) artifact
through `@flowstack-ui/brick/theme-contract.json`.

## Documentation

- [Installation and stylesheet setup](docs/guides/installation.md)
- [Appearance and semantic tokens](docs/guides/appearance-and-tokens.md)
- [Generated theme contract](docs/guides/theme-contract.md)
- [Shared control sizing](docs/guides/control-sizing.md)
- [Browser support and progressive enhancement](docs/guides/browser-support.md)

The complete component guides live with the source repository:

| Family | Components |
| --- | --- |
| Actions and selection | [Button](https://github.com/flowstack-ui/brick/blob/main/docs/components/button/README.md), [Icon Button](https://github.com/flowstack-ui/brick/blob/main/docs/components/icon-button/README.md), [Toggle](https://github.com/flowstack-ui/brick/blob/main/docs/components/toggle/README.md), [Toggle Group](https://github.com/flowstack-ui/brick/blob/main/docs/components/toggle-group/README.md), [Segment Group](https://github.com/flowstack-ui/brick/blob/main/docs/components/segment-group/README.md), [Toolbar](https://github.com/flowstack-ui/brick/blob/main/docs/components/toolbar/README.md), [Pagination](https://github.com/flowstack-ui/brick/blob/main/docs/components/pagination/README.md), [Reorderable List](https://github.com/flowstack-ui/brick/blob/main/docs/components/reorderable-list/README.md) |
| Accessibility | [Skip Link](https://github.com/flowstack-ui/brick/blob/main/docs/components/skip-link/README.md), [Visually Hidden](https://github.com/flowstack-ui/brick/blob/main/docs/components/visually-hidden/README.md) |
| Data display | [Aspect Ratio](https://github.com/flowstack-ui/brick/blob/main/docs/components/aspect-ratio/README.md), [Data List](https://github.com/flowstack-ui/brick/blob/main/docs/components/data-list/README.md), [Data Grid](https://github.com/flowstack-ui/brick/blob/main/docs/components/data-grid/README.md), [Tree Grid](https://github.com/flowstack-ui/brick/blob/main/docs/components/tree-grid/README.md), [Tree](https://github.com/flowstack-ui/brick/blob/main/docs/components/tree/README.md), [Feed](https://github.com/flowstack-ui/brick/blob/main/docs/components/feed/README.md), [Swipeable Item](https://github.com/flowstack-ui/brick/blob/main/docs/components/swipeable-item/README.md), [Carousel](https://github.com/flowstack-ui/brick/blob/main/docs/components/carousel/README.md) |
| Forms and choices | [Color Picker](https://github.com/flowstack-ui/brick/blob/main/docs/components/color-picker/README.md), [Form](https://github.com/flowstack-ui/brick/blob/main/docs/components/form/README.md), [Field](https://github.com/flowstack-ui/brick/blob/main/docs/components/field/README.md), [Fieldset](https://github.com/flowstack-ui/brick/blob/main/docs/components/fieldset/README.md), [Input](https://github.com/flowstack-ui/brick/blob/main/docs/components/input/README.md), [Number Input](https://github.com/flowstack-ui/brick/blob/main/docs/components/number-input/README.md), [OTP Field](https://github.com/flowstack-ui/brick/blob/main/docs/components/otp-field/README.md), [Password Toggle Field](https://github.com/flowstack-ui/brick/blob/main/docs/components/password-toggle-field/README.md), [Textarea](https://github.com/flowstack-ui/brick/blob/main/docs/components/textarea/README.md), [Select](https://github.com/flowstack-ui/brick/blob/main/docs/components/select/README.md), [Combobox](https://github.com/flowstack-ui/brick/blob/main/docs/components/combobox/README.md), [Multi Select](https://github.com/flowstack-ui/brick/blob/main/docs/components/multi-select/README.md), [File Upload](https://github.com/flowstack-ui/brick/blob/main/docs/components/file-upload/README.md), [Checkbox](https://github.com/flowstack-ui/brick/blob/main/docs/components/checkbox/README.md), [Checkbox Group](https://github.com/flowstack-ui/brick/blob/main/docs/components/checkbox-group/README.md), [Radio Group](https://github.com/flowstack-ui/brick/blob/main/docs/components/radio-group/README.md), [Switch](https://github.com/flowstack-ui/brick/blob/main/docs/components/switch/README.md), [Slider](https://github.com/flowstack-ui/brick/blob/main/docs/components/slider/README.md), [Rating](https://github.com/flowstack-ui/brick/blob/main/docs/components/rating/README.md) |
| Content and status | [Text](https://github.com/flowstack-ui/brick/blob/main/docs/components/text/README.md), [Icon](https://github.com/flowstack-ui/brick/blob/main/docs/components/icon/README.md), [Image](https://github.com/flowstack-ui/brick/blob/main/docs/components/image/README.md), [Code](https://github.com/flowstack-ui/brick/blob/main/docs/components/code/README.md), [Code Block](https://github.com/flowstack-ui/brick/blob/main/docs/components/code-block/README.md), [Avatar](https://github.com/flowstack-ui/brick/blob/main/docs/components/avatar/README.md), [Badge](https://github.com/flowstack-ui/brick/blob/main/docs/components/badge/README.md), [Chip](https://github.com/flowstack-ui/brick/blob/main/docs/components/chip/README.md), [Notification Badge](https://github.com/flowstack-ui/brick/blob/main/docs/components/notification-badge/README.md), [Status](https://github.com/flowstack-ui/brick/blob/main/docs/components/status/README.md), [Color Swatch](https://github.com/flowstack-ui/brick/blob/main/docs/components/color-swatch/README.md), [Card](https://github.com/flowstack-ui/brick/blob/main/docs/components/card/README.md), [List](https://github.com/flowstack-ui/brick/blob/main/docs/components/list/README.md), [Table](https://github.com/flowstack-ui/brick/blob/main/docs/components/table/README.md), [Divider](https://github.com/flowstack-ui/brick/blob/main/docs/components/divider/README.md), [Collapsible](https://github.com/flowstack-ui/brick/blob/main/docs/components/collapsible/README.md), [Accordion](https://github.com/flowstack-ui/brick/blob/main/docs/components/accordion/README.md), [Skeleton](https://github.com/flowstack-ui/brick/blob/main/docs/components/skeleton/README.md), [Progress](https://github.com/flowstack-ui/brick/blob/main/docs/components/progress/README.md), [Progress Circle](https://github.com/flowstack-ui/brick/blob/main/docs/components/progress-circle/README.md), [Toast](https://github.com/flowstack-ui/brick/blob/main/docs/components/toast/README.md) |
| Contextual overlays | [Tooltip](https://github.com/flowstack-ui/brick/blob/main/docs/components/tooltip/README.md), [Hover Card](https://github.com/flowstack-ui/brick/blob/main/docs/components/hover-card/README.md), [Popover](https://github.com/flowstack-ui/brick/blob/main/docs/components/popover/README.md), [Dropdown Menu](https://github.com/flowstack-ui/brick/blob/main/docs/components/dropdown-menu/README.md), [Context Menu](https://github.com/flowstack-ui/brick/blob/main/docs/components/context-menu/README.md), [Menubar](https://github.com/flowstack-ui/brick/blob/main/docs/components/menubar/README.md) |
| Modal surfaces | [Dialog](https://github.com/flowstack-ui/brick/blob/main/docs/components/dialog/README.md), [Alert Dialog](https://github.com/flowstack-ui/brick/blob/main/docs/components/alert-dialog/README.md), [Drawer](https://github.com/flowstack-ui/brick/blob/main/docs/components/drawer/README.md) |
| Navigation and layout | [Appearance](https://github.com/flowstack-ui/brick/blob/main/docs/components/appearance/README.md), [Breadcrumb](https://github.com/flowstack-ui/brick/blob/main/docs/components/breadcrumb/README.md), [Tabs](https://github.com/flowstack-ui/brick/blob/main/docs/components/tabs/README.md), [Navigation Menu](https://github.com/flowstack-ui/brick/blob/main/docs/components/navigation-menu/README.md), [Bottom Navigation](https://github.com/flowstack-ui/brick/blob/main/docs/components/bottom-navigation/README.md), [Link](https://github.com/flowstack-ui/brick/blob/main/docs/components/link/README.md), [Link Box](https://github.com/flowstack-ui/brick/blob/main/docs/components/link-box/README.md), [Nav List](https://github.com/flowstack-ui/brick/blob/main/docs/components/nav-list/README.md), [Sidebar](https://github.com/flowstack-ui/brick/blob/main/docs/components/sidebar/README.md), [App Bar](https://github.com/flowstack-ui/brick/blob/main/docs/components/app-bar/README.md), [Stack](https://github.com/flowstack-ui/brick/blob/main/docs/components/stack/README.md), [Group](https://github.com/flowstack-ui/brick/blob/main/docs/components/group/README.md), [Grid](https://github.com/flowstack-ui/brick/blob/main/docs/components/grid/README.md), [Container](https://github.com/flowstack-ui/brick/blob/main/docs/components/container/README.md), [Section](https://github.com/flowstack-ui/brick/blob/main/docs/components/section/README.md), [Frame](https://github.com/flowstack-ui/brick/blob/main/docs/components/frame/README.md), [Bleed](https://github.com/flowstack-ui/brick/blob/main/docs/components/bleed/README.md), [Show](https://github.com/flowstack-ui/brick/blob/main/docs/components/show/README.md), [Hide](https://github.com/flowstack-ui/brick/blob/main/docs/components/hide/README.md), [Surface](https://github.com/flowstack-ui/brick/blob/main/docs/components/surface/README.md), [Scroll Area](https://github.com/flowstack-ui/brick/blob/main/docs/components/scroll-area/README.md) |
| Depth layout | [ZStack](https://github.com/flowstack-ui/brick/blob/main/docs/components/z-stack/README.md) |

## Package boundary

`@flowstack-ui/atom` owns reusable behavior, state, semantics, focus, keyboard
interaction, portals, positioning, and accessibility. Brick owns the finished
visual components, static CSS, semantic tokens, and public customization
contract. Application data, routing, persistence, and business workflows stay
outside the package.

## License

MIT
