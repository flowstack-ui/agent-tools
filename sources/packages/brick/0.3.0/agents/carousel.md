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

- **MUST:** Use the shared token-only radius contract only on the public parts listed in docs/guides/radius.md. Omit it to retain the owner default; do not combine it with legacy corner shape or forward it to native elements. Core names and semantic roles are distinct; popup boundaries are independent of their triggers.
- **MUST:** Treat arrows and picker dots as optional authored controls. Automatic dots represent reachable pages; explicit PickerItem values resolve slide anchors. Neither is Tabs.
- **MUST:** Never enable automatic rotation without a visible RotationControl and direct Previous and Next controls.
- **MUST:** Keep picker treatment independent from arrow visibility; use Picker variant bare for dots without a capsule and Navigation visibility interaction only when arrows remain discoverable through focus, pointer, and touch.
- **SHOULD:** Use a compact xs ghost RotationControl when the required stop mechanism should remain visually quiet; never remove it while automatic rotation can run.
- **MUST:** Preserve requested direction at loop boundaries and never clone authored slide content, IDs, controls, or form fields.
- **MUST:** Keep viewport motion instant until Atom exposes data-initialized; Brick's shipped Carousel CSS already enables smooth motion only after that signal.
- **SHOULD:** Give campaign slides stable responsive geometry so changing the active slide does not move surrounding page content.
- **MUST:** Treat fill as internal size propagation, not a viewport-height policy; the application or Block must establish the available parent height.
- **MUST:** Name the parent layout or section that establishes the definite block size before enabling fill; retain a real wrapper when that wrapper is the sizing box.
- **MUST:** Treat radius as Viewport and overlay-focus geometry only; it must not alter selection, scrolling, control placement, or slide anatomy.
- **MUST:** When controls overlay slides, reserve application-owned content safe areas so arrows, rotation controls, and picker targets never obscure authored text or actions.
- **SHOULD:** Prioritize only initially visible campaign media and defer non-current media when the image delivery layer supports it.
- **MUST:** Load styles.css or core.css plus carousel.css.
- **MUST:** Derive automatic indicators and progress from pageSnapPoints, not raw item count. Several visible items can share one snap page.
- **MUST:** Visible peer slides remain interactive; do not add application inert or aria-hidden rules based solely on the selected value.
- **MUST:** Never clone authored slides. Short-content loops may settle instantly when smooth cyclic placement would require duplication.
- **MUST:** Use value/defaultValue or page/defaultPage exclusively. Keep stable Slide values and supply index for server-known page visibility.
- **MUST:** Use the shared action variants and tones on Previous, Next and RotationControl. Root visual defaults and local control overrides must not compete.
- **MUST:** Use spacing and padding for slide geometry, autoSize for authored dimensions, and a definite viewport height for vertical mode. Native scroll easing is browser owned.
- **MUST:** Use unstyled with asChild when composing text Button actions; otherwise controls use the shared square IconButton recipe.

## Common mistakes

- **Avoid:** Using Tabs for picker dots or hiding the only way to stop autoplay. **Instead:** Use PickerItem buttons and render RotationControl whenever autoplay can run.
- **Avoid:** Putting unrelated proof rails or page sections inside every hero slide. **Instead:** Rotate only the peer campaign content and keep stable page evidence outside the Carousel.
- **Avoid:** Rotating campaign copy while leaving campaign-specific artwork behind as one unrelated background. **Instead:** Decide whether media is invariant or part of the campaign; when it communicates that campaign, place the complete Surface inside Slide.
- **Avoid:** Repeating block-size rules across Carousel Viewport, Track, and Slide. **Instead:** Establish the parent height once and opt into Root fill; size only the authored content inside each Slide separately.

## Validation checklist

- Check optional-control compositions, first and last boundaries in both directions, interaction-only arrow discovery, independent picker treatment, native horizontal touch scrolling, focus pause, hover pause, reduced motion, RTL, and screen-reader naming.
- Confirm fully offscreen slides are unavailable to focus and assistive technology while visible peer slides remain interactive. Verify the overlay-safe Viewport focus indicator, complete control focus rings at rounded edges, unobscured content, coordinated media/copy changes, and no page-level layout shift.

## Related guidance

- `button`
- `icon-button`
- `image`
- `surface`
- `stack`
- `grid`
- `text`
- `tabs`
