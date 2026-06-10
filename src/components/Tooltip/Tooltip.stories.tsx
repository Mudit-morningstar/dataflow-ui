import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button/Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-16">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const Top: Story = {
  args: { content: 'Tooltip text', placement: 'top' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
}

export const Bottom: Story = {
  args: { content: 'Tooltip text', placement: 'bottom' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
}

export const Left: Story = {
  args: { content: 'Tooltip text', placement: 'left' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
}

export const Right: Story = {
  args: { content: 'Tooltip text', placement: 'right' },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="secondary">Hover me</Button>
    </Tooltip>
  ),
}
