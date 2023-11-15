import { useState } from 'react'
import clsx from 'clsx'
import { Star } from 'lucide-react'

type Props = {
  value: number
  onChange: (value: number) => void
  totalStars?: number
}
export default function StarRating({ value, onChange, totalStars = 5 }: Props) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex items-center">
      <p className="text-base text-gray-700">評価：</p>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1

        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={ratingValue}
              checked={ratingValue === value}
              onChange={() => onChange(ratingValue)}
            />
            <Star
              className={clsx(
                'cursor-pointer fill-current',
                ratingValue <= (hover || value) ? 'text-yellow-400' : 'text-gray-300'
              )}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              size={20}
            />
          </label>
        )
      })}
    </div>
  )
}
