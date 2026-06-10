import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

const badgeCva = cva('inline-flex items-center rounded-full font-medium', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-700',
      info: 'bg-blue-100 text-blue-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-red-100 text-red-700',
    },
    size: {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
})

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeCva> {}

export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={clsx(badgeCva({ variant, size }), className)} {...props}>
      {children}
    </span>
  )
}
