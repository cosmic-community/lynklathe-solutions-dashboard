interface JobStatusBadgeProps {
  status?: string
}

export default function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const statusClasses: Record<string, string> = {
    'Open': 'badge-green',
    'In Progress': 'badge-blue',
    'Completed': 'badge-gray',
    'Cancelled': 'badge-red',
  }

  const badgeClass = status ? statusClasses[status] || 'badge-gray' : 'badge-gray'

  return (
    <span className={`badge ${badgeClass}`}>
      {status || 'Unknown'}
    </span>
  )
}