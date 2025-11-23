import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100',
      primary: 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100',
      secondary: 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100',
      success: 'bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100',
      warning: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-100'
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
