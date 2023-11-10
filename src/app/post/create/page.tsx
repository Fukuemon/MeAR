'use client'
import { useAtom } from 'jotai'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import CreatePost from '@/app/post/create/_components/CreatePost'
import { selectedShopAtom } from '@/app/shop/atom'

const NewPostPage = () => {
  const [selectedShop] = useAtom(selectedShopAtom) // 選択された店舗情報を取得

  return (
    <div>
      {/*店舗が選択されている場合はNavbarに店舗名を表示*/}
      <BackNavbar name={`店舗名：${selectedShop?.name}`} />
      {/* 日付選択 */}
      <div className="p-8">
        <CreatePost />

        {/*店舗が選択されている場合は店舗情報を表示 */}
        {selectedShop && (
          <div>
            <h2 className="py-2 text-lg font-bold">店舗情報</h2>
            {/* 店舗の住所 */}
            <p className="py-2 text-lg">住所: {selectedShop.address}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewPostPage
