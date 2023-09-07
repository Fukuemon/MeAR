"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export const SearchShop = () => {
  const router = useRouter();
  const pathname = usePathname(); //現在のパスを取得
  const searchParams = useSearchParams()!; //現在のsearchParams(パラメーター)を取得

  //searchParams(パラメーター)を受けとり、新しいsearchParams文字列を取得する。
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const query = new URLSearchParams(searchParams);
      query.set(name, value);

      return query.toString();
    },
    [searchParams]
  );

  //キーワード入力テキスト
  const [searchText, setSearchText] = useState("");

  /**
   * キーワード入力を取得
   */
  const handleSearchInput = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center pb-8 lg:justify-start">
      {/* キーワード */}
      <div className="w-[100%] lg:w-[35%] lg:ml-2 mt-1 lg:mt-0">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchInput}
          placeholder="キーワード"
          className="border-[1px] h-[100%] lg:border-t-2 lg:border-l-0 border-[#999s] w-[100%] py-[10px] px-3 text-[14px] outline-none rounded-md shadow"
        />
      </div>

      {/* 検索 */}
      <button
        onClick={() => {
          router.push(
            pathname + "?" + createQueryString("keyword", searchText)
          );
        }}
        className="rounded-md mt-2 lg:mt-0 lg:ml-2 w-[100%] lg:w-[100px] bg-[#017D01] text-white py-[10px] border-0 text-[14px] max-w-[400px] shadow shrink-0"
      >
        検索する
      </button>
    </div>
  );
};
