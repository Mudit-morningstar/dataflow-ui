import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const tagCva = cva('inline-flex items-center gap-1 rounded-md font-medium', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-700',
      blue: 'bg-blue-100 text-blue-700',
      green: 'bg-green-100 text-green-700',
      yellow: 'bg-yellow-100 text-yellow-700',
      red: 'bg-red-100 text-red-700',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagCva> {
  onRemove?: () => void
}

export function Tag({ className, variant, size, onRemove, children, ...props }: TagProps) {
  return (
    <span className={clsx(tagCva({ variant, size }), className)} {...props}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 focus:outline-none"
          aria-label="Remove"
        >
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M6.707 6l2.647-2.646a.5.5 0 00-.708-.708L6 5.293 3.354 2.646a.5.5 0 00-.708.708L5.293 6 2.646 8.646a.5.5 0 00.708.708L6 6.707l2.646 2.647a.5.5 0 00.708-.708L6.707 6z" />
          </svg>
        </button>
      )}
    </span>
  )
}
