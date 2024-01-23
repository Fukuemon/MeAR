'use client'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { PostListItem } from '@/types/Post/types'
import { useGetPostList } from '../../hooks/useGetPostList'
import PostCardItem from '../CardItem'

export function PostCardList({ pageId }: { pageId: string }) {
  const router = useRouter()

  const { postList, error } = useGetPostList(pageId)
  if (error) {
    return <div>error</div>
  }
  if (!postList) {
    return <Loading />
  }

  // countからページネーションの数を決める
  const count = postList.count
  const pageCount = Math.ceil(count / 3)
  const nextPage = `/?page=${Number(pageId) + 1}`
  const previousPage = `/?page=${Number(pageId) - 1}`

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex max-w-2xl flex-col  md:items-center md:justify-center">
        {postList.results.map((post: PostListItem) => {
          return <PostCardItem key={post.id} post={post} />
        })}
      </div>
      {/* ペジネーション */}
      <Pagination>
        <PaginationContent>
          {pageId != '1' && (
            <PaginationItem>
              <PaginationPrevious href={previousPage} />
            </PaginationItem>
          )}
          {/* pageの数だけ繰り返す */}
          {Array.from(Array(pageCount), (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={`/?page=${i + 1}`}
                isActive={Number(pageId) === i + 1}
                onClick={() => router.push(`/?page=${i + 1}`)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* 一以上だったら */}
          {Number(pageCount) > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Number(pageId) != pageCount && (
            <PaginationItem>
              <PaginationNext href={nextPage} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  )
}
