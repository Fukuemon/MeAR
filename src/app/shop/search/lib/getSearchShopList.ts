import { SelectedShop } from '../../atom'

export type SearchParams = {
  keyword?: string
  range?: number
  lat?: number
  lng?: number
}

const defaultEndpoint = `${process.env.NEXT_PUBLIC_HOTPEPPER_API}?key=${process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY}&format=json&count=10`
// getShopList.ts
export async function getShopList(searchParams: SearchParams): Promise<SelectedShop[]> {
  const apiParams = new URLSearchParams()
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined) apiParams.append(key, value.toString())
  })
  console.log(`${defaultEndpoint}&${apiParams.toString()}`)
  const response = await fetch(`${defaultEndpoint}&${apiParams.toString()}`)
  const data = await response.json()
  return data.results.shop
}
