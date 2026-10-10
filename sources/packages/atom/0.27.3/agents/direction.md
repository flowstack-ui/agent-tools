# Direction agent guide

## Purpose

Provide left-to-right or right-to-left React context for Atom-owned keyboard, placement, gesture, and navigation behavior without rendering a DOM wrapper.

## Use when

- A subtree of Atom components must mirror direction-aware behavior for a left-to-right or right-to-left interface.

## Choose something else when

- Only document text direction needs to change, one component already has an accurate local dir prop, or visual mirroring is being attempted without semantic direction. Use the native dir attribute, the component's local dir prop, or direction-aware higher-layer styling.

## Required composition

- Set native dir and the appropriate language on the semantic HTML subtree, then wrap the matching Atom subtree in Direction.Provider with the same ltr or rtl value. Let a component-specific dir prop override context only for a deliberately different nested behavior direction.

## Rules

- **MUST:** Pair Direction.Provider with the matching native dir attribute because context mirrors Atom behavior but does not set browser text, punctuation, layout, or assistive-technology direction.
- **MUST:** Use only ltr or rtl and keep Provider, native dir, written language, and content direction consistent; omitted context resolves to ltr.
- **MUST:** Scope Provider to the Atom subtree whose behavior shares the direction and use nested Providers only at genuine bidirectional boundaries.
- **MUST:** Treat a component's explicit dir prop as the local behavior override and verify it intentionally differs before overriding shared context.
- **MUST:** Do not expect Provider to render a wrapper, role, ARIA attribute, data attribute, or styling hook.
- **MUST:** Verify semantic start and end, Arrow keys, expand and collapse keys, placement, gestures, and focus movement in both directions for every composed primitive that owns direction-aware behavior.

## Common mistakes

- **Avoid:** Wrapping components in Direction.Provider without setting native dir on the document subtree. **Instead:** Set native dir for browser and assistive-technology semantics and use Provider for matching Atom behavior.
- **Avoid:** Using CSS transforms to mirror controls or assuming every Arrow key should reverse in RTL. **Instead:** Use semantic direction and test each primitive's documented logical and spatial keyboard contract.
- **Avoid:** Passing conflicting Provider and component-local directions accidentally. **Instead:** Choose one subtree direction and reserve local dir overrides for intentional nested behavior boundaries.

## Validation checklist

- Verify useDirection returns ltr outside a Provider and the nearest ltr or rtl value inside nested Providers, with no rendered wrapper or added attributes.
- Inspect the final semantic subtree for matching native dir and language and test text, punctuation, focus order, logical start and end, and assistive-technology interpretation.
- Exercise direction-aware Atom components in LTR and RTL, including horizontal navigation, tree expansion, popup placement, swipe or drag gestures, and any deliberate local dir override.

## Related guidance

- `menu`
- `popover`
- `tree-grid`
