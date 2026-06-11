import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SearchInput } from './SearchInput'

const meta: Meta<typeof SearchInput> = {
  title: 'FilterBar/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return <SearchInput value={value} onChange={setValue} placeholder="Search records..." className="w-64" />
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState('react')
    return <SearchInput value={value} onChange={setValue} placeholder="Search records..." />
  },
}

export const Debounced: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [fired, setFired] = useState('')
    return (
      <div className="flex flex-col gap-2">
        <SearchInput
          value={value}
          onChange={(v) => { setValue(v); setFired(v) }}
          placeholder="Type to search (300ms debounce)..."
          debounceMs={300}
          className="w-64"
        />
        <p className="text-xs text-gray-500">Fired: {fired || '—'}</p>
      </div>
    )
  },
}

export const Disabled: Story = { args: { value: 'locked query', disabled: true } }
