import { useEffect, useMemo, useRef, useState } from 'react'
import { clsx } from 'clsx'

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  filterable?: boolean
  filterOptions?: { label: string; value: string }[]
  cell?: (row: T) => React.ReactNode
  width?: string
  align?: 'left' | 'right' | 'center'
}

export interface RowAction<T> {
  label: string
  onClick: (row: T) => void
  variant?: 'default' | 'danger'
}

export interface DataTableProps<T extends Record<string, unknown>> {
  data: T[]
  columns: Column<T>[]
  rowActions?: RowAction<T>[]
  rowKey?: keyof T | ((row: T) => string | number)
  pageSize?: number
  loading?: boolean
  emptyMessage?: string
  headerFilters?: boolean
  className?: string
}

interface SortState {
  key: string
  dir: 'asc' | 'desc'
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

function getRowKey<T>(
  row: T,
  rowKey: DataTableProps<T>['rowKey'],
  index: number
): string | number {
  if (!rowKey) return index
  if (typeof rowKey === 'function') return rowKey(row)
  return row[rowKey] as string | number
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: 'asc' | 'desc' | null }) {
  return (
    <span className="inline-flex flex-col gap-px" aria-hidden="true">
      <svg
        className={clsx('h-2 w-2', active && dir === 'asc' ? 'text-blue-500' : 'text-gray-300')}
        viewBox="0 0 8 5"
        fill="currentColor"
      >
        <path d="M4 0L8 5H0L4 0Z" />
      </svg>
      <svg
        className={clsx('h-2 w-2', active && dir === 'desc' ? 'text-blue-500' : 'text-gray-300')}
        viewBox="0 0 8 5"
        fill="currentColor"
      >
        <path d="M4 5L0 0H8L4 5Z" />
      </svg>
    </span>
  )
}

function PageButton({
  children,
  onClick,
  active,
  disabled,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  disabled?: boolean
  'aria-label'?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        'flex h-7 min-w-[28px] items-center justify-center rounded px-1.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20',
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40'
      )}
    >
      {children}
    </button>
  )
}

