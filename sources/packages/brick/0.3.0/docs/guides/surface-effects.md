# Surface effects

Surface, AppBar.Root and BottomNavigation.Root keep their own painted hosts and
finished defaults. No Surface wrapper is needed around a bar.

| Prop | Values | Omitted |
| --- | --- | --- |
| treatment | none, translucent | Existing owner behavior (including blurred) |
| backgroundOpacity | finite number 0–1 | Selected recipe alpha |
| backdropBlur | none, sm, md, lg, 0, non-negative px/rem/em string | Selected recipe blur |
| backdropSaturate | finite number ≥0 | Selected recipe saturation |
| borderColor | CSS color | Existing structural border role |
| borderOpacity | finite number 0–1 | 1 |

```tsx
<Surface treatment="translucent" backgroundOpacity={0.82} backdropBlur="18px" bordered borderOpacity={0.5}>
  Readable content
</Surface>
<AppBar.Root treatment="translucent" backdropBlur="lg" backdropSaturate={1.1} />
```

SurfaceTreatment and BackdropBlur are exported types. Named blur steps default
to sm=0.375rem, md=0.75rem and lg=1.5rem. Translucent defaults use saturation 1.15
and md blur; fill multipliers are 0.9 for Surface, 0.88 for AppBar and 0.86 for
BottomNavigation. Ordinary no-prop paint is unchanged.

Parameters are independent. Opacity changes background color alpha, never
children or element opacity. Alpha multiplies an existing color alpha once.
Blur alone does not make an opaque fill transparent. Border color/alpha never
adds a border or changes focus/selection indicators. Use the owner's existing
border/variant controls. Explicit transparent levels remain transparent with
new treatments; legacy blurred variants retain their existing fill behavior.

The preset supplies defaults, Theme can tune those defaults, and explicit
parameters override them. treatment=none resets the preset while allowing
individual parameters. blurred remains supported on the bars; explicit treatment
wins over it. Existing blurred-background hooks are already-resolved legacy
colors: backgroundOpacity explicitly recomputes from base material instead of
multiplying the old preset twice.

Set backdropBlur=none and backdropSaturate=1 to remove filtering. Invalid numeric
or literal blur props act as omitted with development diagnostics. Raw blur
percentages, functions, responsive objects and numeric spacing factors are not
accepted. CSS color validity for advanced borderColor expressions remains the
browser's responsibility.

## Local CSS inputs

The documented instance variables are --brick-surface-effect-opacity (percentage),
--brick-surface-effect-blur (length), --brick-surface-effect-saturation (number),
--brick-surface-effect-border-color (color), and
--brick-surface-effect-border-opacity (percentage). Set these on the painted
host with className/style after opting into an effect. Consumer style inputs
win over prop inputs during ordinary paint. These instance variables reset on
each Surface/AppBar/BottomNavigation host and do not configure nested owners.

Native CSS overrides are advanced escape hatches; declarations that bypass the
recipe also bypass its guarantees. Dynamic CSS blur expressions require a
filter-enabled treatment. Use documented props for enabling/disabling effects.

## Fallback and composition

Filter-dependent paint falls back to an opaque material where backdrop filters
are unsupported. Reduced transparency restores opaque paired paint and removes
filters for transparent/filter effects. Forced colors uses system paint and
visible boundaries. Browser support for the transparency preference varies.
Unfiltered alpha remains usable without backdrop-filter support.

Root filtering creates a containing block for fixed/absolute descendants and a
stacking context. Use the existing overlay owner's Portal/container strategy;
do not compensate with arbitrary z-index or overflow clipping. Surface.Media
and Scrim retain their own layer responsibilities. Foreground children stay
opaque and independently themed controls keep their recipes.

Verify actual foreground and meaningful indicator contrast over every backdrop.
Opaque Theme contrast checks do not prove contrast over imagery or scrolling
content. Do not apply large/nested filters indiscriminately; profile real devices.

## Theme defaults

The constrained v2 Brick theme contract requires a compatible Theme reader;
legacy v1 readers reject it. Theme continues to accept legacy v1 contracts.
Use foundations.blur.sm/md/lg and components.surface.translucent.opacity/blur/
saturation; equivalent component prefixes are appbar and bottomnavigation.
Blur accepts a non-negative px/rem/em literal, zero, or a named step on the
component input. Opacity is 0–1 and saturation is non-negative. Invalid values,
aliases and unsupported constraints fail compilation. Theme values tune opted-in
recipes without making every surface translucent. Appearance scopes continue
to select the underlying semantic colors.
