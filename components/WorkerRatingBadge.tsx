import { FaStar } from 'react-icons/fa'

interface WorkerRatingBadgeProps {
  rating?: string
}

export default function WorkerRatingBadge({ rating }: WorkerRatingBadgeProps) {
  if (!rating) return null

  const stars = parseInt(rating.charAt(0)) || 0

  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={`w-4 h-4 ${
            index < stars ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-1">{rating}</span>
    </div>
  )
}