'use client'
import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { Shop, setSelectedShop } from '@/store/features/shopSlice'

import ShopItemPresenter from './Presenter'

// 店舗情報を表示するコンテナンポーネント
type Props = {
  shop: Shop
}

const ShopItemContainer: FC<Props> = ({ shop }) => {
  const dispatch = useDispatch() // 店舗情報をセットする関数をshopSliceから取得
  const router = useRouter()

  // 店舗情報をセットする関数を実行し、店舗情報をセットする
  const handleShopClick = () => {
    dispatch(setSelectedShop(shop))
    router.push('/post/create')
  }
  return <ShopItemPresenter shop={shop} onClick={handleShopClick} />
}

export default ShopItemContainer
