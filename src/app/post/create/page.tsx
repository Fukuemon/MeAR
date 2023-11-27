'use client'
import { useRouter } from 'next/navigation'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import Loading from '@/app/loading'
import CreatePost from '@/app/post/create/_components/CreatePost'

import { useShop } from '@/app/shop/search/hooks/useShop'
import ShopInfo from '../_components/CardItem/ShopInfo/ShopInfo'

export default function NewPostPage() {
  const { shop, isReady } = useShop() // 選択された店舗情報を取得]

  const router = useRouter()

  if (!isReady) return <Loading />
  if (!shop) return router.back()

  const { name, address, lat, lng, large_area, urls } = shop
  const url = urls.pc
  const restaurant = { name, address, lat, lng, area: large_area.name, url }

  return (
    <div className="pb-20">
      {/*店舗が選択されている場合はNavbarに店舗名を表示*/}
      <BackNavbar name="投稿作成" />
      {/* 日付選択 */}
      <div className="flex flex-col items-center justify-center p-8">
        <div className="max-w-[640px]">
          <div className="p-8">
            <CreatePost />
          </div>

          {/*店舗が選択されている場合は店舗情報を表示 */}
          {shop && <ShopInfo restaurant={restaurant} isDetail />}
        </div>
      </div>
    </div>
  )
}
