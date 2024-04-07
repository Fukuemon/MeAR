import { FC } from 'react'
import { LogOut } from 'lucide-react'
import { LoginUserType } from '@/app/(auth)/atom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DropdownMenuShortcut } from '@/components/ui/dropdown-menu'

type Props = {
  user: LoginUserType
  onClickLogout: () => void
}

export const FeedNavDropdown: FC<Props> = ({ user, onClickLogout }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">
          <img src={user.img ?? '/user.png'} alt="username" className="h-[40px] w-[40px] rounded-full" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onClickLogout}>
          ログアウト
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
