import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from './utils'

type Variant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'link'
type Size = 'default' | 'sm' | 'lg' | 'icon'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: Variant
  size?: Size
}

const base =
  // Layout & Typography
  'inline-flex items-center justify-center gap-2 text-sm font-medium rounded-xl ' +
  // Sizing
  'h-10 px-4 ' +
  // Border & BG via Tokens
  'border transition-[background,box-shadow,color,opacity,transform] ' +
  // Focus
  'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 ' +
  // Disabled
  'disabled:opacity-50 disabled:pointer-events-none ' +
  // Active micro-interaction
  'active:translate-y-[0.5px]'

const variants: Record<Variant, string> = {
  default:
    'bg-primary text-primary-foreground border-transparent hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/90',
  outline:
    'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground',
  ghost: 'bg-transparent text-foreground border-transparent hover:bg-secondary',
  destructive:
    'bg-destructive text-destructive-foreground border-transparent hover:bg-destructive/90',
  link: 'bg-transparent text-primary border-transparent hover:underline p-0 h-auto',
}

const sizes: Record<Size, string> = {
  default: 'h-10 px-4',
  sm: 'h-9  px-3 rounded-lg',
  lg: 'h-11 px-5 rounded-2xl',
  icon: 'h-10 w-10 p-0',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, asChild, variant = 'default', size = 'default', ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
