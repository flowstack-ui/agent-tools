# QrCode agent guide

## Purpose

Present a locally generated QR graphic with safe scanning defaults, logo composition and consistent download actions.

## Use when

- Sharing text or a destination with another device through a QR graphic.

## Choose something else when

- The application needs camera scanning, expiry or authentication. Use Application services; QrCode only presents the accepted value.

## Required composition

- Use Root and named Frame, optionally Pattern, Overlay and DownloadTrigger. Compose a normal Link or Clipboard alternative. Use RootProvider with useQrCode for external controls.

## Rules

- **MUST:** Use the shared token-only radius contract on QrCode.DownloadTrigger only; it does not change QR matrix or logo geometry.
- **MUST:** Keep the code square and retain its four-module quiet zone. Frame/layout owns parent constraints; Root size controls the QR, DownloadTrigger size controls the Button and exportSize controls image output.
- **MUST:** Preserve the light scanning backing in dark mode. Custom fill, background, inversion, small sizes and logos require independent decoding and physical scan checks.
- **MUST:** Handle export errors. Supply exportSrc for arbitrary overlay content or explicitly omit its export. Never assume CORS assets or browser saving will succeed.
- **MUST:** Keep application session states and translations outside QrCode. Do not replace Atom encoding or DownloadTrigger lifecycle with application handlers.
- **MUST:** Use Root responsive size and PropsProvider for graphic defaults. asChild must retain compatible SVG/path hosts and forwarded refs. unstyled affects graphic recipes, not the independently styled DownloadTrigger.
- **MUST:** Use DownloadTrigger shared Button recipes or iconOnly with aria-label. ButtonGroup defaults apply; action size and exportSize are independent. Author overlay size/padding/radius variables on Root or Overlay, within the one-third containment limit.

## Common mistakes

- **Avoid:** Using inherited accent/appearance paint or rounding the QR pattern itself. **Instead:** Keep the scanning media pair independent; apply theme radius only to logo backing or surrounding Surface.

## Validation checklist

- Verify named square graphics, all sizes, narrow and RTL geometry, light/dark paint, one-third-width square logo containment, inherited text contrast, exact independent decoding and downloaded bytes.

## Related guidance

- `download-trigger`
- `frame`
- `image`
- `link`
- `spinner`
