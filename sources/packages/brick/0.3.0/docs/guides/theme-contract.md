# Theme contract

Brick publishes a generated, machine-readable description of the values that
a FLOWSTACK theme may provide:

```js
import contract from "@flowstack-ui/brick/theme-contract.json" with { type: "json" };
```

The artifact now uses `flowstack.brick-theme-contract.v2` (revision 6) for constrained surface values. It requires the compatible dual-schema Theme reader. The following revisions describe the retained v1 history.
It is generated from Brick's token source, component documentation contracts,
and cascade declaration, so theme tooling does not need a copied token list.
Contract revision 2 added the required contrast declaration. Revision 3 added
closed categorical component inputs and conditional contrast pairs. Revision
4 added component policy recipes. Revision 5 added the native text-selection
foreground/background pair and folds both roles into the atomic accent family.
Revisions 2–5 retained schema version 1 because those changes were additive
for existing readers. The current revision 6 uses schema version 2 and requires
a compatible Theme reader; acceptance of an older revision does not establish
compatibility with the current constrained-value contract.

The contract records:

- every semantic variable, type, light and dark default, and appearance
  behavior;
- atomic color families that must be reviewed together;
- semantic foreground/background pairs, their text, text-distinction, or
  non-text kind, optional component-input condition, and minimum contrast
  ratio Theme must validate without rounding;
- approved inherited component inputs, their semantic fallbacks, and any
  closed `allowedValues` vocabulary;
- local component extension variables and implementation-only variables;
- component recipes, defaults, and state attributes used by qualification;
- the reserved theme and appearance attributes; and
- the exact cascade position for compiled theme CSS.

## Token classifications

Source validation follows local stylesheet imports when checking a component's
extension-token fallback. Shared recipes such as Button paint imported by
IconButton belong to that stylesheet's dependency chain; unrelated stylesheets
do not satisfy the check.

`required` values are appearance-dependent semantic colors and shadows that a
complete compiled appearance must contain. `derived` values are stable
semantic foundations that can inherit Brick defaults. `component-input`
values are the small audited set that may inherit from a theme scope.
`optional-extension` values are public component-instance escape hatches, not
global theme controls. `internal` values belong to Brick implementation.
Deprecated values, when introduced, include their replacements.

## Contrast pairs

Brick publishes only adjacencies promised by maintained component recipes. It
does not ask Theme to test every theoretical combination of semantic colors.
Normal authored text pairs require `4.5:1`; meaningful non-text indicators
require `3:1`. A conditional text-distinction pair requires `3:1` when a
categorical theme decision removes the non-color cue that normally identifies
an element. Disabled text and arbitrary local component overrides remain
outside this static contract, while browser qualification covers opacity,
gradients, images, and composition-specific adjacency.

The public contract uses `wcag2-relative-luminance` over opaque sRGB values.
Theme owns the calculation and generated report; Brick owns the declared pair
semantics and thresholds.

Native selection is one opaque text pair:
`--brick-color-selection-foreground` on
`--brick-color-selection-background`. Both tokens are required in light and
dark appearance maps, belong to the `accent` atomic family, and require at
least `4.5:1`. Because the selection background is opaque, the declared ratio
does not change when selection crosses a neutral, accent, status, or image
surface.

Brick approves Drawer background and radius plus legacy Link resting
decoration as inherited component inputs. `components.link.decoration` accepts
`"always"` or `"interaction"`. Actual inline text distinction remains a
composition-level check when decoration is removed; Link restores its
underline on hover, focus, and active interaction. This policy applies only
to the deprecated explicit `variant="theme"`. The default `underline`, opt-in
`subtle`, and `plain` recipes own their decoration behavior independently.

Other documented component variables remain available for local instance
customization but are intentionally not accepted as global Theme inputs until
a real product proves that scope safe. Shared appearance-dependent elevation
uses semantic `--brick-shadow-floating` and `--brick-shadow-modal` tokens,
which themes may map through `brick.light.shadow` and `brick.dark.shadow`.

## Cascade and scopes

The optional reset occupies `brick.reset` before the token and component layers.
Both reset and component CSS declare that ordering, so loading reset last does
not override specialized component focus presentation. Its focus-visible
fallback consumes the existing semantic focus tokens; no new Theme values are
required.

Compiled theme variables belong in `flowstack.theme`, after `brick.tokens` and
before `brick.foundations`. Unlayered application CSS can still deliberately
override the result.

Use `data-flowstack-theme` to select a named theme and
`data-brick-appearance="light|dark"` for the nearest appearance boundary. A
dual-appearance theme must re-emit its complete required map at nested light
and dark boundaries. See [Appearance and tokens](appearance-and-tokens.md) for
scope and portal rules.

This artifact describes Brick's consumption boundary. Theme authoring,
validation, and CSS generation belong to the separate FLOWSTACK Theme package.

Revision 6 adds enforceable number/length constraints and named blur foundation references. See [Surface effects](surface-effects.md). Older Theme readers must reject the v2 schema rather than ignore these constraints.
