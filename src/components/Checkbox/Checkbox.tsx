import { useId } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const checkboxCva = cva(
  'rounded border-gray-300 text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>,
    VariantProps<typeof checkboxCva> {
  label?: string
  description?: string
}

export function Checkbox({ className, size, label, description, id, ...props }: CheckboxProps) {
  const generatedId = useId()
  const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-') ?? generatedId

  return (
    <label htmlFor={checkboxId} className="flex cursor-pointer items-start gap-2">
      <input
        type="checkbox"
        id={checkboxId}
        className={clsx(checkboxCva({ size }), 'mt-0.5', className)}
        {...props}
      />
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {description && <span className="text-xs text-gray-500">{description}</span>}
        </div>
      )}
    </label>
  )
}
