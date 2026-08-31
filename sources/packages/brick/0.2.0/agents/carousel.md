# Carousel agent guide

## Purpose

Present one item or campaign at a time with optional navigation, picker dots, touch scrolling, and user-controlled rotation.

## Use when

- Several peer items benefit from sharing one bounded visual region.
- A campaign hero needs multiple authored messages without placing them all in the initial viewport.

## Choose something else when

- Every item must be visible for comparison or comprehension. Use Grid, Stack, List, or Tabs.
- The content is only decorative image rotation. Use a non-interactive media treatment that respects reduced motion.

## Required composition

- Compose Root, Viewport, Track, and one Slide per unique value; add Navigation, Controls, Previous, Next, Picker, PickerItem, and RotationControl only when the product needs them.
- In a React Server Component, import the subpath as a module namespace with import * as Carousel from '@flowstack-ui/brick/carousel'; use the frozen Carousel runtime object only inside client components.
- When automatic rotation is enabled, always render RotationControl, Previous, and Next so people can stop and navigate the sequence; place RotationControl before Viewport in DOM order.
- Build campaign-specific slide content from Brick layout, typography, action, and media components; Carousel does not own hero messaging or proof content.
- When artwork, scrim, and copy form one peer campaign, compose a complete Surface with Media, Scrim, and Content inside each Slide; keep genuinely invariant evidence or navigation outside the rotating sequence.
- When a parent already owns a stable block size, use Root fill to propagate it through Carousel's Viewport, Track, and Slides; continue sizing authored Surface, Content, and layout components explicitly.
- Match Root radius to the visible containing geometry; use radius=none when an edge-to-edge square Surface owns the campaign boundary.

## Rules

- **MUST:** Treat arrows and picker dots as optional authored controls; dots represent direct slide selection and are not Tabs.
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

## Common mistakes

- **Avoid:** Using Tabs for picker dots or hiding the only way to stop autoplay. **Instead:** Use PickerItem buttons and render RotationControl whenever autoplay can run.
- **Avoid:** Putting unrelated proof rails or page sections inside every hero slide. **Instead:** Rotate only the peer campaign content and keep stable page evidence outside the Carousel.
- **Avoid:** Rotating campaign copy while leaving campaign-specific artwork behind as one unrelated background. **Instead:** Decide whether media is invariant or part of the campaign; when it communicates that campaign, place the complete Surface inside Slide.
- **Avoid:** Repeating block-size rules across Carousel Viewport, Track, and Slide. **Instead:** Establish the parent height once and opt into Root fill; size only the authored content inside each Slide separately.

## Validation checklist

- Check optional-control compositions, first and last boundaries in both directions, interaction-only arrow discovery, independent picker treatment, native horizontal touch scrolling, focus pause, hover pause, reduced motion, RTL, and screen-reader naming.
- Confirm inactive slides are unavailable to focus and assistive technology, the overlay-safe Viewport focus indicator remains visible above slide media, control focus rings remain complete at rounded edges, overlay controls do not cover content, complete campaign media changes with its copy, and slide changes do not cause page-level layout shift.

## Related guidance

- `button`
- `icon-button`
- `image`
- `surface`
- `stack`
- `grid`
- `text`
- `tabs`
