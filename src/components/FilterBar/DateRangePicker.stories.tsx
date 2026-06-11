import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker, type DateRange } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'FilterBar/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof DateRangePicker>

export const Default: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({})
    return <DateRangePicker value={range} onChange={setRange} />
  },
}

export const WithLabel: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({})
    return <DateRangePicker label="Created at" value={range} onChange={setRange} />
  },
}

export const WithValue: Story = {
  render: () => {
    const [range, setRange] = useState<DateRange>({ from: '2024-01-01', to: '2024-03-31' })
    return <DateRangePicker label="Date range" value={range} onChange={setRange} />
  },
}

export const Disabled: Story = {
  render: () => (
    <DateRangePicker label="Date range" value={{ from: '2024-01-01', to: '2024-03-31' }} disabled />
  ),
}
