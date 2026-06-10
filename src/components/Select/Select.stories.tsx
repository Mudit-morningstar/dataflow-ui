import type { Meta, StoryObj } from '@storybook/react'
import { Select } from './Select'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Select>

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]

export const Default: Story = { args: { options: statusOptions } }
export const WithLabel: Story = { args: { label: 'Status', options: statusOptions } }
export const WithHelperText: Story = {
  args: { label: 'Status', options: statusOptions, helperText: 'Controls visibility of this record.' },
}
export const Error: Story = {
  args: { label: 'Status', options: statusOptions, error: 'Please select a status.' },
}
export const Disabled: Story = { args: { label: 'Status', options: statusOptions, disabled: true } }
export const Small: Story = { args: { options: statusOptions, size: 'sm' } }
export const Large: Story = { args: { options: statusOptions, size: 'lg' } }
