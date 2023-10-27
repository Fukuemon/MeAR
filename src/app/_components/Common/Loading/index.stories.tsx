import { Meta, StoryObj } from '@storybook/react'
import { Loading } from '.'

const meta: Meta<typeof Loading> = {
  component: Loading,
  argTypes: {
    items: {
      control: {
        type: 'object'
      }
    }
  }
}

export default meta

type Story = StoryObj<typeof Loading>

export const Default: Story = {}
