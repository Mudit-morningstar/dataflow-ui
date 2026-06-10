import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { children: 'Save changes', variant: 'primary' } }
export const Secondary: Story = { args: { children: 'Cancel', variant: 'secondary' } }
export const Danger: Story = { args: { children: 'Delete', variant: 'danger' } }
export const Loading: Story = { args: { children: 'Saving...', loading: true } }
export const Disabled: Story = { args: { children: 'Not available', disabled: true } }