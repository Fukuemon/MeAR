"use client";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Shop, setSelectedShop } from "@/store/features/shopSlice";

type Props = {
  shop: Shop;
};

// 店舗情報を表示するコンポーネント
const ShopItem: FC<Props> = ({ shop }) => {
  const dispatch = useDispatch(); // 店舗情報をセットする関数をshopSliceから取得
  const router = useRouter();

  // 店舗情報をセットする関数を実行し、店舗情報をセットする
  const handleShopClick = () => {
    dispatch(setSelectedShop(shop));
    router.push("/post/create");
  };

  return (
    <div key={shop.id} onClick={handleShopClick}>
      <h2 className="text-lg py-2 font-bold">{shop.name}</h2>
    </div>
  );
};

export default ShopItem;
