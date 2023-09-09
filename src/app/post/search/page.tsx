import { SearchShop } from "@/app/components/Post/Search";
import Navbar from "@/app/components/elements/Navbar";

interface SearchParams {
  keyword?: string;
  range?: number;
  lat?: number;
  lng?: number;
}

// hotpepper APIのエンドポイント
const defaultEndpoint = `${process.env.NEXT_PUBLIC_HOTPEPPER_API}?key=${process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY}&format=json&count=10`;

// クエリパラメータをを受け取るSearchPage(searchParams)
export default async function SearchShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  //　各パラメータを取得
  const { keyword, lat, lng, range } = searchParams;

  // APIパラメータを作成
  const apiParams = new URLSearchParams();

  // 各パラメータをセット
  if (keyword) apiParams.append("keyword", keyword); // keywordがあればセット

  // latとlngがあればセット
  if (lat !== undefined && lng !== undefined) {
    apiParams.append("lat", lat.toString());
    apiParams.append("lng", lng.toString());
  }
  // rangeがあればセット
  if (range !== undefined) apiParams.append("range", range.toString());

  // APIを叩く
  const res = await fetch(`${defaultEndpoint}&${apiParams.toString()}`);
  const data = await res.json();
  const shops = data.results.shop;

  return (
    <div>
      <Navbar title="店舗検索" />
      <div className="p-8">
        <SearchShop />
        <div>
          {!shops ? (
            <p>検索結果に当てはまりませんでした</p>
          ) : (
            shops.map((shop: any, index: number) => (
              <div key={shop.id || index}>
                <h2 className="text-lg py-2 font-bold">{shop.name}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
