import { StoryObj, Meta } from '@storybook/react'
import { SignInForm } from '.'

const meta: Meta<typeof SignInForm> = {
  component: SignInForm,
  argTypes: {}
}

export default meta

type Story = StoryObj<typeof SignInForm>

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
