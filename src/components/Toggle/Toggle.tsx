import { clsx } from 'clsx'

export interface ToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'onClick'> {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  size?: 'sm' | 'md'
}

export function Toggle({ checked = false, onChange, label, size = 'md', className, disabled, ...props }: ToggleProps) {
  const isSm = size === 'sm'

  return (
    <label className={clsx('flex cursor-pointer items-center gap-2', disabled && 'cursor-not-allowed opacity-50')}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className={clsx(
          'relative inline-flex shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none',
          isSm ? 'h-4 w-8' : 'h-6 w-11',
          checked ? 'bg-blue-600' : 'bg-gray-200',
          className
        )}
        onClick={() => onChange?.(!checked)}
        {...props}
      >
        <span
          aria-hidden="true"
          className={clsx(
            'pointer-events-none absolute top-0.5 inline-block rounded-full bg-white shadow transition-transform',
            isSm ? 'h-3 w-3' : 'h-5 w-5',
            isSm
              ? checked ? 'translate-x-4' : 'translate-x-0.5'
              : checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
    </label>
  )
}
