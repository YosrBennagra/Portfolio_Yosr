import { AnchorHTMLAttributes, forwardRef } from 'react';
import { composeButtonClasses, ButtonVariant, ButtonSize } from './Button';

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <a ref={ref} className={composeButtonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  )
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
