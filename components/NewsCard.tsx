import NewsCategoryBadge from './NewsCategoryBadge'
import { FaCalendar } from 'react-icons/fa'

interface NewsCardProps {
  article: any
}

export default function NewsCard({ article }: NewsCardProps) {
  const metadata = article.metadata || {}

  return (
    <div className="card overflow-hidden hover:shadow-md transition-shadow">
      {metadata.featured_image && (
        <img
          src={`${metadata.featured_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
          alt={metadata.headline || article.title}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <NewsCategoryBadge category={metadata.category?.value} />
          {metadata.featured && (
            <span className="badge badge-yellow">Featured</span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {metadata.headline || article.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <FaCalendar className="w-4 h-4" />
          <span>{metadata.publication_date || 'Not specified'}</span>
          {metadata.source && (
            <>
              <span>•</span>
              <span>{metadata.source}</span>
            </>
          )}
        </div>

        {metadata.content && (
          <div 
            className="text-gray-600 line-clamp-3 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: metadata.content }}
          />
        )}
      </div>
    </div>
  )
}