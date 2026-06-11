import { clsx } from 'clsx'

export interface FilterBarProps {
  children: React.ReactNode
  label?: string
  onClearAll?: () => void
  className?: string
}

export function FilterBar({ children, label, onClearAll, className }: FilterBarProps) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-2', className)}>
      {(label || onClearAll) && (
        <div className="flex shrink-0 items-center gap-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          
        </div>
      )}
      {children}
      {onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              Clear all
            </button>
          )}
    </div>
  )
}
