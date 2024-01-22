import { FC } from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
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
  isPost?: boolean
  isProfile?: boolean
}

export const BackNavDropdown: FC<Props> = ({ user, onClickLogout, isPost, isProfile }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Settings className="text-3xl text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isPost && (
          <DropdownMenuItem>
            <DropdownMenuShortcut>
              <Settings />
            </DropdownMenuShortcut>
            投稿編集
          </DropdownMenuItem>
        )}
        {isProfile && (
          <Link href={`/profile/${user.id}/edit`}>
            <DropdownMenuItem>
              プロフィール編集
              <DropdownMenuShortcut>
                <User />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        )}
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
