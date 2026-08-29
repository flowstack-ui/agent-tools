# Imports

Use the main namespace import for convenient access to several primitives:

```tsx
import { Input, Dialog, MultiSelect } from "@flowstack-ui/atom";
```

Subpath imports are also public and stable:

```tsx
import { Input } from "@flowstack-ui/atom/input";
import { Dialog } from "@flowstack-ui/atom/dialog";
import { Link } from "@flowstack-ui/atom/link";
import { Clipboard } from "@flowstack-ui/atom/clipboard";
import { Carousel } from "@flowstack-ui/atom/carousel";
import { MultiSelect } from "@flowstack-ui/atom/multi-select";
```

Use the main package import when teaching component anatomy. Use subpaths when a
project wants explicit package boundaries per primitive or when a bundler policy
requires focused entrypoints.
