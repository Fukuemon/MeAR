import { atomWithStorage } from 'jotai/utils'

// Shopの型定義をそのまま使用
export interface SelectedShop {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  area: string
  large_area: {
    code: string
    name: string
  }
  urls: {
    pc: string
  }
  logo_image: string
}

type NoShopType = null

export type SelectedShopType = SelectedShop | NoShopType

export const SELECTED_SHOP_KEY = 'SELECTED_SHOP_KEY' as const
const initialState: NoShopType = null

// 選択された店舗情報を保持するatom
export const selectedShopAtom = atomWithStorage<SelectedShopType>(SELECTED_SHOP_KEY, initialState)
