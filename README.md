# Structure React

Arquitectura modular con core compartido para proyectos React escalables.

## Stack Tecnológico

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS 4** - Estilos
- **TanStack Query** - Data fetching y cache
- **Zustand** - Estado global
- **Axios** - Cliente HTTP
- **React Router** - Navegación
- **Zod** - Validación de schemas
- **React Hook Form** - Manejo de formularios
- **Jest** + **React Testing Library** - Testing

## Estructura del Proyecto

```
src/
├── components/                  # Componentes globales reutilizables
│   ├── ui/                      # Componentes UI primitivos
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Spinner.tsx
│   │   └── Loading.tsx
│   │
│   ├── layouts/                 # Layouts de la aplicación
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainLayout.tsx
│   │
│   └── error/                   # Componentes de error
│       └── ErrorBoundary.tsx
│
├── core/                        # Infraestructura y lógica compartida
│   ├── api/                     # Configuración de APIs
│   │   ├── axios.ts             # Cliente HTTP configurado
│   │   └── queryClient.ts       # Configuración de TanStack Query
│   │
│   ├── config/                  # Configuración y constantes
│   │   ├── env.config.ts        # Variables de entorno
│   │   └── constants.ts         # APP_NAME, ROUTES, API_ENDPOINTS
│   │
│   ├── hooks/                   # Hooks globales reutilizables
│   │
│   ├── routes/                  # Configuración de React Router
│   │   └── index.tsx            # Definición de rutas
│   │
│   ├── stores/                  # Estado global (Zustand)
│   │   ├── useAppStore.ts       # Tema, sidebar, config UI
│   │   └── useAuthStore.ts      # Autenticación
│   │
│   ├── types/                   # Tipos compartidos
│   │   ├── api.types.ts         # ApiResponse, PaginatedResponse
│   │   └── common.types.ts      # Status, tipos genéricos
│   │
│   └── utils/                   # Utilidades
│       ├── cn.ts                # Classnames helper
│       └── formatters.ts        # Formateo de fechas, moneda
│
├── modules/                     # Features de negocio (autocontenidos)
│   └── [feature]/
│       ├── components/          # Componentes del módulo
│       ├── hooks/               # Hooks de datos
│       ├── schemas/             # Validaciones Zod
│       ├── services/            # Llamadas API
│       └── types/               # Tipos del dominio
│
├── pages/                       # Páginas organizadas por feature
│   ├── home/
│   │   └── HomePage.tsx
│   ├── users/
│   │   ├── UsersPage.tsx        # /users (lista)
│   │   ├── UserCreatePage.tsx   # /users/create
│   │   ├── UserShowPage.tsx     # /users/:id
│   │   └── UserEditPage.tsx     # /users/:id/edit
│   └── todos/
│       ├── TodosPage.tsx        # /todos (lista)
│       ├── TodoCreatePage.tsx   # /todos/create
│       ├── TodoShowPage.tsx     # /todos/:id
│       └── TodoEditPage.tsx     # /todos/:id/edit
│
├── assets/
│   └── styles/
│       └── index.css            # Estilos globales + Tailwind
│
├── App.tsx                      # Componente raíz
└── main.tsx                     # Entry point
```

## Arquitectura

### Components (`/components`)

Componentes visuales reutilizables en toda la aplicación:

- **ui/**: Primitivos de UI (Button, Card, Input, Spinner, Loading)
- **layouts/**: Estructura de la app (Header, Sidebar, MainLayout)
- **error/**: Manejo de errores (ErrorBoundary)

```tsx
import { Button, Card, Loading } from '@/components';
import { MainLayout } from '@/components/layouts';
```

### Core (`/core`)

Infraestructura y lógica compartida que no es visual:

- **api/**: Clientes HTTP (axios, queryClient)
- **config/**: Variables de entorno y constantes
- **hooks/**: Hooks globales (useLocalStorage, useDebounce)
- **stores/**: Estado global con Zustand
- **types/**: Tipos TypeScript compartidos
- **utils/**: Funciones utilitarias

```tsx
import { apiClient, queryClient } from '@/core/api';
import { useAppStore, useAuthStore } from '@/core/stores';
import { cn, formatDate } from '@/core/utils';
import { APP_NAME, ROUTES } from '@/core/config';
```

### Modules (`/modules`)

Cada módulo es **autocontenido** y representa una feature de negocio:

```
modules/users/
├── components/     # UI específica del módulo
├── hooks/          # Lógica de datos (queries, mutations)
├── schemas/        # Validaciones Zod + tipos de formularios
├── services/       # Llamadas a la API
└── types/          # Tipos del dominio
```

```tsx
import { UserList, useUsers, userService } from '@/modules/users';
```

### Pages (`/pages`)

Componentes de **composición**. No contienen lógica de negocio:

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

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│  (QueryClientProvider + ErrorBoundary + MainLayout)         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         Pages                                │
│  (Composición - importa de modules y components)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Modules                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Components ──► Hooks ──► Services ──► API (axios)    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────┬─────────────────────────────┐
│          Components           │            Core              │
│  (UI reutilizable)            │  (Infraestructura)          │
└───────────────────────────────┴─────────────────────────────┘
```

## Crear un Nuevo Módulo

1. Crear la estructura:

```bash
mkdir -p src/modules/products/{components,hooks,schemas,services,types}
```

2. Crear los archivos:

```tsx
// types/product.types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

// schemas/product.schema.ts
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Nombre requerido'),
  price: z.number().min(0, 'Precio inválido'),
});

export type ProductFormData = z.infer<typeof productSchema>;

// services/product.service.ts
import { apiClient } from '@/core/api';
import type { Product } from '../types';

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await apiClient.get('/products');
    return data;
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
import { Loading } from '@/components';
import { useProducts } from '../hooks';

export function ProductList() {
  const { data: products, isLoading } = useProducts();
  if (isLoading) return <Loading />;
  return (
    <div>
      {products?.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}

// components/ProductForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@/components';
import { productSchema, type ProductFormData } from '../schemas';

export function ProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductFormData) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Nombre" error={errors.name?.message} {...register('name')} />
      <Button type="submit">Crear</Button>
    </form>
  );
}

// index.ts
export * from './components';
export * from './hooks';
export * from './schemas';
export * from './services';
export * from './types';
```

## Scripts

```bash
pnpm dev         # Desarrollo
pnpm build       # Build producción
pnpm test        # Tests
pnpm lint        # Lint
```

## Convenciones

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `UserCard.tsx` |
| Hooks | camelCase + `use` | `useUsers.ts` |
| Services | camelCase + `.service` | `user.service.ts` |
| Types | camelCase + `.types` | `user.types.ts` |
| Stores | camelCase + `use` | `useAuthStore.ts` |

## Cuándo usar cada capa

| Necesito... | Ubicación |
|-------------|-----------|
| Componente UI reutilizable | `components/ui/` |
| Layout de la app | `components/layouts/` |
| Manejo de errores | `components/error/` |
| Hook global | `core/hooks/` |
| Estado global | `core/stores/` |
| Configuración/constantes | `core/config/` |
| Tipos compartidos | `core/types/` |
| Utilidades | `core/utils/` |
| Feature completa | `modules/[feature]/` |
| Validación de formularios | `modules/[feature]/schemas/` |
| Página/vista | `pages/` |
