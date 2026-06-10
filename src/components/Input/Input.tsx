import { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const inputCva = cva(
  'block w-full rounded-md border text-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500/20',
        error: 'border-red-500 bg-white focus:border-red-500 focus:ring-red-500/20',
      },
      size: {
        sm: 'h-8 px-3',
        md: 'h-9 px-3',
        lg: 'h-10 px-4',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputCva> {
  label?: string
  helperText?: string
  error?: string
}

export function Input({ className, variant, size, label, helperText, error, id, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? generatedId
  const resolvedVariant = error ? 'error' : variant

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(inputCva({ variant: resolvedVariant, size }), className)}
        {...props}
      />
      {(error || helperText) && (
        <p className={clsx('text-xs', error ? 'text-red-500' : 'text-gray-500')}>
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}
