import { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const selectCva = cva(
  'block w-full appearance-none rounded-md border bg-white text-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      },
      size: {
        sm: 'h-8 px-3 pr-8',
        md: 'h-9 px-3 pr-8',
        lg: 'h-10 px-4 pr-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  }
)

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectCva> {
  label?: string
  helperText?: string
  error?: string
  options?: SelectOption[]
}

export function Select({
  className,
  variant,
  size,
  label,
  helperText,
  error,
  options,
  children,
  id,
  ...props
}: SelectProps) {
  const generatedId = useId()
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? generatedId
  const resolvedVariant = error ? 'error' : variant

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={clsx(selectCva({ variant: resolvedVariant, size }), className)}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <svg
          className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {(error || helperText) && (
        <p className={clsx('text-xs', error ? 'text-red-500' : 'text-gray-500')}>
          {error ?? helperText}
        </p>
      )}
    </div>
  )
}
