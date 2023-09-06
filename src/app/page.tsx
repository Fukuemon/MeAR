import { AuthorModel, PostCardModel, RestaurantModel } from "@/model/PostCard";
import PostCard from "src/app/components/Post/Card";
import Navbar from "./components/elements/Navbar";
import Link from "next/link";

// PostCardに渡すデータ(仮)
export const Mockdata = {
  author: AuthorModel,
  post: PostCardModel,
  restaurant: RestaurantModel,
  isLike: true,
};

export default function Home() {
  return (
    <div>
      <Navbar title="投稿一覧" />
      <main className="flex py-8 justify-center">
        <Link href="/post/">
          <PostCard {...Mockdata} />
        </Link>
      </main>
    </div>
  );
}
