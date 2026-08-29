# Troubleshooting

## Contract revision is unsupported

Install a Brick release whose `theme-contract.json` has revision 2 or newer.
Do not edit or snapshot the installed contract to bypass this check.

## Brick version is incompatible

Either install a Brick version accepted by `compatibility.brick` or review and
update the theme's compatibility range after qualifying it against the newer
contract.

## Atomic family is incomplete

Supply every member of the named family for that appearance, or remove all
overrides for the family to inherit Brick's complete default.

## Contrast is insufficient

The diagnostic names the appearance, foreground, background, raw ratio, and
required threshold. Adjust the semantic family while reviewing rest, hover,
pressed, soft, and foreground values together. Do not round the ratio or add a
local component patch.

## Contrast is unverifiable

Brick-declared contrast participants must resolve to opaque sRGB hex or
`rgb()` values. Convert the accepted color to one of those exact forms.
Transparent colors, gradients, images, color mixing, and final composition
still require browser-level accessibility review.

## A portal has the wrong appearance

Render it into a container under the intended boundary or place an explicit
theme and appearance boundary on the portal root. React context alone cannot
transfer CSS ancestry.

## The font falls back

Read `theme.manifest.json` requirements and verify the application loads the
declared family or CSS variable on the active theme boundary. Theme does not
load font assets.

## Generated files drift

Compile with the same Theme version and installed Brick contract used by CI.
Keep only one generation owner: committed artifacts plus a drift check, or CI
generation from source.

