interface QuoteStatusBadgeProps {
  status?: string
}

export default function QuoteStatusBadge({ status }: QuoteStatusBadgeProps) {
  const statusClasses: Record<string, string> = {
    'Pending': 'badge-yellow',
    'Accepted': 'badge-green',
    'Rejected': 'badge-red',
    'Withdrawn': 'badge-gray',
  }

  const badgeClass = status ? statusClasses[status] || 'badge-gray' : 'badge-gray'

  return (
    <span className={`badge ${badgeClass}`}>
      {status || 'Unknown'}
    </span>
  )
}