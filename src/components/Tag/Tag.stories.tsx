import type { Meta, StoryObj } from '@storybook/react'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Tag>

export const Default: Story = { args: { children: 'Default' } }
export const Blue: Story = { args: { children: 'Category', variant: 'blue' } }
export const Green: Story = { args: { children: 'Active', variant: 'green' } }
export const Yellow: Story = { args: { children: 'Pending', variant: 'yellow' } }
export const Red: Story = { args: { children: 'Blocked', variant: 'red' } }
export const Dismissible: Story = { args: { children: 'Remove me', onRemove: () => {} } }
export const Small: Story = { args: { children: 'Small', size: 'sm' } }