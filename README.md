# TV Shows Explorer

SPA on React 19 + TypeScript, built with [Vite+](https://viteplus.dev) (Vite, Oxlint, Oxfmt, Vitest), Tailwind CSS v4 and [shadcn/ui](https://ui.shadcn.com) (Base UI).

## Requirements

- Node.js `^24.11` or `>=26`
- pnpm

## Scripts

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm dev`       | Start dev server                    |
| `pnpm build`     | Type-check and build for production |
| `pnpm preview`   | Preview production build            |
| `pnpm check`     | Format check + lint + type check    |
| `pnpm lint`      | Lint (type-aware Oxlint)            |
| `pnpm lint:fix`  | Lint with autofix                   |
| `pnpm fmt`       | Format code (Oxfmt)                 |
| `pnpm typecheck` | TypeScript project build check      |

## Adding UI components

```sh
pnpm dlx shadcn@latest add <component>
```
