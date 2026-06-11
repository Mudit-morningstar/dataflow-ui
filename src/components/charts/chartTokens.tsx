import type { TooltipContentProps } from 'recharts'

export const CHART_COLORS = [
  '#3b82f6', // blue-500
  '#8b5cf6', // violet-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#06b6d4', // cyan-500
  '#f97316', // orange-500
  '#84cc16', // lime-500
]

export function ChartTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 shadow-md">
      {(label != null) && 
        <p className="mb-1.5 text-xs font-medium text-gray-500">{String(label)}</p>
      }
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: entry.color ?? entry.fill }}
          />
          <span className="text-gray-600">{String(entry.name ?? entry.dataKey)}:</span>
          <span className="font-medium text-gray-900">{String(entry.value ?? '')}</span>
        </div>
      ))}
    </div>
  )
}
