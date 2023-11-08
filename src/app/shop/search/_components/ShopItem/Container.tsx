'use client'
import { FC } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { Shop, selectedShopAtom } from '@/app/shop/atom'

import ShopItemPresenter from './Presenter'

// 店舗情報を表示するコンテナンポーネント
type Props = {
  shop: Shop
}

const ShopItemContainer: FC<Props> = ({ shop }: { shop: Shop }) => {
  const [, setShop] = useAtom(selectedShopAtom)
  const router = useRouter()

  // 店舗情報をセットする関数を実行し、店舗情報をセットする
  const handleShopClick = () => {
    setShop(shop)
    router.push('/post/create')
  }
  return <ShopItemPresenter shop={shop} onClick={handleShopClick} />
}

export default ShopItemContainer
