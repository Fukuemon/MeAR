import { SearchShop } from "@/app/components/Post/Search";
import Navbar from "@/app/components/elements/Navbar";

const defaultEndpoint = `${process.env.NEXT_PUBLIC_HOTPEPPER_API}?key=${process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY}&format=json&count=10`;

export default async function SearchShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const keyword = searchParams.keyword;

  const res = await fetch(`${defaultEndpoint}&keyword=${keyword}`);
  const data = await res.json();
  const shops = data.results.shop;
  return (
    <div>
      <Navbar title="店舗検索" />
      <div className="p-8 ">
        <SearchShop />
        <div>
          {shops.length === 0 ? (
            <p>検索結果に当てはまりませんでした</p>
          ) : (
            shops.map((shop: any, index: number) => (
              <div key={index}>
                <h2 className="text-lg py-2 font-bold">{shop.name}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
