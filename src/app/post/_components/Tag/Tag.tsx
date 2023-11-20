import { TagIcon } from 'lucide-react'
import { cn } from '@/libs/tailwind/utils'

type Props = {
  name: string
  onClick?: () => void
  className?: string
  isSelect?: boolean
}

export default function Tag({ name, onClick, className, isSelect }: Props) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 rounded-full bg-primary/20 px-4 py-1 font-bold text-primary',
        className,
        isSelect && 'bg-primary text-white'
      )}
    >
      <TagIcon className={cn('h-5 w-5 text-primary', isSelect && 'text-white')} />
      {name}
    </span>
  )
}
