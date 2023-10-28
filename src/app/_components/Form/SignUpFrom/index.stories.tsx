import { StoryObj, Meta } from '@storybook/react'
import { SignUpForm } from '.'

const meta: Meta<typeof SignUpForm> = {
  component: SignUpForm,
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof SignUpForm>

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
        query: {
          user: 'santa'
        }
      }
    }
  }
}
