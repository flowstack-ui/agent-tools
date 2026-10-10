# Colors candidate interchange

Theme can turn a reviewed Colors candidate into a normal editable Theme. This
is a file contract between two independent tools, not a package dependency.

## The three inputs

1. A serialized `flowstack.colors-candidate.v1` document whose generator
   result is accepted and whose explicit review is `accepted` or `edited`.
2. A `flowstack.colors-theme-scaffold.v1` mapping that contains the base Theme,
   selected project palette names, and optional semantic assignments.
3. The exact `theme-contract.json` from the installed Brick package.

Example mapping:

```json
{
  "$schema": "flowstack.colors-theme-scaffold.v1",
  "theme": {
    "$schema": "flowstack.theme.v1",
    "metadata": { "id": "acme", "name": "Acme" },
    "compatibility": { "brick": "^0.1.0" },
    "appearances": {
      "supported": ["light", "dark"],
      "default": "system"
    }
  },
  "palettes": {
    "neutral": "neutral-source",
    "brand": "primary-brand",
    "campaign": "campaign-source"
  },
  "semantics": {
    "neutral": "neutral",
    "accent": "brand",
    "focus": "brand"
  }
}
```

`palettes` maps the name wanted in the Theme to a candidate family ID. Every
selected light/dark value is preserved under
`palettes.colors.<name>.<appearance>`. This is where extra brand, campaign,
chart, or editorial colors can live even when Brick has no matching role.

`semantics` maps a UI job to one of those selected palette names:

- `neutral` requires a neutral family and fills Brick surface, border, and
  text families;
- `accent`, `danger`, `info`, `success`, and `warning` require interface
  families; and
- `focus` requires an interface family and maps its focus-ring role.

Theme reads the installed Brick contract and expands each selection to the
complete atomic family. Developers choose the family and job; they do not copy
Brick's token inventory or configure every hex line manually.

## Output and safety

Run:

```bash
flowstack-theme scaffold-colors ./colors.candidate.json \
  --mapping ./colors.theme-scaffold.json \
  --contract ./node_modules/@flowstack-ui/brick/dist/theme-contract.json \
  --out-dir ./theme
```

The command writes:

- `flowstack.theme.json`, the ordinary editable Theme definition; and
- `theme.scaffold.report.json`, the source-family, mapping, and count record.

The scaffold fails on unreviewed or rejected candidates, rejected selected
families, incompatible profiles, missing appearances or roles, unknown
contract families, and naming collisions. It does not declare accessibility
success. Compile the generated Theme against the same Brick contract; the
compiler remeasures every Brick-declared contrast pair in every appearance.
