import Image from 'next/image'

// 店舗情報を表示するプレゼンテーショナルコンポーネント
type PresentationProps = {
  readonly shop: {
    readonly id: number
    readonly name: string
    readonly address: string
    readonly logo_image: string
  }
  readonly onClick: () => void
}

export default function ShopItemPresenter({ shop, onClick }: PresentationProps) {
  return (
    <div key={shop.id} onClick={onClick} className="cursor-pointer flex-col">
      <div className="flex">
        <div className="self-center">
          <Image
            src={shop.logo_image ?? '/user.png'}
            alt={shop.name}
            width={50}
            height={50}
            className=" rounded-full"
          />
        </div>

        <div className="ml-4 flex flex-col justify-center">
          <h2 className=" text-base font-bold">{shop.name}</h2>
          <p className="text-xs font-thin text-gray-400">{shop.address}</p>
        </div>
      </div>
    </div>
  )
}
