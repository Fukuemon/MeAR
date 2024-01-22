' use client '
import { useState } from 'react'
import Tag from '@/app/post/_components/Tag/Tag'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TagType } from '@/types/Post/types'

type Props = {
  tags: TagType[]
  onSelect: (tags: TagType[]) => void
}

export function TagSelectModal({ tags, onSelect }: Props) {
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]) // 選択されたタグ
  const toggleTag = (tag: TagType) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSubmit = () => {
    onSelect(selectedTags)
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-500 text-white hover:bg-green-900"># タグを追加</Button>
        </DialogTrigger>
        <DialogContent className="w-full rounded-xl">
          <DialogHeader className="my-2 text-center">
            <DialogTitle>タグを追加</DialogTitle>
          </DialogHeader>
          <DialogHeader>
            {/* タグ一覧表示 */}
            <div className="flex flex-wrap space-x-3 pb-6">
              {tags &&
                tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    name={tag.tag}
                    onClick={() => toggleTag(tag)}
                    isSelect={selectedTags.includes(tag)}
                  />
                ))}
            </div>
          </DialogHeader>
          <DialogClose
            onClick={handleSubmit}
            className="w-28 rounded-xl bg-green-500 px-4 py-2 text-left font-bold text-white hover:bg-green-900"
          >
            タグを追加
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
