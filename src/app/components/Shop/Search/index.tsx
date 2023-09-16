"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState, ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import InputWithButton from "../../elements/InputButtonCombo";
import { Button } from "@/components/ui/button";
import useLocation from "./hooks/useLocation";
import useQueryString from "./hooks/useQueryString";

interface SearchParams {
  keyword?: string;
  range?: string;
  lat?: string;
  lng?: string;
}

// 検索ボックス
export const SearchShop: FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // 現在のパスを取得
  const location = useLocation(); // 現在地を取得するカスタムフック
  const createQueryString = useQueryString(); // クエリパラメータを作成するカスタムフック

  const [searchText, setSearchText] = useState("");

  // クエリパラメータを作成してrouter.pushする
  const pushToRouter = (params: SearchParams) => {
    router.push(pathname + "?" + createQueryString(params));
  };

  // 検索ボックスの入力値をstateに保存
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // 検索ボタンを押したときの処理
  const handlePushSearch = () => {
    pushToRouter({ keyword: searchText || undefined }); // キーワードを元にクエリパラメータを作成してrouter.pushする
  };

  // 現在地付近の飲食店を検索する
  const handlePushLocation = () => {
    if (location) {
      pushToRouter({
        // クエリパラメータを作成してrouter.pushする
        lat: location.lat.toString(), // 緯度
        lng: location.lng.toString(), // 経度
        range: "5", // 範囲
      });
    }
  };

  // 検索ボックスのprops
  const searchProps = {
    inputProps: {
      value: searchText,
      placeholder: "キーワード",
    },
    buttonProps: {
      className: "bg-green-700 hover:bg-green-900 text-white w-24",
    },
    icon: <AiOutlineSearch />,
    handleInput: handleSearchInput,
    handleClick: handlePushSearch,
    isButton: true,
  };

  return (
    <div className="flex flex-col lg:flex-nowrap justify-center pb-4 lg:justify-start">
      <InputWithButton {...searchProps}>検索</InputWithButton>
      <Button
        onClick={handlePushLocation}
        className="rounded-md mt-4 bg-green-700 hover:bg-green-900 text-white container h-8 max-w-sm"
      >
        現在地付近の飲食店を検索する
      </Button>
    </div>
  );
};

export default SearchShop;
