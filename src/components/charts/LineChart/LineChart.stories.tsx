import type { Meta, StoryObj } from '@storybook/react'
import { LineChart } from './LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof LineChart>

const MONTHLY_REVENUE = [
  { month: 'Jan', revenue: 42000, expenses: 31000 },
  { month: 'Feb', revenue: 48500, expenses: 33200 },
  { month: 'Mar', revenue: 52000, expenses: 35800 },
  { month: 'Apr', revenue: 47000, expenses: 34100 },
  { month: 'May', revenue: 61000, expenses: 38500 },
  { month: 'Jun', revenue: 58000, expenses: 37200 },
  { month: 'Jul', revenue: 63000, expenses: 40100 },
  { month: 'Aug', revenue: 71000, expenses: 42800 },
  { month: 'Sep', revenue: 68000, expenses: 41500 },
  { month: 'Oct', revenue: 74000, expenses: 44300 },
  { month: 'Nov', revenue: 82000, expenses: 47600 },
  { month: 'Dec', revenue: 91000, expenses: 51200 },
]

const DAU_MAU = [
  { week: 'W1',  dau: 8400,  mau: 62000 },
  { week: 'W2',  dau: 9100,  mau: 63800 },
  { week: 'W3',  dau: 8700,  mau: 64200 },
  { week: 'W4',  dau: 10200, mau: 65900 },
  { week: 'W5',  dau: 11400, mau: 67100 },
  { week: 'W6',  dau: 10800, mau: 68400 },
  { week: 'W7',  dau: 12300, mau: 70200 },
  { week: 'W8',  dau: 13100, mau: 72500 },
]

const fmt$ = (v: number) => `$${(v / 1000).toFixed(0)}k`
const fmtK = (v: number) => `${(v / 1000).toFixed(0)}k`

export const Default: Story = {
  render: () => (
    <LineChart
      data={MONTHLY_REVENUE}
      series={[{ key: 'revenue', label: 'Revenue' }]}
      xKey="month"
      yTickFormatter={fmt$}
      height={280}
    />
  ),
}

export const MultiSeries: Story = {
  render: () => (
    <LineChart
      data={MONTHLY_REVENUE}
      series={[
        { key: 'revenue',  label: 'Revenue' },
        { key: 'expenses', label: 'Expenses' },
      ]}
      xKey="month"
      yTickFormatter={fmt$}
      height={280}
    />
  ),
}

export const UserEngagement: Story = {
  render: () => (
    <LineChart
      data={DAU_MAU}
      series={[
        { key: 'mau', label: 'MAU', color: '#8b5cf6' },
        { key: 'dau', label: 'DAU', color: '#10b981' },
      ]}
      xKey="week"
      yTickFormatter={fmtK}
      height={280}
    />
  ),
}

export const Loading: Story = {
  render: () => (
    <LineChart data={[]} series={[{ key: 'revenue' }]} xKey="month" loading height={280} />
  ),
}

export const Empty: Story = {
  render: () => (
    <LineChart
      data={[]}
      series={[{ key: 'revenue' }]}
      xKey="month"
      emptyMessage="No data for the selected period."
      height={280}
    />
  ),
}
