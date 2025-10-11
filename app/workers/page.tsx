import { getWorkerProfiles } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import WorkerProfileCard from '@/components/WorkerProfileCard'

export const revalidate = 60

export default async function WorkersPage() {
  const workers = await getWorkerProfiles()

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Worker Profiles</h1>
        <p className="text-gray-600 mt-2">Browse skilled MSME lathe workers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker: any) => (
          <WorkerProfileCard key={worker.id} worker={worker} />
        ))}
      </div>

      {workers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No worker profiles found</p>
        </div>
      )}
    </DashboardLayout>
  )
}