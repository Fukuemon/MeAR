import { SearchShop } from "@/app/components/Post/Search";
import Navbar from "@/app/components/elements/Navbar";

const defaultEndpoint = `${process.env.NEXT_PUBLIC_HOTPEPPER_API}?key=${process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY}&format=json&count=10`;

export default async function SearchShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const keyword = searchParams.keyword;
  let apiKeyword = "";
  if (keyword !== null) {
    apiKeyword = `&keyword=${keyword}`;
  }

  const res = await fetch(`${defaultEndpoint}${apiKeyword}`);
  const data = await res.json();
  console.log(apiKeyword);
  console.log(data);
  const shops = data.results.shop;
  console.log(shops);
  return (
    <div>
      <Navbar title="店舗検索" />
      <div className="p-8 ">
        <SearchShop />
        <div>
          {!shops ? (
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
