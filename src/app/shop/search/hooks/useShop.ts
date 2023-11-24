import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { SELECTED_SHOP_KEY, SelectedShopType, selectedShopAtom } from '../../atom'

const checkLocalStorageShop = (shop: SelectedShopType): boolean => {
  const storageShop = localStorage.getItem(SELECTED_SHOP_KEY)
  if (storageShop === null) {
    return shop === null
  } else {
    const parsedShop = JSON.parse(storageShop)
    return JSON.stringify(parsedShop) === JSON.stringify(shop)
  }
}

export const useShop = () => {
  const shop = useAtomValue(selectedShopAtom)
  console.log(shop)
  const [isReady, setIsReady] = useState<boolean>(false)
  useEffect(() => {
    setIsReady(checkLocalStorageShop(shop))
  }, [shop])

  return { shop, isReady }
}
