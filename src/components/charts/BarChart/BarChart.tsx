import {
  Bar,
  BarChart as ReBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { clsx } from 'clsx'
import { CHART_COLORS, ChartTooltip } from '../chartTokens'

export interface BarSeries {
  key: string
  label?: string
  color?: string
}

export interface BarChartProps {
  data: Record<string, unknown>[]
  series: BarSeries[]
  xKey: string
  stacked?: boolean
  height?: number
  loading?: boolean
  emptyMessage?: string
  yTickFormatter?: (value: number) => string
  xTickFormatter?: (value: string) => string
  className?: string
}

export function BarChart({
  data,
  series,
  xKey,
  stacked = false,
  height = 300,
  loading = false,
  emptyMessage = 'No data',
  yTickFormatter,
  xTickFormatter,
  className,
}: BarChartProps) {
  if (loading) {
    return (
      <div
        style={{ height }}
        className={clsx(
          'flex items-center justify-center rounded-md border border-gray-200 bg-gray-50',
          className
        )}
      >
        <span className="text-sm text-gray-400">Loading…</span>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div
        style={{ height }}
        className={clsx(
          'flex items-center justify-center rounded-md border border-gray-200 bg-gray-50',
          className
        )}
      >
        <span className="text-sm text-gray-400">{emptyMessage}</span>
      </div>
    )
  }

  const stackId = stacked ? 'stack' : undefined

  return (
    <div className={clsx('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={xTickFormatter}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={yTickFormatter as (v: unknown) => string}
            width={yTickFormatter ? 52 : 36}
          />
          <Tooltip content={ChartTooltip} cursor={{ fill: '#f9fafb' }} />
          {series.length > 1 && (
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
              formatter={(value) => <span style={{ color: '#6b7280' }}>{value}</span>}
            />
          )}
          {series.map((s, i) => {
            const color = s.color ?? CHART_COLORS[i % CHART_COLORS.length]
            const isLast = i === series.length - 1
            return (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.label ?? s.key}
                fill={color}
                stackId={stackId}
                radius={
                  stacked
                    ? isLast
                      ? [3, 3, 0, 0]
                      : [0, 0, 0, 0]
                    : [3, 3, 0, 0]
                }
                maxBarSize={48}
              />
            )
          })}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  )
}
