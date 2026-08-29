# Installation

Install Brick as the application UI package and Theme as development-only
build tooling:

```bash
npm install @flowstack-ui/brick
npm install --save-dev @flowstack-ui/theme
```

Theme `0.1` requires a Brick package whose exported theme contract has
`contractVersion: 2` or newer. Compile a JSON definition against the installed
artifact:

```bash
npx flowstack-theme compile ./theme/app.theme.json \
  --contract ./node_modules/@flowstack-ui/brick/dist/theme-contract.json \
  --out-dir ./src/theme/generated
```

Import Brick CSS and the generated Theme CSS once at the application root.
Brick must load first so the `flowstack.theme` cascade layer can override its
defaults and still precede Brick foundations:

```ts
import "@flowstack-ui/brick/styles.css";
import "./theme/generated/theme.css";
```

Activate the compiled theme on the document or a subtree:

```html
<html data-flowstack-theme="acme">
```

Only the generated CSS is needed in the browser. Keep the compiler in
`devDependencies`; do not import it from client or server rendering code.

For deterministic builds, run compilation in a checked build step and either
commit the generated artifacts or generate them in CI. Do not mix both models
without a drift check.

