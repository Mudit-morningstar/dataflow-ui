import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './Toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  args: { onChange: () => {} },
}
export default meta

type Story = StoryObj<typeof Toggle>

export const Off: Story = { args: { checked: false } }
export const On: Story = { args: { checked: true } }
export const WithLabel: Story = { args: { checked: false, label: 'Enable notifications' } }
export const WithLabelOn: Story = { args: { checked: true, label: 'Enable notifications' } }
export const Disabled: Story = { args: { checked: false, label: 'Disabled toggle', disabled: true } }
export const Small: Story = { args: { checked: true, size: 'sm', label: 'Small toggle' } }
