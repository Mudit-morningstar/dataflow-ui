import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { MultiSelect } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'FilterBar/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof MultiSelect>

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
  { label: 'Archived', value: 'archived' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect label="Status" options={statusOptions} value={value} onChange={setValue} />
  },
}

export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = useState(['active', 'pending'])
    return <MultiSelect label="Status" options={statusOptions} value={value} onChange={setValue} />
  },
}

export const MultipleSelected: Story = {
  render: () => {
    const [value, setValue] = useState(['active', 'pending', 'archived'])
    return <MultiSelect label="Status" options={statusOptions} value={value} onChange={setValue} />
  },
}

export const NoLabel: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect options={statusOptions} value={value} onChange={setValue} placeholder="Filter by status" />
  },
}

export const Disabled: Story = {
  render: () => (
    <MultiSelect label="Status" options={statusOptions} value={['active']} onChange={() => {}} disabled />
  ),
}