function RowActionsMenu<T extends Record<string, unknown>>({
  actions,
  row,
}: {
  actions: RowAction<T>[]
  row: T
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onMouse(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouse)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouse)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Row actions"
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
        </svg>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              role="menuitem"
              onClick={() => {
                action.onClick(row)
                setOpen(false)
              }}
              className={clsx(
                'w-full px-3 py-1.5 text-left text-sm',
                action.variant === 'danger'
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ColumnFilterSelect({
  header,
  options,
  value,
  onChange,
  sort,
  sortable,
  onSort,
}: {
  header: string
  options: { label: string; value: string }[]
  value: string[]
  onChange: (v: string[]) => void
  sort: 'asc' | 'desc' | null
  sortable?: boolean
  onSort?: () => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function toggleOption(v: string) {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
  }

  const hasSelection = value.length > 0
  const triggerLabel =
    value.length === 0
      ? header
      : value.length === 1
        ? (options.find((o) => o.value === value[0])?.label ?? value[0])
        : `${header} (${value.length})`

  return (
    <div ref={ref} className="relative flex w-full items-center gap-1">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v) }}
        className={clsx(
          'flex min-w-0 flex-1 items-center gap-1 rounded px-1.5 py-1 text-xs font-medium uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          hasSelection
            ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        )}
      >
        <svg
          className={clsx('h-3 w-3 shrink-0', hasSelection ? 'text-blue-500' : 'text-gray-400')}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
            clipRule="evenodd"
          />
        </svg>
        <span className="truncate">{triggerLabel}</span>
        <svg
          className={clsx('h-3 w-3 shrink-0 transition-transform', open && 'rotate-180')}
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

      {sortable && (
        <button
          type="button"
          aria-label={`Sort by ${header}`}
          onClick={(e) => { e.stopPropagation(); onSort?.() }}
          className="shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <SortIcon active={sort !== null} dir={sort} />
        </button>
      )}

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          aria-label={header}
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
                onClick={() => toggleOption(opt.value)}
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
                Clear filter
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  rowActions,
  rowKey,
  pageSize = 10,
  loading = false,
  emptyMessage = 'No results',
  headerFilters = false,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState | null>(null)
  const [page, setPage] = useState(1)
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({})

  useEffect(() => { setPage(1) }, [data])
  useEffect(() => { setPage(1) }, [columnFilters])

  const filtered = useMemo(() => {
    const activeFilters = Object.entries(columnFilters).filter(([, vals]) => vals.length > 0)
    if (activeFilters.length === 0) return data
    return data.filter((row) =>
      activeFilters.every(([key, vals]) => vals.includes(String(row[key] ?? '')))
    )
  }, [data, columnFilters])

  const sorted = useMemo(() => {
    if (!sort) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      const cmp =
        av == null ? 1
        : bv == null ? -1
        : av < bv ? -1
        : av > bv ? 1
        : 0
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  function toggleSort(key: string) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
    setPage(1)
  }

  function setColumnFilter(key: string, vals: string[]) {
    setColumnFilters((prev) => ({ ...prev, [key]: vals }))
  }

  function getFilterOptions(col: Column<T>): { label: string; value: string }[] {
    if (col.filterOptions) return col.filterOptions
    const unique = [...new Set(data.map((row) => String(row[col.key] ?? '')))]
    return unique.sort().map((v) => ({ label: v, value: v }))
  }

  const showFooter = !loading && sorted.length > 0
  const showPageButtons = sorted.length > pageSize
  const startRow = sorted.length === 0 ? 0 : (safePage - 1) * pageSize + 1
  const endRow = Math.min(safePage * pageSize, sorted.length)
  const colSpan = columns.length + (rowActions ? 1 : 0)
  const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' }

  const activeFilterCount = Object.values(columnFilters).filter((v) => v.length > 0).length

  return (
    <div className={clsx('flex flex-col overflow-hidden rounded-md border border-gray-200', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col) => {
                const isFilterable = headerFilters && col.filterable
                const isSortable = col.sortable
                const sortActive = (sort?.key === col.key) ?? false
                const sortDir = sortActive ? sort!.dir : null

                if (isFilterable) {
                  return (
                    <th
                      key={col.key}
                      style={col.width ? { width: col.width } : undefined}
                      className={clsx(
                        'px-3 py-2',
                        alignClass[col.align ?? 'left']
                      )}
                    >
                      <ColumnFilterSelect
                        header={col.header}
                        options={getFilterOptions(col)}
                        value={columnFilters[col.key] ?? []}
                        onChange={(vals) => setColumnFilter(col.key, vals)}
                        sort={sortDir}
                        sortable={isSortable}
                        onSort={() => toggleSort(col.key)}
                      />
                    </th>
                  )
                }

                return (
                  <th
                    key={col.key}
                    style={col.width ? { width: col.width } : undefined}
                    onClick={isSortable ? () => toggleSort(col.key) : undefined}
                    className={clsx(
                      'px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500',
                      alignClass[col.align ?? 'left'],
                      isSortable && 'cursor-pointer select-none hover:text-gray-700'
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {isSortable && (
                        <SortIcon
                          active={sort?.key === col.key}
                          dir={sort?.key === col.key ? sort.dir : null}
                        />
                      )}
                    </span>
                  </th>
                )
              })}
              {rowActions && <th className="w-12 px-4 py-3" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      <div className="h-4 rounded bg-gray-100" />
                    </td>
                  ))}
                  {rowActions && <td className="px-3 py-2"><div className="h-4 w-7 rounded bg-gray-100" /></td>}
                </tr>
              ))
            )  : paginated.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="px-4 py-12 text-center text-sm text-gray-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginated.map((row, idx) => (
                <tr
                  key={getRowKey(row, rowKey, idx)}
                  className="hover:bg-gray-50"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={clsx('px-4 py-3 text-gray-700', alignClass[col.align ?? 'left'])}
                    >
                      {col.cell ? col.cell(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-3 py-2 text-right">
                      <RowActionsMenu actions={rowActions} row={row} />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showFooter && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
          <span className="text-xs text-gray-500">
            {`${startRow}–${endRow} of ${sorted.length}${activeFilterCount > 0 ? ` (filtered)` : ''}`}
          </span>
          {showPageButtons && <div className="flex items-center gap-1">
            <PageButton
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              aria-label="Previous page"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
              </svg>
            </PageButton>
            {getPageNumbers(safePage, totalPages).map((p, i) =>
              p === '...' ? (
                <span key={`el-${i}`} className="px-1 text-xs text-gray-400">…</span>
              ) : (
                <PageButton key={p} onClick={() => setPage(p as number)} active={p === safePage}>
                  {p}
                </PageButton>
              )
            )}
            <PageButton
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              aria-label="Next page"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </PageButton>
          </div>}
        </div>
      )}
    </div>
  )
}
