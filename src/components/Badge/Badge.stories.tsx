import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Default' } }
export const Info: Story = { args: { children: 'Info', variant: 'info' } }
export const Success: Story = { args: { children: 'Active', variant: 'success' } }
export const Warning: Story = { args: { children: 'Pending', variant: 'warning' } }
export const Danger: Story = { args: { children: 'Failed', variant: 'danger' } }
export const Small: Story = { args: { children: 'Small', size: 'sm' } }
