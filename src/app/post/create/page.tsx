'use client'
import { useAtom } from 'jotai'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import CreatePost from '@/app/post/create/_components/CreatePost'
import { selectedShopAtom } from '@/app/shop/atom'
import ShopInfo from '../_components/CardItem/ShopInfo/ShopInfo'

const NewPostPage = () => {
  const [selectedShop] = useAtom(selectedShopAtom) // 選択された店舗情報を取得

  return (
    <div>
      {/*店舗が選択されている場合はNavbarに店舗名を表示*/}
      <BackNavbar name="投稿作成" />
      {/* 日付選択 */}
      <div className="p-8">
        <CreatePost />

        {/*店舗が選択されている場合は店舗情報を表示 */}
        {selectedShop && <ShopInfo restaurant={selectedShop} />}
      </div>
    </div>
  )
}

export default NewPostPage
