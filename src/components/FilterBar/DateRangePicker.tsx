import { clsx } from 'clsx'

export interface DateRange {
  from?: string
  to?: string
}

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  label?: string
  disabled?: boolean
  className?: string
}

const dateInputClass =
  'h-9 rounded-md border border-gray-300 bg-white px-3 text-sm transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50'

export function DateRangePicker({
  value = {},
  onChange,
  label,
  disabled,
  className,
}: DateRangePickerProps) {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      {label && <span className="text-xs font-medium text-gray-500">{label}</span>}
      <div className="flex items-center gap-2">
        <input
          type="date"
          value={value.from ?? ''}
          max={value.to}
          disabled={disabled}
          onChange={(e) => {
            const newFrom = e.target.value || undefined
            // clear `to` if it would now precede the new `from`
            const newTo = newFrom && value.to && newFrom > value.to ? undefined : value.to
            onChange?.({ from: newFrom, to: newTo })
          }}
          className={dateInputClass}
          aria-label="Start date"
        />
        <span className="text-sm text-gray-400" aria-hidden="true">–</span>
        <input
          type="date"
          value={value.to ?? ''}
          min={value.from}
          disabled={disabled}
          onChange={(e) => {
            const newTo = e.target.value || undefined
            // clear `from` if it would now follow the new `to`
            const newFrom = newTo && value.from && newTo < value.from ? undefined : value.from
            onChange?.({ from: newFrom, to: newTo })
          }}
          className={dateInputClass}
          aria-label="End date"
        />
      </div>
    </div>
  )
}
