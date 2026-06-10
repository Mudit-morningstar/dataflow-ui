import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = { args: { placeholder: 'Enter value...' } }
export const WithLabel: Story = { args: { label: 'Email address', placeholder: 'you@example.com' } }
export const WithHelperText: Story = {
  args: { label: 'Username', placeholder: 'mudit', helperText: 'Must be 3–20 characters.' },
}
export const Error: Story = {
  args: { label: 'Email address', placeholder: 'you@example.com', error: 'Please enter a valid email.' },
}
export const Disabled: Story = { args: { label: 'Locked field', value: 'read-only', disabled: true } }
export const Small: Story = { args: { placeholder: 'Small input', size: 'sm' } }
export const Large: Story = { args: { placeholder: 'Large input', size: 'lg' } }
