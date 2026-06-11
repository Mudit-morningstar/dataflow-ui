import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as ReLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { clsx } from 'clsx'
import { CHART_COLORS, ChartTooltip } from '../chartTokens'

export interface LineSeries {
  key: string
  label?: string
  color?: string
}

export interface LineChartProps {
  data: Record<string, unknown>[]
  series: LineSeries[]
  xKey: string
  height?: number
  loading?: boolean
  emptyMessage?: string
  yTickFormatter?: (value: number) => string
  xTickFormatter?: (value: string) => string
  className?: string
}

function ChartShell({
  height,
  className,
  children,
}: {
  height: number
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      style={{ height }}
      className={clsx(
        'flex items-center justify-center rounded-md border border-gray-200 bg-gray-50',
        className
      )}
    >
      {children}
    </div>
  )
}

export function LineChart({
  data,
  series,
  xKey,
  height = 300,
  loading = false,
  emptyMessage = 'No data',
  yTickFormatter,
  xTickFormatter,
  className,
}: LineChartProps) {
  if (loading) {
    return (
      <ChartShell height={height} className={className}>
        <span className="text-sm text-gray-400">Loading…</span>
      </ChartShell>
    )
  }

  if (data.length === 0) {
    return (
      <ChartShell height={height} className={className}>
        <span className="text-sm text-gray-400">{emptyMessage}</span>
      </ChartShell>
    )
  }

  return (
    <div className={clsx('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ReLineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
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
          <Tooltip content={ChartTooltip} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
          {series.length > 1 && (
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
              formatter={(value) => <span style={{ color: '#6b7280' }}>{value}</span>}
            />
          )}
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  )
}
