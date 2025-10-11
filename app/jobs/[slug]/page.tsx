// app/jobs/[slug]/page.tsx
import { getJobPosting } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import JobStatusBadge from '@/components/JobStatusBadge'
import { FaMapMarkerAlt, FaCalendar, FaRupeeSign, FaUser } from 'react-icons/fa'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function JobDetailPage({ params }: PageProps) {
  const { slug } = await params
  const job = await getJobPosting(slug)

  if (!job) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
        </div>
      </DashboardLayout>
    )
  }

  const metadata = job.metadata || {}

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <JobStatusBadge status={metadata.job_status?.value} />
          </div>
          <p className="text-xl text-gray-600">{metadata.company_name}</p>
        </div>

        {/* Key Details */}
        <div className="card p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{metadata.location || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FaCalendar className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Deadline</p>
                <p className="font-medium">{metadata.deadline || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FaRupeeSign className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Budget Range</p>
                <p className="font-medium">{metadata.budget_range || 'Not specified'}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <FaUser className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{metadata.company_contact || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: metadata.job_description || '' }}
          />
        </div>

        {/* Material Specification */}
        {metadata.material_specification && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Material Specification</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{metadata.material_specification}</p>
          </div>
        )}

        {/* Technical Drawings */}
        {metadata.technical_drawings && metadata.technical_drawings.length > 0 && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Technical Drawings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metadata.technical_drawings.map((drawing: any, index: number) => (
                <a
                  key={index}
                  href={drawing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={`${drawing.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={`Technical drawing ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg border border-gray-200 hover:opacity-90 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}