# Image agent guide

## Purpose

Provide styled resilient media with Atom loading/fallback behavior, sizing recipes, and accessible image semantics.

## Use when

- A product image, brand asset, illustration, content image, or larger editorial/profile portrait needs Brick sizing, authored aspect ratio, fit, focal position, radius, loading, or fallback presentation.

## Choose something else when

- A person or entity needs a compact fixed-square identity token with explicit fallback content. Use Avatar.
- A framework optimizer provides a required measured optimization Brick does not expose. Use a documented Image adapter that preserves semantics and reports the capability gap.

## Required composition

- Compose Image.Content and optional Image.Fallback inside Image.Root; use Brick Stack or layout components around it rather than wrapper spans for alignment.
- In a React Server Component, import ImageRoot, ImageContent, and ImageFallback directly; the compound Image namespace is intended for client module composition.
- Keep source state on Image.Root, then pass intrinsic width and height plus native responsive delivery props such as srcSet, sizes, loading, decoding, and fetchPriority to Image.Content.

## Rules

- **MUST:** Use Brick Image for ordinary interface media; document any native or framework image fallback and the missing capability.
- **MUST:** Provide meaningful alt text, or alt="" for a decorative image.
- **MUST:** For a profile portrait, preserve the person's name as alt when the portrait communicates identity; use alt="" only when that specific portrait is intentionally decorative.
- **MUST:** Reserve intrinsic width and height or an authored parent aspect ratio so image arrival does not create layout shift.
- **MUST:** When a rendered slot changes materially by viewport or container, provide source candidates and an accurate sizes contract so the browser does not receive one oversized raster by default.
- **MUST:** Do not lazy-load a measured or strongly expected LCP image; keep it directly discoverable, load it eagerly, and use high fetch priority only for the small number of truly critical images.
- **MUST:** Use native lazy loading for ordinary deferred images; when an exact application proximity or intent boundary is required, let the application decide when to attach the source because loading=lazy remains a browser scheduling hint.
- **MUST:** Use explicit fill when Image must consume a parent-established block size, such as Surface.Media; retain fit and position for the intended crop.
- **MUST:** Name and preserve the parent sizing box when fill is used; Image propagates into available geometry but does not create that geometry.
- **MUST:** Load styles.css or core.css plus image.css.
- **MUST:** Use direct named Image parts across a React Server Component boundary instead of wrapping the complete consumer in use client.

## Common mistakes

- **Avoid:** Using next/image automatically, forcing a larger authored profile portrait into Avatar's compact square recipe, wrapping Image in spans for ordinary alignment, applying one blanket alt decision to all portraits, sending one desktop raster to every slot, or lazy-loading the likely LCP image. **Instead:** Start with Brick Image for larger authored media, use Avatar for compact identity, decide alt from each image's context, reserve geometry, provide responsive candidates and accurate sizes, keep critical media discoverable, and adapt only for a measured missing optimizer capability.

## Validation checklist

- Check loaded, loading, error, cached, narrow and wide source selection, transferred bytes, priority, parent-fill geometry, crop, layout shift, contextual alt text—including identity-bearing and intentionally decorative portraits—contrast of fallback content, and RTL where relevant.
- For delivery-sensitive media, verify cold, warm, constrained-network, blocked-image, first-viewport, and post-proximity behavior; keep localhost timing separate from production or field evidence.
- Confirm CSS and any adapter report are complete.

## Related guidance

- `aspect-ratio`
- `stack`
- `avatar`
- `surface`
