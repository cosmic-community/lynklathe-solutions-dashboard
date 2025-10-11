import { getNewsUpdates } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import NewsCard from '@/components/NewsCard'

export const revalidate = 60

export default async function NewsPage() {
  const news = await getNewsUpdates()

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">News & Updates</h1>
        <p className="text-gray-600 mt-2">Latest industry news and platform updates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {news.map((article: any) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No news updates found</p>
        </div>
      )}
    </DashboardLayout>
  )
}