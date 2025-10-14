import { ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'bg-cta text-white hover:opacity-90 active:opacity-80',
      secondary: 'border-2 border-cta text-cta hover:bg-cta hover:text-white active:bg-cta active:text-white'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    
    const buttonClasses = cn(
      baseClasses,
      variants[variant],
      sizes[size],
      className
    )
    
    if (asChild) {
      // When asChild is true, clone the child element with button styles
      if (isValidElement(children)) {
        return cloneElement(children, {
          className: cn(buttonClasses, children.props.className),
          ...children.props
        })
      }
      return children
    }
    
    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
