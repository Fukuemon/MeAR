"use client";
import { useSelector } from "react-redux";
import { selectSelectedShop } from "@/store/features/shopSlice";
import Link from "next/link";
import { PostNavbar } from "@/app/components/elements/Navbar/Back";
import CreatePost from "@/app/components/Post/New";

const NewPostPage = () => {
  const selectedShop = useSelector(selectSelectedShop); // 選択された店舗情報を取得

  return (
    <div>
      {/*店舗が選択されている場合はNavbarに店舗名を表示*/}
      <PostNavbar name={`店舗名：${selectedShop?.name}`} />
      {/* 日付選択 */}
      <div className="p-8">
        <CreatePost />

        {/*店舗が選択されている場合は店舗情報を表示 */}
        {selectedShop && (
          <div>
            <h2 className="text-lg py-2 font-bold">店舗情報</h2>
            {/* 店舗の住所 */}
            <p className="text-lg py-2">住所: {selectedShop.address}</p>
            <Link
              href={selectedShop.urls.pc}
              className="text-lg py-2 text-blue-500"
            >
              公式サイト
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPostPage;
