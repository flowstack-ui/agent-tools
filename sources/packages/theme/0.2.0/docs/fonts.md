# Fonts

Theme chooses semantic font-family values but does not download, bundle, or
preload font files. The application owns that work because frameworks have
different optimization, licensing, privacy, and first-paint behavior.

Record the expected integration in `requirements`:

```json
{
  "foundations": {
    "font": {
      "family": {
        "body": "var(--font-acme), ui-sans-serif, system-ui, sans-serif",
        "heading": "var(--font-acme-display), ui-sans-serif, system-ui, sans-serif"
      }
    }
  },
  "requirements": {
    "fonts": [
      { "family": "Acme Sans", "variable": "--font-acme", "source": "application" },
      { "family": "Acme Display", "variable": "--font-acme-display", "source": "application" }
    ]
  }
}
```

In Next.js, load the files with the project's supported `next/font` workflow
and place its generated variables on the same document boundary as
`data-flowstack-theme`. In Vite or another bundler, import licensed font CSS or
local `@font-face` declarations through the application entrypoint and expose
the declared variables there.

Always provide fallback families. Validate the production build with fonts
loaded, blocked, and slow; the manifest records requirements but cannot prove
that the application fulfilled them.

