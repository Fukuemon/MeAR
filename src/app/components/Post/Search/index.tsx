"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useState, ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import InputWithButton from "../../elements/InputWithButtonIcon";
import { Button } from "@/components/ui/button";

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
    handlePushLocation();
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

  // 検索ボタンを押したときの処理
  const handlePushSearch = () => {
    const params: SearchParams = {
      keyword: searchText || undefined,
    };
    router.push(pathname + "?" + createQueryString(params));
  };

  const handlePushLocation = () => {
    const params: SearchParams = {
      lat: location?.lat.toString(),
      lng: location?.lng.toString(),
      range: "5",
    };
    router.push(pathname + "?" + createQueryString(params));
  };

  // 検索フォームのプロパティ
  const searchProps = {
    inputProps: {
      value: searchText,
      placeholder: "キーワード",
    },
    buttonProps: {
      // ここに必要な ButtonProps を追加します
      className: "bg-green-700 hover:bg-green-900 text-white w-24",
    },
    icon: <AiOutlineSearch />,
    handleInput: handleSearchInput,
    handleClick: handlePushSearch,
    isButton: true,
  };

  return (
    <div className="flex flex-col lg:flex-nowrap justify-center pb-4 lg:justify-start">
      {/* 検索バー */}
      <InputWithButton {...searchProps} isButton={true}>
        検索
      </InputWithButton>

      {/* 現在地で検索ボタン */}
      <Button
        onClick={handlePushLocation}
        className="rounded-md mt-4 bg-green-700 hover:bg-green-900 text-white container h-8 max-w-sm"
      >
        現在地付近の飲食店を検索する
      </Button>
    </div>
  );
};
