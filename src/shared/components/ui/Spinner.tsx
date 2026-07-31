import { cn } from '@/shared/utils';
import type { SpinnerSize, SpinnerProps } from '@/shared/types';

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'rounded-full border-muted border-t-primary animate-spin',
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
