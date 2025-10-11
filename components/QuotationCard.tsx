import QuoteStatusBadge from './QuoteStatusBadge'
import { FaRupeeSign, FaClock, FaCalendar } from 'react-icons/fa'

interface QuotationCardProps {
  quotation: any
}

export default function QuotationCard({ quotation }: QuotationCardProps) {
  const metadata = quotation.metadata || {}
  const jobReference = metadata.job_reference || {}
  const workerReference = metadata.worker_reference || {}

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{quotation.title}</h3>
          <p className="text-gray-600 text-sm">
            by {workerReference.metadata?.business_name || workerReference.title || 'Unknown Worker'}
          </p>
          <p className="text-gray-500 text-sm">
            for {jobReference.title || 'Unknown Job'}
          </p>
        </div>
        <QuoteStatusBadge status={metadata.quote_status?.value} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <FaRupeeSign className="w-4 h-4" />
          <div>
            <p className="text-xs text-gray-500">Quoted Amount</p>
            <p className="font-semibold">{metadata.quoted_amount || 'Not specified'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FaClock className="w-4 h-4" />
          <div>
            <p className="text-xs text-gray-500">Delivery Timeline</p>
            <p className="font-semibold">{metadata.delivery_timeline || 'Not specified'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FaCalendar className="w-4 h-4" />
          <div>
            <p className="text-xs text-gray-500">Submission Date</p>
            <p className="font-semibold">{metadata.submission_date || 'Not specified'}</p>
          </div>
        </div>
      </div>

      {metadata.notes && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 line-clamp-2">{metadata.notes}</p>
        </div>
      )}
    </div>
  )
}