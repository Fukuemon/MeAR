import { StoryObj, Meta } from '@storybook/react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { PiNotePencil } from 'react-icons/pi'
import { BottomNavbar } from '.'

const meta: Meta<typeof BottomNavbar> = {
  component: BottomNavbar,
  argTypes: {
    items: {
      control: {
        type: 'object'
      }
    }
  }
}

type Item = {
  path: string
  label: string
  icon: React.ReactNode
}

const items: Item[] = [
  { path: '/', label: 'Home', icon: <AiOutlineHome /> },
  { path: '/shop/search', label: 'Post', icon: <PiNotePencil /> },
  { path: '/profile', label: 'Profile', icon: <AiOutlineUser /> }
]

export default meta

type Story = StoryObj<typeof BottomNavbar>

export const Default: Story = {
  args: {
    items
  }
}
