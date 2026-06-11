import type { Meta, StoryObj } from '@storybook/react'
import { PieChart } from './PieChart'

const meta: Meta<typeof PieChart> = {
  title: 'Charts/PieChart',
  component: PieChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PieChart>

const TRAFFIC_SOURCES = [
  { name: 'Organic Search', value: 4820 },
  { name: 'Direct',         value: 2340 },
  { name: 'Paid Search',    value: 1870 },
  { name: 'Social',         value: 1240 },
  { name: 'Referral',       value: 680  },
]

const REVENUE_BY_PLAN = [
  { name: 'Enterprise', value: 84000 },
  { name: 'Pro',        value: 36000 },
  { name: 'Starter',    value: 14400 },
  { name: 'Free',       value: 0     },
]

const BROWSER_SHARE = [
  { name: 'Chrome',  value: 63.4, color: '#4285F4' },
  { name: 'Safari',  value: 19.7, color: '#555555' },
  { name: 'Firefox', value: 8.3,  color: '#FF7139' },
  { name: 'Edge',    value: 5.8,  color: '#0078D7' },
  { name: 'Other',   value: 2.8,  color: '#9ca3af' },
]

export const Default: Story = {
  render: () => (
    <div className="max-w-md">
      <PieChart data={TRAFFIC_SOURCES} height={300} />
    </div>
  ),
}

export const Donut: Story = {
  render: () => (
    <div className="max-w-md">
      <PieChart
        data={REVENUE_BY_PLAN.filter((s) => s.value > 0)}
        donut
        height={300}
        valueFormatter={(v) => `$${v.toLocaleString()}`}
      />
    </div>
  ),
}

export const WithCustomColors: Story = {
  render: () => (
    <div className="max-w-md">
      <PieChart data={BROWSER_SHARE} donut height={300} />
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="max-w-md">
      <PieChart data={[]} loading height={300} />
    </div>
  ),
}

export const Empty: Story = {
  render: () => (
    <div className="max-w-md">
      <PieChart data={[]} height={300} emptyMessage="No revenue data available." />
    </div>
  ),
}
