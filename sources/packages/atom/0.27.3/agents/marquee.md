# Marquee agent guide

## Purpose

Coordinate measured continuous content motion, safe visual replicas and independent pause reasons.

## Use when

- Passive content needs optional continuous motion with an accessible stationary alternative.

## Choose something else when

- Users select one active slide. Use Carousel.
- Content cannot be represented by pure noninteractive replicas. Use Native stationary layout or scrolling.

## Required composition

- Compose Root or useMarquee with RootProvider, Viewport, Content and Item; author a persistent pause control.
- Content children render once; renderReplica explicitly supplies separate pure, ID-free, noninteractive artwork.

## Rules

- **MUST:** Update coverage immediately and synchronize new replicas to the original track phase. Travel-distance changes restart the current cycle while preserving completed iterations and requested pause. Keep descendant animations independent.
- **MUST:** Never repeat forms, stateful widgets, portals, effects, IDs, links or autoplay media in renderReplica. Inert is not a React purity sandbox.
- **MUST:** Include a persistent accessible pause control. Synchronize track phases after pause/resume commits; pausing must retain spacing without overlap or gaps. Respect data-static for focus, reduced motion, completion and unavailable measurements; expose all originals with stationary native overflow.
- **MUST:** The styled layer owns keyframes and intrinsic track layout using Atom geometry outputs. Generation changes restart CSS animation without remounting original content.
- **MUST:** Provide a meaningful region name for a landmark and keep live announcements off.

## Common mistakes

- **Avoid:** Blindly copying original React children or resuming on mouse leave. **Instead:** Use explicit passive replicas and the controller's independent pause reasons.

## Validation checklist

- Check normal-motion speed, finite callbacks, restart, all directions/RTL, focus-to-static access, reduced motion, invalid replicas, resize, bounded copies and cleanup.

## Related guidance

- `carousel`
- `direction`
- `button`
