import * as React from 'react'
import { cn } from './utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          // Layout
          'w-full h-10 px-3 rounded-xl',
          // Theme tokens
          'bg-[--color-input-background] text-foreground border border-border',
          // Placeholder & states
          'placeholder:text-muted-foreground',
          // Focus ring aus deinem Theme
          'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50',
          // Disabled
          'disabled:opacity-50 disabled:pointer-events-none',
          // Transition
          'transition-[box-shadow,background,color,border]',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'
