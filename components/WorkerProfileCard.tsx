import Link from 'next/link'
import WorkerRatingBadge from './WorkerRatingBadge'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface WorkerProfileCardProps {
  worker: any
}

export default function WorkerProfileCard({ worker }: WorkerProfileCardProps) {
  const metadata = worker.metadata || {}

  return (
    <Link href={`/workers/${worker.slug}`} className="block">
      <div className="card p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-4 mb-4">
          {metadata.profile_photo && (
            <img
              src={`${metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={metadata.worker_name || worker.title}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
              {metadata.worker_name || worker.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2">{metadata.business_name}</p>
            <WorkerRatingBadge rating={metadata.rating?.value} />
          </div>
        </div>

        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <FaMapMarkerAlt className="w-4 h-4" />
          <span>{metadata.location || 'Not specified'}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {metadata.specialization?.slice(0, 3).map((spec: string) => (
            <span key={spec} className="badge badge-blue text-xs">
              {spec}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}