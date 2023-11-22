'use client'
import { FC } from 'react'
import { useSetAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { SelectedShopType, selectedShopAtom } from '@/app/shop/atom'

import ShopItemPresenter from './Presenter'

// 店舗情報を表示するコンテナンポーネント
type Props = {
  shop: SelectedShopType
}

const ShopItemContainer: FC<Props> = ({ shop }: { shop: SelectedShopType | null }) => {
  const setShop = useSetAtom(selectedShopAtom)
  const router = useRouter()

  // 店舗情報をセットする関数を実行し、店舗情報をセットする
  const handleShopClick = () => {
    if (shop) {
      setShop(shop)
      router.push('/post/create')
    }
  }
  return shop ? <ShopItemPresenter shop={shop} onClick={handleShopClick} /> : null
}

export default ShopItemContainer
