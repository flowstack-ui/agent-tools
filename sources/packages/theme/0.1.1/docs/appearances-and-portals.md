# Appearances and portals

Light and dark are appearances inside one brand theme. A definition may be
fixed light, fixed dark, or dual appearance with a fixed or `system` default.

The theme identity uses `data-flowstack-theme`. Brick continues to own
appearance boundaries through `data-brick-appearance="light|dark"` and its
server-safe `Appearance` component. Generated CSS emits a complete token map
at every explicit boundary, so light → dark → light re-entry works without a
provider.

```html
<body data-flowstack-theme="acme">
  <main data-brick-appearance="light">
    <aside data-brick-appearance="dark">
      <section data-brick-appearance="light"></section>
    </aside>
  </main>
</body>
```

The application owns root preference, persistence, and the earliest safe
pre-paint attribute setup. Theme does not read `localStorage`, inspect media
queries, or mutate the document.

## Portals

A portal inherits React context but not the trigger's CSS ancestry. Content
rendered under `document.body` therefore inherits the document theme and
appearance, not a locally themed trigger subtree.

When a portal must retain a local appearance, render it into a container under
that visual boundary or apply an explicit theme/appearance boundary to the
portal root. Do not copy computed CSS variables in JavaScript.

Nested different-brand themes remain structurally possible, but complete
multi-brand nesting is not a Theme `0.1` qualification claim.

