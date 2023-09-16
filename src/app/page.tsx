import { Mockdata } from "@/model/PostCard";
import PostCard from "src/app/components/Post/Card";
import Navbar from "./components/elements/Navbar";
import Link from "next/link";

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
