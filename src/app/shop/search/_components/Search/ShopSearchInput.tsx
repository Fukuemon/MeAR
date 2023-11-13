'use client'
import { useState, ChangeEvent, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Input } from '@/components/ui/input'
import useLocation from './hooks/useLocation'
import useQueryString from './hooks/useQueryString'

interface SearchParams {
  keyword?: string
  range?: string
  lat?: string
  lng?: string
}

export default function ShopSearchInput() {
  const router = useRouter()
  const location = useLocation() // 現在地を取得するカスタムフック
  const createQueryString = useQueryString()

  const [searchText, setSearchText] = useState('')
  const [query] = useDebounce(searchText, 500)

  useEffect(() => {
    if (!query && location) {
      // 初期の位置情報に基づく検索
      pushToRouter({
        lat: location.lat.toString(),
        lng: location.lng.toString(),
        range: '4'
      })
    } else if (query) {
      // キーワードに基づく検索
      pushToRouter({
        keyword: query
      })
    }
  }, [query, location])

  const pushToRouter = (params: SearchParams) => {
    router.push(`?${createQueryString(params)}`)
  }

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <div className="relative rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="z-50 h-5 w-5 text-gray-400" />
      </div>
      <Input value={searchText} onChange={handleSearchInput} placeholder="キーワード" className="block ps-10" />
    </div>
  )
}
