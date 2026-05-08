import { cn } from '@/shared/utils';
import type { ButtonVariant, ButtonSize, ButtonProps } from '@/shared/types';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300',
  outline:
    'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white',
  ghost: 'bg-transparent text-blue-500 hover:bg-blue-50',
  danger: 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-300',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}
