import {
  Cell,
  Legend,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { clsx } from 'clsx'
import { CHART_COLORS, ChartTooltip } from '../chartTokens'

export interface PieSlice {
  name: string
  value: number
  color?: string
}

export interface PieChartProps {
  data: PieSlice[]
  donut?: boolean
  height?: number
  loading?: boolean
  emptyMessage?: string
  valueFormatter?: (value: number) => string
  className?: string
}

export function PieChart({
  data,
  donut = false,
  height = 300,
  loading = false,
  emptyMessage = 'No data',
  valueFormatter,
  className,
}: PieChartProps) {
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

  const outerRadius = donut ? '75%' : '80%'
  const innerRadius = donut ? '50%' : 0

  return (
    <div className={clsx('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RePieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            dataKey="value"
            nameKey="name"
            startAngle={90}
            endAngle={-270}
            strokeWidth={2}
            stroke="#fff"
          >
            {data.map((slice, i) => (
              <Cell
                key={slice.name}
                fill={slice.color ?? CHART_COLORS[i % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={ChartTooltip}
            formatter={
              valueFormatter
                ? (value) => [valueFormatter(value as number), '']
                : undefined
            }
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            formatter={(value) => <span style={{ color: '#6b7280' }}>{value}</span>}
          />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  )
}
