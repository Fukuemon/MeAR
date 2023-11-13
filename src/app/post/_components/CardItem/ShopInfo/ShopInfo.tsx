import { MapPin } from 'lucide-react'
import Link from 'next/link'
import { Restaurant } from '@/types/Post/types'

type Props = {
  restaurant: Restaurant
  isDetail?: boolean
}

export default function ShopInfo({ restaurant, isDetail }: Props) {
  return (
    <div className="my-2 border py-3  ">
      <div className="flex items-center truncate px-4  text-xs font-bold ">
        <span>
          <MapPin className="w-3" />
        </span>
        <h2 className="pl-1 ">{restaurant.name}</h2>
      </div>
      <div className="flex items-center text-ellipsis px-4 py-2 text-xs font-light text-slate-500  ">
        <h2 className="pl-1 ">{restaurant.address}</h2>
      </div>
      {isDetail && restaurant.url && (
        <div className="flex items-center text-ellipsis px-4 py-2 text-xs font-light text-blue-500 ">
          <Link href={restaurant.url}>
            <h2 className="pl-1 ">お店を見にいく</h2>
          </Link>
        </div>
      )}
    </div>
  )
}
