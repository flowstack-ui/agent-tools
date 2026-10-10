# Carousel agent guide

## Purpose

Present measured carousel pages with accessible navigation, multiple visible items, optional autoplay and native scroll motion.

## Use when

- Peer content benefits from one or several visible slides with optional navigation, touch scrolling and mouse drag.

## Choose something else when

- Every item must be visible at once for comparison. Use Grid, Stack or List.

## Required composition

- Compose Root, Viewport, Track and uniquely valued Slide parts. Add the controls appropriate to the content.
- Use useCarousel and RootProvider for one externally accessible controller. Choose value-based or page-based control, not both.

## Rules

- **MUST:** When automatic rotation is enabled, include visible RotationControl, Previous, and Next controls; Picker controls remain optional.
- **SHOULD:** Keep grouped PickerItem controls to a small set because each native picker button is a tab stop.
- **MUST:** Keep styled viewport motion instant until Root exposes data-initialized, then enable the ordinary motion recipe so SSR hydration cannot start a competing native snap animation.
- **MUST:** Do not place essential content only in a slide that users cannot reach without waiting for automatic rotation.
- **MUST:** Derive automatic indicators and progress from pageSnapPoints, not raw item count. Several visible items can share one snap page.
- **MUST:** Visible peer slides remain interactive; do not add application inert or aria-hidden rules based solely on the selected value.
- **MUST:** Never clone authored slides. Short-content loops may settle instantly when smooth cyclic placement would require duplication.
- **MUST:** Use value/defaultValue or page/defaultPage exclusively. Keep stable Slide values and supply index for server-known page visibility.
- **MUST:** Custom viewport CSS disables scroll snapping during data-programmatic and data-dragging; slides apply the measured --atom-carousel-shift translation.

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
