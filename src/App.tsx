import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib/api';
import { ErrorBoundary } from '@/shared/components/error';
import { Toaster } from '@/shared/components';
import { useAppStore } from '@/shared/stores';
import { router } from '@/routes';

export default function App() {
  const theme = useAppStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
