import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// 表示件数
export const SHOW_NUM = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //APIの設定
  const apiurl = process.env.NEXT_PUBLIC_API_URL;
  const apikey = `&key=${process.env.NEXT_PUBLIC_API_KEY}`;

  //表示件数
  let apiCount = `&count=${SHOW_NUM}`;
  if (req.query.count) {
    apiCount = `&count=${req.query.count}`;
  }

  //何件目から取得するか
  let apiNum = "&start=1";
  if (req.query.startNum) {
    const resNum: any = req.query.startNum;
    const num = resNum * 10 - 9;
    apiNum = `&start=${num}`;
  }

  //キーワード
  let apiKeyword = "";
  if (req.query.keyword) {
    apiKeyword = `&keyword=${req.query.keyword}`;
  }

  try {
    const resData = await axios.get(
      `${apiurl}${apikey}}${apiCount}${apiKeyword}${apiNum}`
    );
    const shopLists = resData.data.result;

    res.status(200).json(shopLists);
  } catch (err: any) {
    console.log(err);
    res.status(err);
  }
}
