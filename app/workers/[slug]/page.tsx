// app/workers/[slug]/page.tsx
import { getWorkerProfile } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import WorkerRatingBadge from '@/components/WorkerRatingBadge'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCertificate } from 'react-icons/fa'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function WorkerDetailPage({ params }: PageProps) {
  const { slug } = await params
  const worker = await getWorkerProfile(slug)

  if (!worker) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Worker not found</h1>
        </div>
      </DashboardLayout>
    )
  }

  const metadata = worker.metadata || {}

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-6">
            {metadata.profile_photo && (
              <img
                src={`${metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
                alt={metadata.worker_name || worker.title}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
              />
            )}
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {metadata.worker_name || worker.title}
                </h1>
                <WorkerRatingBadge rating={metadata.rating?.value} />
              </div>
              <p className="text-xl text-gray-600 mb-4">{metadata.business_name}</p>
              
              <div className="flex flex-wrap gap-2">
                {metadata.specialization?.map((spec: string) => (
                  <span key={spec} className="badge badge-blue">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-400" />
              <span>{metadata.location || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="w-5 h-5 text-gray-400" />
              <span>{metadata.contact_phone || 'Not specified'}</span>
            </div>
            {metadata.contact_email && (
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-gray-400" />
                <span>{metadata.contact_email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Equipment Details */}
        <div className="card p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Equipment & Capacity</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Equipment Details</h3>
              <p className="text-gray-600">{metadata.equipment_details || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Production Capacity</h3>
              <p className="text-gray-600">{metadata.production_capacity || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        {metadata.certifications && (
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FaCertificate className="w-5 h-5 text-primary-600" />
              Certifications
            </h2>
            <p className="text-gray-600 whitespace-pre-wrap">{metadata.certifications}</p>
          </div>
        )}

        {/* Portfolio Images */}
        {metadata.portfolio_images && metadata.portfolio_images.length > 0 && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metadata.portfolio_images.map((image: any, index: number) => (
                <img
                  key={index}
                  src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg border border-gray-200"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}