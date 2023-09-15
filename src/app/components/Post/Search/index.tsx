"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import Input from "../../elements/Input";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchParams {
  keyword?: string;
  range?: string;
  lat?: string;
  lng?: string;
}

export const SearchShop: FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得
  // 現在地の緯度経度
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [searchText, setSearchText] = useState(""); // 検索テキスト

  // 現在地の緯度経度を取得する
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // パラメータを作成する
  const createQueryString = useCallback((params: SearchParams) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    return query.toString();
  }, []);

  // 検索テキストを更新する
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 検索フォームのプロパティ
  const serchProps = {
    text: searchText,
    handleInput: handleSearchInput,
    placeholder: "キーワード",
    icon: <AiOutlineSearch />,
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center pb-8 lg:justify-start">
      {/* 検索すフォーム */}
      <Input {...serchProps} />

      {/* 検索ボタン */}
      <button
        onClick={() => {
          const params: SearchParams = {
            keyword: searchText || undefined,
          };
          router.push(pathname + "?" + createQueryString(params));
        }}
        className="rounded-md mt-2 hover:bg-lime-900 lg:mt-0 lg:ml-2 w-[100%] lg:w-[100px] bg-[#017D01] text-white py-[10px] border-0 text-[14px] max-w-[400px] shadow shrink-0"
      >
        キーワードで検索する
      </button>

      {/* 現在地で検索ボタン */}
      <button
        onClick={() => {
          const params: SearchParams = {
            lat: location?.lat.toString(),
            lng: location?.lng.toString(),
            range: "5",
          };
          router.push(pathname + "?" + createQueryString(params));
        }}
        className="rounded-md mt-2 hover:bg-lime-900 lg:mt-0 lg:ml-2 w-[100%] lg:w-[100px] bg-[#017D01] text-white py-[10px] border-0 text-[14px] max-w-[400px] shadow shrink-0"
      >
        現在地で検索する
      </button>
    </div>
  );
};
