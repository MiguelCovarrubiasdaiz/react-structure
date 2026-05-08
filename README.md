# React Structure

> A production-ready, modular React boilerplate designed to scale fast without spending hours configuring linters, hooks, and tooling.

Stop reinventing the wheel every time you start a new React project. This boilerplate gives you a battle-tested folder structure, pre-configured developer tooling, and example modules so you can jump straight into building features.

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | TailwindCSS 4 |
| **Data Fetching** | TanStack Query v5 |
| **State Management** | Zustand |
| **HTTP Client** | Axios |
| **Routing** | React Router v7 |
| **Validation** | Zod |
| **Forms** | React Hook Form + @hookform/resolvers |
| **Testing** | Jest 30 + React Testing Library |
| **Linting** | ESLint 9 + Prettier + SonarJS |
| **Git Hooks** | Husky + CommitLint (Conventional Commits) |
| **Package Manager** | pnpm |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/react-structure.git my-app
cd my-app

# Install dependencies
pnpm install

# Start the development server (http://localhost:3000)
pnpm dev
```

> **Prefer npm or yarn?** Delete `pnpm-lock.yaml` and run `npm install` or `yarn install` instead. Everything works the same.

## Project Structure

```
src/
├── shared/                      # App-wide shared resources
│   ├── assets/                  # Static assets
│   │   ├── styles/
│   │   │   └── index.css        # Global styles + Tailwind
│   │   └── react.svg
│   │
│   ├── components/              # Global reusable components
│   │   ├── ui/                  # Primitive UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── Loading.tsx
│   │   │
│   │   ├── layouts/             # Application layouts
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   └── error/               # Error handling components
│   │       └── ErrorBoundary.tsx
│   │
│   ├── config/                  # Configuration and constants
│   │   ├── env.config.ts        # Environment variables
│   │   └── constants.ts         # APP_NAME, ROUTES, API_ENDPOINTS
│   │
│   ├── hooks/                   # Global reusable hooks
│   │
│   ├── lib/                     # Technical infrastructure
│   │   └── api/
│   │       ├── axios.ts         # Configured HTTP client
│   │       └── queryClient.ts   # TanStack Query configuration
│   │
│   ├── stores/                  # Global state (Zustand)
│   │   ├── useAppStore.ts       # Theme, sidebar, UI config
│   │   └── useAuthStore.ts      # Authentication
│   │
│   ├── types/                   # Shared TypeScript types
│   │   ├── api.types.ts         # ApiResponse, PaginatedResponse
│   │   └── common.types.ts      # Status, generic types
│   │
│   ├── utils/                   # Utility functions
│   │   ├── cn.ts                # Classnames helper
│   │   └── formatters.ts        # Date, currency formatting
│   │
│   └── index.ts                 # Barrel export for all shared
│
├── modules/                     # Self-contained business features
│   ├── users/                   # Example module
│   │   ├── components/          # Module-specific UI
│   │   ├── hooks/               # Data logic (queries, mutations)
│   │   ├── mappers/             # DTO <-> Domain transformation
│   │   ├── schemas/             # Zod validations
│   │   ├── services/            # API calls
│   │   └── types/               # Domain types + DTOs
│   │
│   └── todos/                   # Another example module
│       └── ...                  # Same structure as users
│
├── pages/                       # Page composition layer
│   ├── home/
│   │   └── HomePage.tsx
│   ├── users/
│   │   ├── UsersPage.tsx        # /users (list)
│   │   ├── UserCreatePage.tsx   # /users/create
│   │   ├── UserShowPage.tsx     # /users/:id
│   │   └── UserEditPage.tsx     # /users/:id/edit
│   └── todos/
│       └── ...                  # Same pattern as users
│
├── routes/
│   └── index.tsx                # React Router configuration
│
├── App.tsx                      # Root component
└── main.tsx                     # Entry point
```

## Architecture

### How It Works

The architecture follows a clear layered approach with strict dependency rules:

```
┌──────────────────────────────────────────────────────────────┐
│                          App.tsx                              │
│   (QueryClientProvider + ErrorBoundary + MainLayout)         │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                          Pages                                │
│   Composition only — imports from modules and shared          │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                         Modules                               │
│   ┌──────────────────────────────────────────────────────┐   │
│   │ Components ──► Hooks ──► Services ──► Mappers ──► API│   │
│   │                                  DTO <──> Domain     │   │
│   └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                          Shared                               │
│   Components, Stores, Utils, Config, API, Types, Assets       │
└──────────────────────────────────────────────────────────────┘
```

### Shared (`src/shared/`)

App-wide resources that any module or page can use. Everything is exported from a single barrel:

```tsx
import {
  Button, Card, Loading, MainLayout, ErrorBoundary,
  useAppStore, useAuthStore,
  cn, formatDate, formatCurrency,
  APP_NAME, ROUTES, API_ENDPOINTS,
  apiClient, queryClient,
} from '@/shared';
```

### Modules (`src/modules/`)

Each module is **self-contained** and represents a business feature. Modules never import from other modules — only from `@/shared`.

```
modules/users/
├── components/     # Module-specific UI
├── hooks/          # Data logic (queries, mutations)
├── mappers/        # DTO <-> Domain transformation
├── schemas/        # Zod validations + form types
├── services/       # API calls
└── types/
    ├── user.types.ts   # Domain model (User, CreateUser, UpdateUser)
    └── user.dto.ts     # API DTOs (UserDTO, CreateUserDTO, UpdateUserDTO)
