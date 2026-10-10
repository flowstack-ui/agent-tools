# QrCode agent guide

## Purpose

Encode text locally into a named SVG QR graphic with controlled state and explicit image export.

## Use when

- Text or a link needs a locally generated scannable graphic.

## Choose something else when

- Scanning, session expiry or authentication is required. Use Application services and camera/scanner integration.

## Required composition

- Compose Root, named Frame and Pattern; optional Overlay and DownloadTrigger remain under the same controller. RootProvider accepts useQrCode. Provide an ordinary link or text alternative.

## Rules

- **MUST:** Preserve compatible asChild hosts, scoped id/ids and React ref cleanup. Frame resolves to svg and Pattern to path. useQrCodeDownload supplies the QR producer to the existing download owner, not a second file-delivery lifecycle.
- **MUST:** Preserve the accepted string; encoding does not validate, fetch or encrypt it. Do not expose secrets through generated labels or logging.
- **MUST:** Keep the four-module quiet zone and verify actual decoding after changing size, colors, inversion or logos. ECC percentages do not guarantee safe logo coverage.
- **MUST:** Use the QR DownloadTrigger for lazy snapshot export. Unsupported overlays require exportSrc or explicit includeOverlay=false. Handle onDownloadError; initiated is not saved.
- **MUST:** Use result/error from the public controller; do not retain a stale code when encoding fails. Loading, expired and scanned status are application-owned.

## Common mistakes

- **Avoid:** Using the QR as the only way to access content or assuming arbitrary HTML logos export. **Instead:** Supply an accessible alternative and a supported image/SVG or explicit exportSrc.

## Validation checklist

- Verify exact decoding, SSR, controlled refusal, errors, refs, all encoding options, independent exports, CORS and cancellation.

## Related guidance

- `download-trigger`
- `clipboard`
- `image`
