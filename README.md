# Structure React

Arquitectura modular con shared compartido para proyectos React escalables.

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
├── shared/                      # Recursos compartidos de la aplicación
│   ├── assets/                  # Assets estáticos
│   │   ├── styles/
│   │   │   └── index.css        # Estilos globales + Tailwind
│   │   └── react.svg
│   │
│   ├── components/              # Componentes globales reutilizables
│   │   ├── ui/                  # Componentes UI primitivos
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── Loading.tsx
│   │   │
│   │   ├── layouts/             # Layouts de la aplicación
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   └── error/               # Componentes de error
│   │       └── ErrorBoundary.tsx
│   │
│   ├── config/                  # Configuración y constantes
│   │   ├── env.config.ts        # Variables de entorno
│   │   └── constants.ts         # APP_NAME, ROUTES, API_ENDPOINTS
│   │
│   ├── hooks/                   # Hooks globales reutilizables
│   │
│   ├── lib/                     # Infraestructura técnica
│   │   └── api/                 # Configuración de APIs
│   │       ├── axios.ts         # Cliente HTTP configurado
│   │       └── queryClient.ts   # Configuración de TanStack Query
│   │
│   ├── stores/                  # Estado global (Zustand)
│   │   ├── useAppStore.ts       # Tema, sidebar, config UI
│   │   └── useAuthStore.ts      # Autenticación
│   │
│   ├── types/                   # Tipos compartidos
│   │   ├── api.types.ts         # ApiResponse, PaginatedResponse
│   │   └── common.types.ts      # Status, tipos genéricos
│   │
│   ├── utils/                   # Utilidades
│   │   ├── cn.ts                # Classnames helper
│   │   └── formatters.ts        # Formateo de fechas, moneda
│   │
│   └── index.ts                 # Barrel export de todo shared
│
├── routes/                      # Configuración de React Router
│   └── index.tsx                # Definición de rutas
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
├── App.tsx                      # Componente raíz
└── main.tsx                     # Entry point
```

## Arquitectura

### Shared (`/shared`)

Recursos compartidos en toda la aplicación. Todo se exporta desde un único barrel:

```tsx
import {
  // Components
  Button, Card, Loading, MainLayout, ErrorBoundary,
  // Stores
  useAppStore, useAuthStore,
  // Utils
  cn, formatDate, formatCurrency,
  // Config
  APP_NAME, ROUTES, API_ENDPOINTS,
  // API
  apiClient, queryClient,
  // Assets
  ReactLogo,
} from '@/shared';
```

Contenido:

- **components/**: UI reutilizable (Button, Card, Input, layouts, ErrorBoundary)
- **config/**: Variables de entorno y constantes
- **hooks/**: Hooks globales (useLocalStorage, useDebounce)
- **lib/api/**: Clientes HTTP (axios, queryClient)
- **stores/**: Estado global con Zustand
- **types/**: Tipos TypeScript compartidos
- **utils/**: Funciones utilitarias
- **assets/**: Estilos y recursos estáticos

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
│  (Composición - importa de modules y shared)                │
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
┌─────────────────────────────────────────────────────────────┐
│                         Shared                               │
│  (Components, Stores, Utils, Config, API, Types, Assets)    │
└─────────────────────────────────────────────────────────────┘
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
import { apiClient } from '@/shared';
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
import { Loading } from '@/shared';
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
import { Button, Input } from '@/shared';
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
| Componente UI reutilizable | `shared/components/ui/` |
| Layout de la app | `shared/components/layouts/` |
| Manejo de errores | `shared/components/error/` |
| Hook global | `shared/hooks/` |
| Estado global | `shared/stores/` |
| Configuración/constantes | `shared/config/` |
| Tipos compartidos | `shared/types/` |
| Utilidades | `shared/utils/` |
| Cliente API | `shared/lib/api/` |
| Assets/estilos | `shared/assets/` |
| Feature completa | `modules/[feature]/` |
| Validación de formularios | `modules/[feature]/schemas/` |
| Página/vista | `pages/` |
