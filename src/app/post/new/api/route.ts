import { NextResponse } from "next/server";
import axios from "axios";

// 表示件数
export const SHOW_NUM = 10;

export async function GET(req: Request) {
  //APIの設定
  const { searchParams } = new URL(req.url);
  const apiurl = process.env.NEXT_PUBLIC_HOTPEPPER_API;
  const apikey = process.env.NEXT_PUBLIC_HOTPEPPER_API_KEY;

  //クエリパラメーターのkeywordを取得
  const keyword = searchParams.get("keyword");

  //表示件数
  let apiCount = `&count=${SHOW_NUM}`;

  // //何件目から取得するか
  // let apiNum = "&start=1";
  // if (req.query.startNum) {
  //   const resNum: any = req.query.startNum;
  //   const num = resNum * 10 - 9;
  //   apiNum = `&start=${num}`;
  // }

  //キーワード
  let apiKeyword = "";
  if (keyword) {
    apiKeyword = `&keyword=${keyword}`;
  }
  console.log(keyword);
  console.log(apiurl);
  console.log(apikey);
  console.log(`${apiurl}?key=${apikey}${apiCount}${apiKeyword}&format=json`);

  try {
    const resData = await fetch(
      `${apiurl}?key=${apikey}${apiCount}${apiKeyword}&format=json`
    );
    console.log(resData);
    const json = await resData.json();
    console.log(json);
    return NextResponse.json(resData);
  } catch (err: any) {
    console.log(err);
  }
}
