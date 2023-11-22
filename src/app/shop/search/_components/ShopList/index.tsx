import React, { FC } from 'react'
import { SelectedShop } from '../../../atom'
import { ShopItem } from '../ShopItem'

type Props = {
  shops: SelectedShop[]
}

const ShopList: FC<Props> = ({ shops }) => {
  return (
    <div className="flex flex-col  space-y-5 py-4">
      {shops?.length ? (
        shops.map((shop: SelectedShop, index: number) => <ShopItem key={shop.id | index} shop={shop} />)
      ) : (
        <p>検索結果に当てはまりませんでした</p>
      )}
    </div>
  )
}

export default ShopList
