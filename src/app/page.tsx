import { AuthorModel, PostCardModel, RestaurantModel } from "@/model/PostCard";
import PostCard from "src/app/components/Post/Card";

// PostCardに渡すデータ(仮)
const data = {
  author: AuthorModel,
  post: PostCardModel,
  restaurant: RestaurantModel,
  isLike: true,
};

export default function Home() {
  return (
    <main className="h-screen bg-gray-100 flex items-center justify-center">
      <PostCard {...data} />
    </main>
  );
}
