// SearchShopPage.tsx
import { Suspense } from 'react'
import { BackNavbar } from '@/app/_components/Common/BackNavbar/BackNavigationBar'
import { BottomNavbarContainer } from '@/app/_components/Common/BottomNavbar'
import Loading from '@/app/loading'
import ShopSearchInput from './_components/Search/ShopSearchInput'
import ShopList from './_components/ShopList'
import { SearchParams, getShopList } from './lib/getSearchShopList'

export default async function SearchShopPage({ searchParams }: { searchParams: SearchParams }) {
  const shops = await getShopList(searchParams)
  return (
    <div>
      <BackNavbar name="店舗検索" />
      <main className="flex flex-col  px-2 py-8">
        <div className="flex items-center justify-center">
          <ShopSearchInput />
        </div>

        <div className="px-4 pt-4 md:flex md:flex-col md:items-center md:justify-center">
          {searchParams.lat && searchParams.lng && <p className="w-24 border-b text-lg font-bold">周辺の店舗</p>}
          <Suspense fallback={<Loading />}>
            <ShopList shops={shops} />
          </Suspense>
        </div>
      </main>
      <BottomNavbarContainer />
    </div>
  )
}
