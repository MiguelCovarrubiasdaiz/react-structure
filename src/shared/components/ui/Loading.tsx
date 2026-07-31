import { Spinner } from './spinner.tsx';
import type { LoadingProps } from '@/shared/types';

export function Loading({
  text = 'Loading...',
  fullScreen = false,
}: LoadingProps) {
  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50'
    : 'w-full py-12';

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${containerClasses}`}
    >
      <Spinner size="lg" />
      <p className="text-muted-foreground font-medium">{text}</p>
    </div>
  );
}
