import { getQuotations } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import QuotationCard from '@/components/QuotationCard'

export const revalidate = 60

export default async function QuotationsPage() {
  const quotations = await getQuotations()

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Quotations</h1>
        <p className="text-gray-600 mt-2">Manage worker quotations and proposals</p>
      </div>

      <div className="space-y-6">
        {quotations.map((quotation: any) => (
          <QuotationCard key={quotation.id} quotation={quotation} />
        ))}
      </div>

      {quotations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No quotations found</p>
        </div>
      )}
    </DashboardLayout>
  )
}