```

```tsx
import { UserList, useUsers, userService, userMapper } from '@/modules/users';
```

#### Mappers

Mappers transform data between API DTOs and domain models, keeping your components decoupled from the API shape:

```tsx
// mappers/user.mapper.ts
export const userMapper = {
  toDomain: (dto: UserDTO): User => ({
    id: dto.id,
    name: dto.name,
    email: dto.email,
    createdAt: new Date(dto.created_at),
  }),
  toCreateDTO: (data: CreateUser): CreateUserDTO => ({
    name: data.name,
    email: data.email,
  }),
};
```

### Pages (`src/pages/`)

Pure **composition** components. Pages wire together modules and shared components but contain no business logic:

```tsx
import { UserList } from '@/modules/users';

export function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <UserList />
    </div>
  );
}
```

## Creating a New Module

```bash
mkdir -p src/modules/products/{components,hooks,mappers,schemas,services,types}
```

Then create the standard files:

```tsx
// types/product.types.ts — Domain model
export interface Product {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
}

export interface CreateProduct {
  name: string;
  price: number;
}

// types/product.dto.ts — API DTOs
export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  created_at: string;
}

export interface CreateProductDTO {
  name: string;
  price: number;
}

// mappers/product.mapper.ts
import type { Product, CreateProduct } from '../types/product.types';
import type { ProductDTO, CreateProductDTO } from '../types/product.dto';

export const productMapper = {
  toDomain: (dto: ProductDTO): Product => ({
    id: dto.id,
    name: dto.name,
    price: dto.price,
    createdAt: new Date(dto.created_at),
  }),
  toCreateDTO: (data: CreateProduct): CreateProductDTO => ({
    name: data.name,
    price: data.price,
  }),
};

// schemas/product.schema.ts
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Invalid price'),
});

export type ProductFormData = z.infer<typeof productSchema>;

// services/product.service.ts
import { apiClient } from '@/shared';
import { productMapper } from '../mappers';
import type { Product } from '../types';
import type { ProductDTO } from '../types/product.dto';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await apiClient.get<ProductDTO[]>('/products');
    return data.map(productMapper.toDomain);
  },
};

// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { productService } from '../services';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });
};

// components/ProductList.tsx
import { Loading } from '@/shared';
import { useProducts } from '../hooks';

export function ProductList() {
  const { data: products, isLoading } = useProducts();
  if (isLoading) return <Loading />;
  return (
    <div>
      {products?.map((p) => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}

// index.ts — barrel export
export * from './components';
export * from './hooks';
export * from './mappers';
export * from './schemas';
export * from './services';
export * from './types';
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server on `http://localhost:3000` |
| `pnpm build` | Type-check with TypeScript and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint to check for code issues |
| `pnpm lint:fix` | Auto-fix ESLint issues |
| `pnpm format` | Format all source files with Prettier |
| `pnpm test` | Run the test suite with Jest |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests and generate coverage report |
| `pnpm test:ci` | Run tests in CI mode (non-interactive) |

## Pre-configured Git Hooks

Husky runs the following checks automatically on every commit:

1. **pre-commit** — Linting, tests (CI mode), and production build
2. **commit-msg** — Validates commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/) format

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserCard.tsx` |
| Hooks | camelCase + `use` prefix | `useUsers.ts` |
| Services | camelCase + `.service` suffix | `user.service.ts` |
| Types | camelCase + `.types` suffix | `user.types.ts` |
| DTOs | camelCase + `.dto` suffix | `user.dto.ts` |
| Mappers | camelCase + `.mapper` suffix | `user.mapper.ts` |
| Schemas | camelCase + `.schema` suffix | `user.schema.ts` |
| Stores | camelCase + `use` prefix | `useAuthStore.ts` |

## Where to Put Things

| I need... | Location |
|-----------|----------|
| A reusable UI component | `shared/components/ui/` |
| An app layout | `shared/components/layouts/` |
| Error handling | `shared/components/error/` |
| A global hook | `shared/hooks/` |
| Global state | `shared/stores/` |
| Config / constants | `shared/config/` |
| Shared types | `shared/types/` |
| Utility functions | `shared/utils/` |
| API client setup | `shared/lib/api/` |
| Static assets / styles | `shared/assets/` |
| A complete business feature | `modules/[feature]/` |
| DTO <-> Domain mapping | `modules/[feature]/mappers/` |
| Form validations | `modules/[feature]/schemas/` |
| A page / view | `pages/` |

## License

This project is licensed under the [MIT License](LICENSE).