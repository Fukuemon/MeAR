import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // reducerをここに追加
  },
  devTools: process.env.NODE_ENV !== "production", //　開発環境のみ有効
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
