import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// ここで型を定義する
export interface Shop {
  id: number; // 店舗ID
  name: string; // 店舗名
  address: string; // 住所
  lat: number; // 緯度
  lng: number; // 経度
  imageUr?: string; // 店舗画像
  urls: string; // 店舗のURL
}

interface ShopState {
  selectedShop: Shop | null;
}

const initialState: ShopState = {
  selectedShop: null,
};

// 店舗情報を管理する
export const shopSlice = createSlice({
  name: "shop", // sliceの名前
  initialState,
  reducers: {
    // reducerの定義(選択された店舗情報をセットする)
    setSelectedShop: (state, action: PayloadAction<Shop | null>) => {
      state.selectedShop = action.payload;
    },
  },
});

// action creator(Stateに対して何かを行う関数)
export const { setSelectedShop } = shopSlice.actions; // action creator(選択された店舗情報をセットする)

interface RootState {
  // RootStateの型を定義する
  shop: ShopState;
}

export const selectSelectedShop = (state: RootState) => state.shop.selectedShop; // selector(選択された店舗情報を取得する)

export default shopSlice.reducer; // reducer
