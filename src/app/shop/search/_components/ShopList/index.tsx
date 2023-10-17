import React, { FC } from 'react'
import { Shop } from '@/store/features/shopSlice'
import { ShopItem } from '../ShopItem'

type Props = {
  shops: Shop[]
}

const ShopList: FC<Props> = ({ shops }) => {
  return (
    <div>
      {shops?.length ? (
        shops.map((shop: Shop, index: number) => <ShopItem key={shop.id | index} shop={shop} />)
      ) : (
        <p>検索結果に当てはまりませんでした</p>
      )}
    </div>
  )
}

export default ShopList
