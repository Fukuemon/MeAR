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
        <DialogContent className="absolute mt-56 w-full py-40">
          <DialogHeader className="absolute left-44 top-10">
            <DialogTitle>タグを追加</DialogTitle>
          </DialogHeader>
          <DialogHeader>
            {/* タグ一覧表示 */}
            <div className="flex flex-wrap">
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
            className="absolute bottom-8 left-4 h-10 w-36 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            タグを追加
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  )
}
