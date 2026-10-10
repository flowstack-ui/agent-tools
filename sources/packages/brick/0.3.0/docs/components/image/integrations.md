# Image delivery and framework composition

Brick owns presentation; the application owns assets, optimization, caching,
remote-source policy and critical-image priority. Next is optional and is never
imported by the Brick runtime.

## Native delivery and picture

Use genuinely different source candidates. Root owns canonical source metadata;
Content owns sizes, intrinsic dimensions and browser scheduling hints.

```tsx
<Image.Root src="/studio-768.webp" srcSet="/studio-384.webp 384w, /studio-768.webp 768w">
  <Image.Content alt="Sunlit studio" width={768} height={512}
    sizes="(max-width: 48rem) 100vw, 48rem" loading="lazy" decoding="async" />
  <Image.Fallback>Studio unavailable</Image.Fallback>
</Image.Root>
```

For a measured critical image use eager loading and deliberate high fetch
priority; neither Brick nor Next automatically identifies LCP policy. Reserve
geometry and measure network behavior with cold and warm caches. Localhost
measurements do not predict production speed percentages. CDN URLs work with
the same native contract; configure transformations and cache policy upstream.

```tsx
<Image.Root asChild src="/studio-768.webp" ratio={3 / 2}>
  <picture>
    <source media="(max-width: 40rem)" srcSet="/studio-384.webp" />
    <Image.Content alt="Sunlit studio" width={768} height={512} />
    <Image.Fallback asChild><span>Studio unavailable</span></Image.Fallback>
  </picture>
</Image.Root>
```

Keep Content directly under Root for ratio/fill. A nested picture wrapper does
not receive Image geometry; use Root-as-picture instead. Only one Content host
per family is supported. Physical focal coordinates do not mirror with RTL.

## Next getImageProps

The helper generates optimized native props. Map its sources to Root and retain
the remaining native attributes on Content. Do not use `placeholder="blur"`
with this helper: it does not own placeholder-removal state.

```tsx
import { getImageProps } from "next/image";
import { ImageRoot, ImageContent, ImageFallback } from "@flowstack-ui/brick/image";

const { props: { src, srcSet, ...native } } = getImageProps({
  src: "/studio.webp", alt: "Sunlit studio", width: 768, height: 512,
  sizes: "(max-width: 48rem) 100vw, 48rem", loading: "eager",
});
<ImageRoot src={src} srcSet={srcSet} ratio={3 / 2}>
  <ImageContent {...native} />
  <ImageFallback>Studio unavailable</ImageFallback>
</ImageRoot>
```

## Next Image asChild

In a client module, compose the framework component through Content. Root carries
the original source for initial state; Next generates the actual img URLs. Keep
Next's srcSet/sizes and forward the real img ref and native handlers. Avoid
conflicting geometry owners; explicit intrinsic width/height with a Brick ratio
is the simplest composition, as shown here.

```tsx
<Image.Root src="/studio.webp" ratio={3 / 2}>
  <Image.Content asChild alt="Sunlit studio" onLoad={onNativeLoad} ref={imageRef}>
    <NextImage src="/studio.webp" alt="Sunlit studio" width={768} height={512}
      sizes="(max-width: 48rem) 100vw, 48rem" loading="eager" />
  </Image.Content>
  <Image.Fallback>Studio unavailable</Image.Fallback>
</Image.Root>
```

### Next fill

Next `fill` absolutely positions the native image. It requires a positioned,
definitely sized parent; Brick `fill` only propagates the available block size.
These props have different responsibilities and can be composed:

```tsx
<Frame blockSize="240px" maxInlineSize="600px">
  <Image.Root src="/studio.webp" fill style={{ position: "relative" }}>
    <Image.Content asChild alt="Sunlit studio">
      <NextImage src="/studio.webp" alt="Sunlit studio" fill
        sizes="(max-width: 600px) 100vw, 600px" />
    </Image.Content>
    <Image.Fallback>Studio unavailable</Image.Fallback>
  </Image.Root>
</Frame>
```

The positioned-root style is an explicit framework containing-block requirement,
not a new Image sizing recipe. Do not pass competing intrinsic width/height to
Next when using its fill mode. Match `sizes` to the actual application layout;
the example assumes full viewport width below its maximum. Verify both narrow
and wide layouts in your production application.

Configure allowed remote sources and cache policy in the application. The
[Next Image API](https://nextjs.org/docs/app/api-reference/components/image)
documents framework behavior.
