import { atom } from 'jotai'

// Shopの型定義をそのまま使用
export interface Shop {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  area: string
}

// 選択された店舗情報を保持するatom
export const selectedShopAtom = atom<Shop | null>(null)
