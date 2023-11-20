'use client'
import { Suspense } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import Loading from '@/app/loading'
import CreatePost from '@/app/post/create/_components/CreatePost'
import { selectedShopAtom } from '@/app/shop/atom'
import ShopInfo from '../_components/CardItem/ShopInfo/ShopInfo'

const NewPostPage = () => {
  const router = useRouter()
  const [selectedShop] = useAtom(selectedShopAtom) // 選択された店舗情報を取得
  if (!selectedShop) return router.back()
  const { name, address, lat, lng, large_area, urls } = selectedShop
  const url = urls.pc
  const restaurant = { name, address, lat, lng, area: large_area.name, url }

  return (
    <div className="pb-20">
      {/*店舗が選択されている場合はNavbarに店舗名を表示*/}
      <BackNavbar name="投稿作成" />
      {/* 日付選択 */}
      <div className="p-8">
        <Suspense fallback={<Loading />}>
          <CreatePost />
        </Suspense>

        {/*店舗が選択されている場合は店舗情報を表示 */}
        {selectedShop && <ShopInfo restaurant={restaurant} isDetail />}
      </div>
    </div>
  )
}

export default NewPostPage
