import { AuthorModel, PostCardModel, RestaurantModel } from "@/model/PostCard";
import PostCard from "src/app/components/Post/Card";
import Navbar from "./components/elements/Navbar";

// PostCardに渡すデータ(仮)
const data = {
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
        <PostCard {...data} />
      </main>
    </div>
  );
}
