import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FilterBar } from './FilterBar'
import { SearchInput } from './SearchInput'
import { MultiSelect } from './MultiSelect'
import { DateRangePicker, type DateRange } from './DateRangePicker'

const meta: Meta<typeof FilterBar> = {
  title: 'FilterBar/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof FilterBar>

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]

const typeOptions = [
  { label: 'Invoice', value: 'invoice' },
  { label: 'Expense', value: 'expense' },
  { label: 'Refund', value: 'refund' },
]

export const Composed: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    const [statuses, setStatuses] = useState<string[]>([])
    const [types, setTypes] = useState<string[]>([])
    const [dateRange, setDateRange] = useState<DateRange>({})

    function clearAll() {
      setSearch('')
      setStatuses([])
      setTypes([])
      setDateRange({})
    }

    return (
      <FilterBar label="Filters" onClearAll={clearAll}>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search transactions..."
          debounceMs={300}
          className="w-56"
        />
        <MultiSelect label="Status" options={statusOptions} value={statuses} onChange={setStatuses} />
        <MultiSelect label="Type" options={typeOptions} value={types} onChange={setTypes} />
        <DateRangePicker label="Date" value={dateRange} onChange={setDateRange} />
      </FilterBar>
    )
  },
}

export const SearchOnly: Story = {
  render: () => {
    const [search, setSearch] = useState('')
    return (
      <FilterBar>
        <SearchInput value={search} onChange={setSearch} placeholder="Search..." className="w-64" />
      </FilterBar>
    )
  },
}

export const NoLabel: Story = {
  render: () => {
    const [statuses, setStatuses] = useState<string[]>([])
    const [types, setTypes] = useState<string[]>([])
    return (
      <FilterBar>
        <MultiSelect label="Status" options={statusOptions} value={statuses} onChange={setStatuses} />
        <MultiSelect label="Type" options={typeOptions} value={types} onChange={setTypes} />
      </FilterBar>
    )
  },
}
