# Migration

## Brick 0.3 and constrained contracts

Upgrade to Theme 0.2 before compiling Brick 0.3.0's v2 contract. Existing
`flowstack.theme.v1` definitions keep their schema; update `compatibility.brick`
only after qualifying the new Brick version. Legacy Brick v1 contracts remain
supported, and an incompatible range still fails rather than being widened.

The installed Brick contract is the authority for newly available typography,
radius, form, surface and other semantic values. Inherit complete defaults or
use its declared author paths; do not copy a historical token list. Numeric
constraints are inclusive, and constrained lengths accept only declared literal
units or unitless zero when explicitly allowed. Aliases are checked after
resolution. Named blur values reference the declared constrained foundation.
Unknown constraints, invalid defaults and out-of-range values fail compilation.

Recompile and inspect light/dark, nested appearances, portalled content, form
states, focus, reduced motion and forced colors. Static opaque contrast checks
do not certify disabled opacity or arbitrary translucent backdrops.

## From handwritten Brick variables

1. Inventory application CSS variables and separate Brick semantic values
   from application colors, fonts, assets, and layout policy.
2. Move raw colors into `palettes`; give product meanings to reusable values in
   `roles`.
3. Map only actual Brick UI meanings under `brick.light` and `brick.dark`.
4. Move supported foundations and audited global component inputs into their
   closed sections.
5. Keep charts, syntax, campaigns, and product-specific colors in namespaced
   extensions.
6. Compile against the installed Brick contract, compare generated CSS with
   the old application values, then remove the handwritten Brick assignments.
7. Build and qualify appearance re-entry, portals, first paint, contrast, and
   representative application compositions.

Do not copy Brick's complete token contract into the application. Sparse
families inherit Brick safely; the generated result is complete.

## Compatibility and diagnostics

`compatibility.brick` describes the Brick package versions the theme accepts.
The compiler separately requires theme contract revision 2 or newer. These
checks distinguish “wrong Brick release” from a malformed contract.

Compilation diagnostics include stable codes for incompatible Brick versions,
unknown paths, incomplete atomic families, invalid aliases, alias cycles,
unsupported component inputs, insufficient contrast, and contrast values the
compiler cannot prove. Treat them as migration instructions rather than
silencing them with application CSS.

Brick contract deprecations, when introduced, include a replacement. Theme
rejects authored deprecated semantic paths with a migration diagnostic instead
of emitting an obsolete variable silently.
