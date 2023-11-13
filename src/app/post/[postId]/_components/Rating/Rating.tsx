import { Star } from 'lucide-react'

export default function Rating({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`fill-current text-2xl ${i < score ? 'text-yellow-400' : 'text-gray-400'}`} />
      ))}
    </div>
  )
}
