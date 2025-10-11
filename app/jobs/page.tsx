import { getJobPostings } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import JobPostingCard from '@/components/JobPostingCard'
import JobStatusFilter from '@/components/JobStatusFilter'

export const revalidate = 60

export default async function JobsPage() {
  const jobs = await getJobPostings()

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Job Postings</h1>
        <p className="text-gray-600 mt-2">Manage manufacturing job postings and requirements</p>
      </div>

      <JobStatusFilter />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {jobs.map((job: any) => (
          <JobPostingCard key={job.id} job={job} />
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No job postings found</p>
        </div>
      )}
    </DashboardLayout>
  )
}