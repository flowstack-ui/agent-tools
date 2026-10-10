# SegmentGroup agent guide

## Purpose

Present one mutually exclusive immediate mode in a compact segmented surface with radio semantics and a moving visual indicator.

## Use when

- A small visible set such as list/grid, density, or appearance must keep exactly one immediate mode selected.

## Choose something else when

- Commands may be independently pressed, the choices select paired panels, or an ordinary form choice is needed. Use ToggleGroup, Tabs, or RadioGroup according to the interaction.

## Required composition

- Compose Root with one Indicator and directly owned Items; give Root a complete accessible name and every icon-only Item its own complete name.
- Choose one shared size on Root so its outer height aligns through Brick's control contract. Segment labels keep component-owned regular typography and inline rhythm. Reserve 2xs for dense application tools such as property panels; use xs for the polished 32px compact recipe.

## Rules

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Use SegmentGroup only for one mutually exclusive value and preserve Atom Radio Group semantics and keyboard behavior.
- **MUST:** Render one decorative Indicator for the canonical moving-selection recipe; selection and naming must remain on Items.
- **MUST:** Do not use SegmentGroup for paired content panels or route navigation; use Tabs or navigation destinations.
- **MUST:** Use 2xs only when the surrounding expert interface deliberately uses 24px compact controls; use sm or larger for ordinary touch-first choice surfaces.
- **MUST:** Load styles.css or core.css plus segment-group.css.
- **MUST:** Prefer neutral, accent or contrast tone on Root before local indicator variables. Tone pairs selected fill with readable text/icons; it never tints the track or communicates validation status. Keep invalid separate.
- **MUST:** Use Items for unique string or value/label/disabled options and manual Item for custom native props or icon-only naming. Atom creates named inputs; never append duplicate inputs. Indicator measurement belongs to Atom and must not depend on public slot names.

## Common mistakes

- **Avoid:** Using ToggleGroup single mode for a required one-of-many mode or using SegmentGroup as visual tabs. **Instead:** Choose SegmentGroup for one compact radio-semantic mode and Tabs only when panels are paired.

## Validation checklist

- Check click, Space, arrows, Home/End, looping, controlled state, disabled/read-only state, and complete accessible naming.
- Check indicator movement after selection and resize, exact shared outer sizes, regular label typography, component-owned inline padding, subtle unselected rail, short inset default-boundary separator rules that disappear beside the selected Item, raised-surface selection, light outer edge and dark inset highlight, inset Root boundary, borderless shallow selected elevation, focus containment, reduced motion, forced colors, zoom, and RTL.
- Verify named forms and separators, SSR-to-measured handoff, data-slot overrides, sibling layout changes, scaled ancestors, owner-window iframe, all three tones and local override contrast.

## Related guidance

- `radio-group`
- `toggle-group`
- `tabs`
- `button`
- `select`
- `toolbar`
