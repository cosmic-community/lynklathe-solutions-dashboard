interface NewsCategoryBadgeProps {
  category?: string
}

export default function NewsCategoryBadge({ category }: NewsCategoryBadgeProps) {
  const categoryClasses: Record<string, string> = {
    'Industry News': 'badge-blue',
    'Success Story': 'badge-green',
    'Platform Update': 'badge-yellow',
    'Tips & Guides': 'badge-gray',
  }

  const badgeClass = category ? categoryClasses[category] || 'badge-gray' : 'badge-gray'

  return (
    <span className={`badge ${badgeClass}`}>
      {category || 'Uncategorized'}
    </span>
  )
}