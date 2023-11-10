import { atomWithStorage } from 'jotai/utils'

// Shopの型定義をそのまま使用
export type LoginUserType = {
  id: number
  username: string
  img?: string | null
}

// 選択された店舗情報を保持するatom
export const LoginUserAtom = atomWithStorage<LoginUserType | null>('profile', null)
