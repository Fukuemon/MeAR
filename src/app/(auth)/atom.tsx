import { atom } from 'jotai'

// Shopの型定義をそのまま使用
export type LoginUserType = {
  account: number
  username: string
  img?: string | null
}

// 選択された店舗情報を保持するatom
export const LoginUserAtom = atom<LoginUserType | null>(null)
