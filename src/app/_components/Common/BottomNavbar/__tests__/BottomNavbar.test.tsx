import { render, screen } from '@testing-library/react'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { PiNotePencil } from 'react-icons/pi'
import { BottomNavbar } from '..'

describe('BottomNavbar', () => {
  const items = [
    { paths: ['/'], label: 'Home', icon: <AiOutlineHome /> },
    { paths: ['/shop/search', '/post/create'], label: 'Post', icon: <PiNotePencil /> },
    { paths: ['/profile'], label: 'Profile', icon: <AiOutlineUser /> }
  ]

  it('全ての項目を表示する', () => {
    render(<BottomNavbar items={items} path="/" />)
    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('現在のページの項目にはactiveクラスが付与される', () => {
    render(<BottomNavbar items={items} path="/" />)
    expect(screen.getByText('Home')).toHaveClass('border-b-2')
  })

  it('現在のページ以外の項目にはactiveクラスが付与されない', () => {
    render(<BottomNavbar items={items} path="/shop/search" />)
    expect(screen.getByText('Home')).not.toHaveClass('border-b-2')
    expect(screen.getByText('Post')).toHaveClass('border-b-2')
    expect(screen.getByText('Profile')).not.toHaveClass('border-b-2')
  })
})
