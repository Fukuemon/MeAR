import { SearchShop } from "@/app/components/Shop/Search";
import Navbar from "@/app/components/elements/Navbar";

interface SearchParams {
  keyword?: string;
  range?: number;
  lat?: number;
  lng?: number;
}

const defaultEndpoint = `${process.env.NEXT_PUBLIC_HOTPEPPER_API}?key=${process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY}&format=json&count=10`;

export default async function SearchShopPage({
  searchParams,
}: {
  searchParams: SearchParams; // クエリパラメータ(?keyword=〇〇&lat=〇〇&lng=〇〇&range=〇〇)を受け取る
}) {
  const { keyword, lat, lng, range } = searchParams; // クエリパラメータを分割代入

  const apiParams = new URLSearchParams(); // URLSearchParamsをインスタンス化 (クエリパラメータを作成するためのクラス)

  // クエリパラメータを作成する関数
  const appendParam = (key: string, value: number | string | undefined) => {
    if (value !== undefined) apiParams.append(key, value.toString()); // valueがundefinedでなければクエリパラメータを追加
  };

  appendParam("keyword", keyword);
  appendParam("lat", lat);
  appendParam("lng", lng);
  appendParam("range", range);

  // APIを叩く
  try {
    const res = await fetch(`${defaultEndpoint}&${apiParams.toString()}`);
    const data = await res.json();
    const shops = data.results.shop;

    return (
      <div>
        <Navbar title="店舗検索" />
        <div className="p-8">
          <SearchShop />
          <div>
            {shops?.length ? (
              shops.map((shop: any, index: number) => (
                <div key={shop.id || index}>
                  <h2 className="text-lg py-2 font-bold">{shop.name}</h2>
                </div>
              ))
            ) : (
              <p>検索結果に当てはまりませんでした</p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error: unknown) {
    // エラー処理
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    return <div>Error fetching data: {errorMessage}</div>;
  }
}
