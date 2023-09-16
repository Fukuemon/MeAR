import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "./features/shopSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    // reducerをここに追加
  },
  devTools: process.env.NODE_ENV !== "production", //　開発環境のみ有効
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
