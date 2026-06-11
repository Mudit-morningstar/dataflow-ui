import type { Meta, StoryObj } from '@storybook/react'
import { BarChart } from './BarChart'

const meta: Meta<typeof BarChart> = {
  title: 'Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof BarChart>

const MONTHLY_SIGNUPS = [
  { month: 'Jan', signups: 420 },
  { month: 'Feb', signups: 380 },
  { month: 'Mar', signups: 510 },
  { month: 'Apr', signups: 490 },
  { month: 'May', signups: 630 },
  { month: 'Jun', signups: 580 },
  { month: 'Jul', signups: 720 },
  { month: 'Aug', signups: 810 },
]

const BY_CHANNEL = [
  { month: 'Q1', organic: 1240, paid: 680, referral: 320 },
  { month: 'Q2', organic: 1380, paid: 720, referral: 410 },
  { month: 'Q3', organic: 1520, paid: 810, referral: 380 },
  { month: 'Q4', organic: 1890, paid: 950, referral: 520 },
]

const MONTHLY_SPEND = [
  { month: 'Jan', software: 420, infra: 640, travel: 380, meals: 190 },
  { month: 'Feb', software: 420, infra: 710, travel: 120, meals: 210 },
  { month: 'Mar', software: 516, infra: 760, travel: 890, meals: 280 },
  { month: 'Apr', software: 516, infra: 720, travel: 430, meals: 240 },
  { month: 'May', software: 516, infra: 800, travel: 650, meals: 260 },
  { month: 'Jun', software: 612, infra: 870, travel: 1200, meals: 310 },
]

const fmt$ = (v: number) => `$${v.toLocaleString()}`

export const Default: Story = {
  render: () => (
    <BarChart
      data={MONTHLY_SIGNUPS}
      series={[{ key: 'signups', label: 'Sign-ups' }]}
      xKey="month"
      height={280}
    />
  ),
}

export const Grouped: Story = {
  render: () => (
    <BarChart
      data={BY_CHANNEL}
      series={[
        { key: 'organic',  label: 'Organic' },
        { key: 'paid',     label: 'Paid' },
        { key: 'referral', label: 'Referral' },
      ]}
      xKey="month"
      height={280}
    />
  ),
}

export const Stacked: Story = {
  render: () => (
    <BarChart
      data={MONTHLY_SPEND}
      series={[
        { key: 'software', label: 'Software' },
        { key: 'infra',    label: 'Infrastructure' },
        { key: 'travel',   label: 'Travel' },
        { key: 'meals',    label: 'Meals' },
      ]}
      xKey="month"
      stacked
      yTickFormatter={fmt$}
      height={280}
    />
  ),
}

export const Loading: Story = {
  render: () => (
    <BarChart data={[]} series={[{ key: 'signups' }]} xKey="month" loading height={280} />
  ),
}

export const Empty: Story = {
  render: () => (
    <BarChart
      data={[]}
      series={[{ key: 'signups' }]}
      xKey="month"
      emptyMessage="No data for the selected period."
      height={280}
    />
  ),
}
