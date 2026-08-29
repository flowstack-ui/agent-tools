# Migration

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

