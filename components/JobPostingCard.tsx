import Link from 'next/link'
import JobStatusBadge from './JobStatusBadge'
import { FaMapMarkerAlt, FaCalendar, FaRupeeSign } from 'react-icons/fa'

interface JobPostingCardProps {
  job: any
}

export default function JobPostingCard({ job }: JobPostingCardProps) {
  const metadata = job.metadata || {}

  return (
    <Link href={`/jobs/${job.slug}`} className="block">
      <div className="card p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
            <p className="text-gray-600">{metadata.company_name}</p>
          </div>
          <JobStatusBadge status={metadata.job_status?.value} />
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{metadata.location || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendar className="w-4 h-4" />
            <span>Deadline: {metadata.deadline || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaRupeeSign className="w-4 h-4" />
            <span>{metadata.budget_range || 'Not specified'}</span>
          </div>
        </div>

        {job.thumbnail && (
          <div className="mt-4">
            <img
              src={`${job.thumbnail}?w=600&h=200&fit=crop&auto=format,compress`}
              alt={job.title}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </Link>
  )
}