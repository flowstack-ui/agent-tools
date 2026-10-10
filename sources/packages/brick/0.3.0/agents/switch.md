# Switch agent guide

## Purpose

Present a finished immediately applied binary setting while Atom owns state, interaction, IDs, validation, native forms and composition.

## Use when

- An on/off setting takes effect immediately.

## Choose something else when

- The choice is submitted later, represents a pressed command, or is one of several exclusive values. Use Checkbox, Toggle, or RadioGroup.

## Required composition

- Prefer Switch.Field with exactly one Switch.Control, one Switch.Label and one Switch.HiddenInput. Field is the only state/form owner; Control supplies one default Thumb only when children are omitted.
- Retain Switch.Root plus an explicit Switch.Thumb for the compatible standalone button path. Root owns its automatic native proxy, keeps an HTMLButtonElement ref and boolean onCheckedChange, and must not also receive HiddenInput.
- Use Switch.RootProvider with one useSwitch controller. Its value prop is the controller; inputValue is the submitted checkbox value. Indicators are decorative and links remain outside Control.

## Rules

- **MUST:** Disabled presentation preserves the selected recipe and fades once to 50%, with a not-allowed cursor on the disabled hit target. Keep read-only separate; do not add an opacity wrapper around an already disabled control. Forced colors uses system disabled colors.
- **MUST:** Use Field or RootProvider ids for custom control/label/input associations in SSR. Local part id overrides synchronize after mounting; explicit aria-labelledby and htmlFor remain caller-owned.
- **MUST:** Use Switch only for an immediately applied on/off setting; mixed, loading and pending state are unsupported.
- **MUST:** Keep one state owner and exactly one native checkbox: Root manages its own proxy; Field and RootProvider require exactly one HiddenInput.
- **MUST:** Give Control or Root one stable accessible name. Put visible text and independent links in Label, never inside Control, and keep Indicator and ThumbIndicator decorative.
- **MUST:** Use checked plus onCheckedChange for controlled state or defaultChecked for uncontrolled state; preserve the boolean callback and Atom-owned role, aria-checked, keyboard and cancellation behavior.
- **MUST:** Use readOnly for a focusable immutable setting and disabled for an unavailable, non-submitting setting. Preserve checked identity with read-only, invalid and disabled combinations.
- **MUST:** Preserve checked-only submission, repeated names, named and unnamed reset, required focus, external form ownership and disabled fieldset behavior. For optional React Hook Form integration, connect Controller boolean state to Field and its ref to HiddenInput.
- **SHOULD:** Choose responsive xs/sm/md/lg size, responsive solid/raised variant, and neutral/accent/contrast/info/success/warning/danger tone. Tone does not imply invalid state; labelPlacement applies to compound owners.
- **MUST:** Use documented checked rest/hover/pressed tokens for independent brand colors so interaction never reverts to accent. Raised uses a softened selected rail and solid thumb.
- **MUST:** Use effective element direction and logical edges for mirrored travel, preserve centered endpoints through responsive changes, and make reduced motion immediate.
- **MUST:** Keep Indicator centered in the open half of the track opposite Thumb, and keep ThumbIndicator centered and clipped inside Thumb in both states.
- **MUST:** Load styles.css or core.css plus switch.css; do not repair Switch library defects in playground or application CSS.

## Common mistakes

- **Avoid:** Nesting HiddenInput under Root, omitting it from Field, or giving Control separate checked state. **Instead:** Choose one standalone or compound path and keep one state/input owner.
- **Avoid:** Appending Thumb when Control already has explicit indicator artwork, or putting a help link inside Control. **Instead:** Omit children for the default Thumb; explicit children own artwork, and links belong in or beside Label.
- **Avoid:** Treating tone as validation or adding colorPalette/style-prop APIs. **Instead:** Use tone for semantic selected paint, invalid independently, and documented theme/component tokens for brand colors.

## Validation checklist

- Verify legacy Root DOM/ref/callback/forms and compound label/control/input associations, single-input ownership, controlled/uncontrolled/provider state, pointer/keyboard/cancellation, refs, render/asChild, SSR/hydration and React 18/19.
- Verify native and optional Hook Form submission/reset/validation, required/external form, repeated names, unnamed reset and disabled fieldsets.
- Verify responsive geometry and 44px targets, contained indicator geometry in both states, all tones, custom checked rest/hover/press, light/dark, effective nested RTL, rapid/reduced motion, focus, forced colors and availability combinations. Record screen-reader, device and zoom checks manually.

## Related guidance

- `@flowstack-ui/atom/agents/switch`
- `checkbox`
- `toggle`
- `radio-group`
- `field`
- `form`
- `tooltip`
