import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = { args: { label: 'Accept terms' } }
export const Checked: Story = { args: { label: 'Accept terms', defaultChecked: true } }
export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new features and promotions.',
  },
}
export const Disabled: Story = { args: { label: 'Disabled option', disabled: true } }
export const DisabledChecked: Story = { args: { label: 'Locked option', defaultChecked: true, disabled: true } }
export const Small: Story = { args: { label: 'Small checkbox', size: 'sm' } }
export const Large: Story = { args: { label: 'Large checkbox', size: 'lg' } }
