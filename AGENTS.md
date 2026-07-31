# AGENTS.md

Guidance for AI agents (and humans) working in this repository. Read this before making changes.

## Project Overview

Production-ready React 19 template: Vite 7, TypeScript (strict), Tailwind CSS v4, shadcn/ui, TanStack Query v5, Zustand, Axios, React Router v7, React Hook Form + Zod, Jest + RTL, ESLint 9 + Prettier + SonarJS, Husky + CommitLint. Package manager: **pnpm**.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Dev server on `http://localhost:3000` |
| `pnpm build` | `tsc -b` type-check + production build — must pass before finishing |
| `pnpm lint` | ESLint — must pass with 0 errors |
| `pnpm lint:fix` | Auto-fix lint issues |
| `pnpm format` | Prettier over `src/**` — run after editing files |
| `pnpm test` / `pnpm test:ci` | Jest (CI mode passes with no tests) |

Always run `pnpm format && pnpm lint && pnpm build` after code changes.

## Architecture & Dependency Rules

Layers: `App.tsx` → `pages/` → `modules/` → `shared/`. Imports only flow downward.

- **`src/pages/`** — pure composition; no business logic. One folder per route group.
- **`src/modules/<feature>/`** — self-contained business features with a fixed internal layout: `components/`, `hooks/` (TanStack Query), `services/` (API calls via `apiClient`), `mappers/` (DTO ↔ domain), `schemas/` (Zod), `types/` (`*.types.ts` domain, `*.dto.ts` API). **Modules never import from other modules** — only from `@/shared`.
- **`src/shared/`** — app-wide resources: `components/` (`ui/`, `layouts/`, `error/`), `stores/` (Zustand), `hooks/`, `lib/api/` (axios client + queryClient), `config/` (env, constants), `types/`, `utils/`, `assets/styles/`.
- **`src/routes/index.tsx`** — all route definitions; pages are wired here inside `MainLayout`.

Import via the `@/` alias (`@/shared`, `@/modules/users`, …) mapped to `src/` in `tsconfig.json`, `tsconfig.app.json` and `vite.config.ts`. Keep the three in sync if it ever changes.

## Conventions

- Every folder has an `index.ts` barrel; re-export new files there. Barrels use explicit extensions (`export { Button } from './button.tsx';` — `allowImportingTsExtensions` is on).
- Naming: components `PascalCase.tsx`; hooks `useX.ts`; services `x.service.ts`; mappers `x.mapper.ts`; schemas `x.schema.ts`; types `x.types.ts` / `x.dto.ts`; stores `useXStore.ts`. shadcn/ui primitives are the exception: lowercase (`button.tsx`).
- Prettier: single quotes, semicolons, 2 spaces, trailing commas (see `.prettierrc`). Don't hand-format — run `pnpm format`.
- Commits follow Conventional Commits (enforced by commitlint + Husky).
- Don't add dependencies without a clear need; prefer what's already installed.

## UI Components (shadcn/ui)

shadcn/ui is initialized (style `new-york`, base color `neutral`, CSS variables). Config: `components.json` — aliases point into this template's structure:

- components → `@/shared/components`, ui → `@/shared/components/ui`
- utils → `@/shared/utils` (`cn` = `clsx` + `tailwind-merge`)
- hooks → `@/shared/hooks`, lib → `@/shared/lib`

Installed primitives: `button`, `card`, `input`, `textarea`, `label`, `badge`, `skeleton`, `separator`, `dialog`, `dropdown-menu`, `select`, `checkbox`, `avatar`, `table`, `form`, `sonner` (toast), plus template extras `Spinner` and `Loading`. All re-exported from `src/shared/components/ui/index.ts` (and thus from `@/shared/components` and `@/shared`).

**Adding a new shadcn component:**

```bash
pnpm dlx shadcn@latest add <component> --yes --overwrite
```

Then: 1) re-export it from `src/shared/components/ui/index.ts`, 2) run `pnpm format`, 3) verify with `pnpm lint && pnpm build`.

**Theming:** design tokens live in `src/shared/assets/styles/index.css` (`:root` + `.dark` CSS variables mapped in `@theme inline`). Always style with semantic tokens — `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `bg-accent` / `text-accent-foreground`, `bg-primary` / `text-primary-foreground`, `border-border`, `text-destructive`, `bg-muted` — never raw `gray-*`/`blue-*`/`white` classes, so dark mode keeps working.

**Dark mode:** class strategy (`.dark` on `<html>`), driven by `useAppStore` (`theme`, `toggleTheme`) and applied in `src/App.tsx`. Persisted to localStorage.

**Template-specific extensions:**

- `Button` accepts `isLoading` (spinner + disabled), `leftIcon`, `rightIcon` in addition to the shadcn API (`variant`, `size`, `asChild`).
- Toasts: `<Toaster />` is mounted in `App.tsx`; call `toast.success(...)` / `toast.error(...)` from `sonner` anywhere.
- Prefer `lucide-react` for new icons (shadcn standard); `react-icons` exists for legacy usage.

## Forms

React Hook Form + Zod via `@hookform/resolvers/zod`. Schemas live in the module's `schemas/` folder. Two accepted patterns (see `src/modules/users/components/UserForm.tsx`):

1. Simple: `Label` + `Input` with `aria-invalid={!!errors.x}` + a `<span className="text-sm text-destructive">` for the message.
2. Full: shadcn `Form`/`FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage` wrappers around `useForm`.

## Data Fetching & State

- Server state: TanStack Query. Services call `apiClient` (`@/shared/lib/api`) and map DTO → domain with the module mapper; hooks wrap services in `useQuery`/`useMutation` and invalidate via `queryClient`. Query keys are centralized in `QUERY_KEYS` (`@/shared/config/constants.ts`).
- Client state: Zustand stores in `src/shared/stores/` (`useAppStore` — theme/sidebar, persisted; `useAuthStore` — auth).
- Env vars: defined in `.env.example` → copy to `.env`; accessed only through `envConfig` (`@/shared/config/env.config.ts`).

## Testing

Jest 30 + React Testing Library (`src/setupTests.ts`, `jest.setup.ts`, `identity-obj-proxy` for assets). Add tests when the surrounding code has them; keep `pnpm test:ci` green.

## Definition of Done

1. `pnpm format` applied, `pnpm lint` 0 errors, `pnpm build` passes, `pnpm test:ci` green.
2. New/changed exports wired through the folder barrels.
3. New UI uses shadcn primitives and semantic theme tokens (dark mode safe).
4. If you change structure, commands, or conventions, update this file and `README.md`.
