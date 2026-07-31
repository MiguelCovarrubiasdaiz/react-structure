import { FiUsers, FiCheckSquare, FiBox } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components';

const features = [
  {
    icon: <FiBox className="h-8 w-8" />,
    title: 'Arquitectura Modular',
    description: 'Estructura de carpetas organizada',
  },
  {
    icon: <FiUsers className="h-8 w-8" />,
    title: 'State Management',
    description: 'Zustand para estado global con persistencia y devtools.',
  },
  {
    icon: <FiCheckSquare className="h-8 w-8" />,
    title: 'Data Fetching',
    description: 'TanStack Query para manejo de datos del servidor con cache.',
  },
];

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Structure React
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Una arquitectura profesional para proyectos React con TypeScript,
          Tailwind CSS, Zustand, TanStack Query y Jest.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estructura del Proyecto</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-foreground text-background p-4 rounded-lg overflow-x-auto text-sm">
            {`src/
├── shared/                  # Recursos compartidos
│   ├── assets/              # estilos, imágenes
│   ├── components/          # ui/, layouts/, error/
│   ├── config/              # env, constants
│   ├── hooks/               # hooks globales
│   ├── lib/api/             # axios, queryClient
│   ├── stores/              # stores globales (auth, app)
│   ├── types/               # tipos compartidos
│   ├── utils/               # cn, formatters
│   └── index.ts             # barrel export
│
├── routes/                  # Configuración de rutas
│
├── modules/                 # Features del negocio
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── schemas/         # validaciones Zod
│       ├── services/
│       └── types/
│
├── pages/                   # Páginas de la app
│   └── [feature]/
│       ├── FeaturePage.tsx        # Lista
│       ├── FeatureCreatePage.tsx  # Crear
│       ├── FeatureShowPage.tsx    # Detalle
│       └── FeatureEditPage.tsx    # Editar
│
├── App.tsx
└── main.tsx`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
