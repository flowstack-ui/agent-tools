# TableOfContents agent guide

## Purpose

Provide same-document navigation with one current location, scoped target tracking and interruptible navigation.

## Use when

- A document needs a live outline of explicitly identified sections.

## Choose something else when

- Only static links are needed. Use Link and List.
- Items navigate routes or switch panels. Use NavList or Tabs.

## Required composition

- Compose Root > Nav > Title and List > Item > Link. Place optional Indicator beside List, never directly inside ul. RootProvider accepts useTableOfContents for shared state.

## Rules

- **MUST:** Supply stable unique target IDs and heading depths. Keep labels, localization, extraction and page layout application-owned.
- **MUST:** Keep links native; use one aria-current location, not tab or menu semantics. Native document mode uses browser hash navigation; managed mode scopes scrolling and has explicit history policy.
- **MUST:** Name every Nav and identify its content scroll root separately from its optional rail viewport. Rail scrolling must not move ancestors.
- **MUST:** Controlled activeId remains authoritative. visibleIds are visibility metadata, not multiple current locations. Use refresh after externally owned layout changes.

## Common mistakes

- **Avoid:** Adding another observer in a styled wrapper or using page-specific offsets in the primitive. **Instead:** Use the public controller and host-owned scroll margins/padding.

## Validation checklist

- Verify modifier clicks, immediate current feedback, interruption, long/final sections, scoped roots, focus, history, dynamic targets, SSR, refs and cleanup.

## Related guidance

- `nav-list`
- `link`
- `list`
- `scroll-area`
