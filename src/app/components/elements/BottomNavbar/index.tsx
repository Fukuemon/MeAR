"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { PiNotePencil } from "react-icons/pi";
import { BiUser } from "react-icons/bi";

// ボトムナビゲーションバー：画面下に固定し、それぞれの画面に遷移する
const BottomNavbar = () => {
  //　メニューアイコンの定義
  const Menus = [
    { name: "Home", icon: <AiOutlineHome />, dis: "translate-x-0", link: "/" },
    {
      name: "Post",
      icon: <PiNotePencil />,
      dis: "translate-x-16",
      link: "/post/search",
    },
    {
      name: "Profile",
      icon: <BiUser />,
      dis: "translate-x-32",
      link: "/profile",
    },
  ];
  const [active, setActive] = useState(0);

  return (
    // ボトムナビゲーションバー
    // メニューの数だけループして、それぞれのメニューを表示する
    <div className="fixed bottom-0 left-0 z-50 w-full  bg-orange-100 h-16 px-6 rounded-t-xl">
      <ul className="flex justify-between relative">
        {Menus.map((menu, i) => (
          <li key={i} className="">
            <Link
              href={menu.link}
              className="flex flex-col text-center justify-center items-center "
              onClick={() => setActive(i)}
            >
              <span
                className={`text-5xl text-text cursor-pointer duration-500 ${
                  i === active &&
                  "-mt-6 bg-orange-100 rounded-full p-4 pb-0 border-t-2 border-gray-200"
                }`}
              >
                {menu.icon}
                <span className="bg-white round-full w-16 h-16"></span>
              </span>
              <span
                className={`${
                  active === i
                    ? ` duration-700 opacity-100 `
                    : `opacity-0 translate-y-10`
                }`}
              >
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomNavbar;
