# Carousel agent guide

## Purpose

Coordinate one-active-slide content rotation, optional automatic playback, direct selection, native swipe scrolling, and accessible inactive-slide semantics.

## Use when

- A small sequence of authored content should occupy one viewport and support previous, next, direct, touch, or optional timed selection.

## Choose something else when

- All items should remain visible, named document panels are selected, or a row reveals actions. Use ordinary layout or scrolling, Tabs, or SwipeableItem.

## Required composition

- Compose Root, Viewport, Track, and uniquely valued Slide parts; add Previous, Next, Picker with PickerItem, and RotationControl only when the experience needs those controls.

## Rules

- **MUST:** Provide value or defaultValue matching one Slide and give every Slide a short unique accessible label.
- **MUST:** When automatic rotation is enabled, include visible RotationControl, Previous, and Next controls; Picker controls remain optional.
- **SHOULD:** Keep grouped PickerItem controls to a small set because each native picker button is a tab stop.
- **MUST:** Supply viewport overflow, one-slide track geometry, and scroll snap in the styled layer; do not replace Atom selection, pause, or inactive semantics.
- **MUST:** Keep styled viewport motion instant until Root exposes data-initialized, then enable the ordinary motion recipe so SSR hydration cannot start a competing native snap animation.
- **MUST:** Style carousel-loop-boundary spacers and data-loop-position Slides as one-viewport boundary positions so Next and Previous preserve their requested direction; never clone authored slide content.
- **MUST:** Do not place essential content only in a slide that users cannot reach without waiting for automatic rotation.

## Common mistakes

- **Avoid:** Using Tabs for decorative dots, enabling autoplay without a stop control, reusing SwipeableItem, or adding custom timers and aria-hidden logic around Carousel. **Instead:** Use Carousel's optional grouped Picker, complete autoplay controls, and Atom-owned state, pause, scrolling, and inactive-slide contract.

## Validation checklist

- Verify controlled and uncontrolled selection, Previous/Next boundaries, last-to-first forward motion, first-to-last backward motion, picker selection, native touch scrolling, LTR and RTL, and external value changes.
- Verify autoplay timing, focus stop without automatic restart, temporary hover and document-visibility pause, visible rotation control, live-region mode, inactive inert state, labels, and reduced-motion handling in the styled layer.

## Related guidance

- `tabs`
- `swipeable-item`
- `pagination`
- `scroll-area`
