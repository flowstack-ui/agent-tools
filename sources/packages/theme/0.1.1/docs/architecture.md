# Architecture

## Package purpose

`@flowstack-ui/theme` is build-time infrastructure for serializable FLOWSTACK
theme definitions. Brick owns components and its default semantic contract. A
theme maps project visual decisions into that contract and may also retain
additional project roles that Brick does not consume.

## Definition and compiler boundary

The definition envelope is `flowstack.theme.v1`. Compilable token leaves are
strings or finite numbers. Exact `{path.to.token}` aliases may cross palettes,
roles, Brick mappings, foundations, component inputs, and extensions. Unknown
or circular aliases fail compilation.

The first schema identifier is `flowstack.theme.v1`. Additive optional fields
may remain within version 1. Removing a field, changing existing meaning, or
making previously valid data invalid requires a new schema identifier or a
documented compatibility migration.

## Contract mapping

The compiler receives Brick's generated
`flowstack.brick-theme-contract.v1` as data; it does not import Brick source or
carry a copied token list. Theme `brick.light` and `brick.dark` objects address
required semantic paths after the contract's `semantic.<appearance>` prefix.
Compilation requires contract revision 2 or newer so contrast declarations
cannot be absent silently. Revision 3 contracts may additionally declare
closed `allowedValues` for categorical component inputs and a `when` condition
on contrast pairs. These fields remain optional so revision 2 contracts stay
compatible.
Theme `foundations` addresses derived semantic paths. Theme `components`
addresses only declared inherited component inputs, for example
`components.drawer.radius`.

Sparse authoring is safe at the family level. A completely omitted atomic
family inherits Brick defaults, but a partially overridden family is rejected.
Every emitted appearance contains the complete required Brick map.
Compatibility accepts exact semantic versions, caret or tilde ranges,
comparator sets, and `||` alternatives.

Brick also owns a versioned list of maintained semantic contrast pairs. Theme
evaluates those pairs for every supported appearance with WCAG 2 relative
luminance in sRGB. Text pairs require at least 4.5:1 and non-text or
text-distinction pairs require at least 3:1; the unrounded ratio decides
success. A conditional pair runs only when its declared categorical
component-input value is active, using either the authored value or Brick
fallback. A participating token must resolve to an opaque sRGB hex or `rgb()`
value. Compilation fails when a pair is insufficient or cannot be proved. This
contract deliberately excludes disabled presentation and does not claim to
model gradients, transparency, images, consumer overrides, or the final
browser composition.

Project `palettes`, `roles`, and `extensions` are open vocabularies. They emit
under `--flowstack-theme-*`, never create new `--brick-*` meanings, and are
also retained in the token artifact. Extension top-level keys are the
discoverable namespaces recorded by the manifest.

Project meanings that vary by appearance belong in `appearanceRoles`. Each
logical path must provide every supported appearance and emits one stable
`--flowstack-theme-roles-*` variable through the same default, system,
explicit, and nested appearance selectors used by Brick mappings. An
appearance role cannot collide with an invariant `roles` path.

Themes may declare contrast relationships between appearance roles. Theme
evaluates these separately from Brick-owned pairs and records both groups in
the report. This proves only the resolved opaque foreground and background;
images, gradients, transparency, and the final browser composition remain
consumer qualification responsibilities.

## Colors interchange

Theme may read a reviewed serialized `flowstack.colors-candidate.v1` document
as optional build input. It never imports Colors code and has no Colors runtime
dependency. An explicit scaffold mapping assigns selected candidate families
to project palette names and, separately, assigns compatible interface or
neutral families to semantic Brick jobs.

The scaffold writes exact candidate hex values beneath the reserved
`palettes.colors` namespace and generates aliases for complete atomic families
from the installed Brick contract. Decorative and otherwise extra families
remain project palettes without being forced into Brick meaning. The result is
an ordinary editable `flowstack.theme.v1` definition; compilation remains the
authority for exact Brick compatibility and contrast.

## Generated artifacts

- `theme.css` contains the static `flowstack.theme` layer and activation
  selectors taken from the Brick contract.
- `theme.tokens.json` contains resolved DTCG-compatible `$value` leaves.
- `theme.manifest.json` records identity, compatibility, activation,
  extensions, requirements, and artifact names.
- `theme.report.json` records deterministic compilation counts, every declared
  contrast result at 12 significant digits, and warnings. Validation compares
  the unrounded ratio before this serialization boundary.

Fixed-light and fixed-dark definitions emit one complete appearance. Dual
definitions may select a fixed default or `system`; the latter adds a static
`prefers-color-scheme` rule. Explicit nearest Brick appearance boundaries
always receive a complete map.

## Runtime boundary

The core package has no runtime dependencies and no React provider. It produces
deterministic static CSS and machine-readable artifacts at build time.
Optional future framework integration may coordinate selection and first paint
without resolving component styles during React rendering.

## Dependency direction

- Brick never depends on Theme.
- Theme does not import Brick component source.
- Theme builds read a versioned contract exposed by the installed Brick
  package.
- Colors remains optional build-time tooling after its algorithms qualify.
- Applications own preference, persistence, fonts, assets, and routes.
