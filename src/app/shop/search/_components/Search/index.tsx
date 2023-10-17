"use client";
import { FC, useState, ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import InputWithButton from "../../../../_components/Form/InputButtonCombo";
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

  // レンダリング時に位置情報を取得しt、クエリパラメータを作成してrouter.pushする(初期値として現在地付近の飲食店を検索する)
  // キーワード入力された場合は、キーワードを元にクエリパラメータを作成してrouter.pushする
  // 位置情報が取得できなかった場合は、キーワードを元にクエリパラメータを作成してrouter.pushする
  if (searchText === "" && location) {
    pushToRouter({
      lat: location.lat.toString(),
      lng: location.lng.toString(),
      range: "5",
    });
  }

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
      {searchText === "" && location && (
        <div>
          <p className="flex pt-4 text-5lx text-gray-500 justify-center items-center">
            (周辺の店舗情報)
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchShop;
