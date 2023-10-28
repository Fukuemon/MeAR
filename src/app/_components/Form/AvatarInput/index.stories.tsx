import { StoryObj, Meta } from '@storybook/react'

import AvatarInput from './index'

const meta: Meta<typeof AvatarInput> = {
  component: AvatarInput,
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof AvatarInput>

export const Default: Story = {
  args: {}
}
