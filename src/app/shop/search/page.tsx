// SearchShopPage.tsx
import { Suspense } from 'react'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import ShopSearchInput from './_components/Search/ShopSearchInput'
import ShopList from './_components/ShopList'
import { SearchParams, getShopList } from './lib/getSearchShopList'

export default async function SearchShopPage({ searchParams }: { searchParams: SearchParams }) {
  console.log(searchParams)
  const shops = await getShopList(searchParams)
  console.log(shops)
  return (
    <div>
      <BackNavbar name="店舗検索" />
      <main className="flex flex-col items-center justify-center p-8">
        <ShopSearchInput />
        <Suspense fallback={<div>loading...</div>}>
          <ShopList shops={shops} />
        </Suspense>
      </main>
    </div>
  )
}
