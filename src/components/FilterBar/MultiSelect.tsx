import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'

export interface MultiSelectOption {
  label: string
  value: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  className?: string
}

function getTriggerText(
  label: string | undefined,
  value: string[],
  options: MultiSelectOption[],
  placeholder: string
): string {
  if (value.length === 0) return label ?? placeholder
  if (value.length === 1) {
    const found = options.find((o) => o.value === value[0])?.label ?? value[0]
    return label ? `${label}: ${found}` : found
  }
  return label ? `${label} (${value.length})` : `${value.length} selected`
}

export function MultiSelect({
  options,
  value,
  onChange,
  label,
  placeholder = 'Select...',
  disabled,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function toggle(optionValue: string) {
    onChange(
      value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue]
    )
  }

  const hasSelection = value.length > 0

  return (
    <div ref={containerRef} className={clsx('relative inline-block', className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          'flex h-9 items-center gap-2 rounded-md border px-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50',
          hasSelection
            ? 'border-blue-500 bg-blue-50 text-blue-700'
            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        )}
      >
        <span>{getTriggerText(label, value, options, placeholder)}</span>
        <svg
          className={clsx('h-4 w-4 shrink-0 transition-transform', open && 'rotate-180')}
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
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          aria-label={label}
          // TODO: flip to top-full/bottom-full based on viewport proximity (IntersectionObserver or getBoundingClientRect)
          className="absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {options.map((opt) => {
            const selected = value.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => toggle(opt.value)}
                className="flex w-full items-center gap-2.5 px-3 py-1.5 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                <span
                  className={clsx(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                    selected ? 'border-blue-500 bg-blue-500' : 'border-gray-300 bg-white'
                  )}
                >
                  {selected && (
                    <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                      <path d="M10.28 2.28a.75.75 0 00-1.06 0L4.5 7l-1.72-1.72a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 000-1.06z" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </button>
            )
          })}
          {hasSelection && (
            <>
              <div className="my-1 border-t border-gray-100" />
              <button
                type="button"
                onClick={() => onChange([])}
                className="w-full px-3 py-1.5 text-left text-xs text-gray-500 hover:bg-gray-50"
              >
                Clear selection
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
