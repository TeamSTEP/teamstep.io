# Team STEP — teamstep.io

Astro landing page for Team STEP. Spec and wireframe live in `plans/`.

## Coding Style

Keep the code clean and easy to read. Self-documenting code do not require comments. Only write comments for short annotations that genuinely cannot be expressed via code.

Use variable functions instead of the `function` call.

For example:

```typescript
// Okay
const func = () => {
    return 'value';
}

// Not okay
function() {
    return 'value';
}
```

## Astro

This is **not** a Next.js app. Before changing routing, content collections, adapters, or islands, read the relevant guide under https://docs.astro.build (and local notes in node_modules if present).

Useful entry points:

- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Framework components / islands](https://docs.astro.build/en/guides/framework-components/)
- [Vercel adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/)

## Design system

Prefer `@teamstep/design-system` exports over one-off UI. Local co-development: see `docs/design-system-workflow.md` (`pnpm ds:use-local`, `pnpm dev:all`).
