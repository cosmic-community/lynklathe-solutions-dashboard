import { getJobPostings, getWorkerProfiles, getQuotations, getNewsUpdates } from '@/lib/cosmic'
import DashboardLayout from '@/components/DashboardLayout'
import StatsCard from '@/components/StatsCard'
import JobPostingCard from '@/components/JobPostingCard'
import { FaBriefcase, FaUsers, FaFileInvoice, FaNewspaper } from 'react-icons/fa'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const [jobs, workers, quotations, news] = await Promise.all([
    getJobPostings(),
    getWorkerProfiles(),
    getQuotations(),
    getNewsUpdates(),
  ])

  const openJobs = jobs.filter((job: any) => 
    job.metadata?.job_status?.value === 'Open'
  ).length

  const pendingQuotes = quotations.filter((quote: any) => 
    quote.metadata?.quote_status?.value === 'Pending'
  ).length

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Lynklathe Solutions Management Dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Jobs"
          value={jobs.length}
          subtitle={`${openJobs} open positions`}
          icon={<FaBriefcase className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          title="Worker Profiles"
          value={workers.length}
          subtitle="Active workers"
          icon={<FaUsers className="w-6 h-6" />}
          color="green"
        />
        <StatsCard
          title="Quotations"
          value={quotations.length}
          subtitle={`${pendingQuotes} pending review`}
          icon={<FaFileInvoice className="w-6 h-6" />}
          color="yellow"
        />
        <StatsCard
          title="News Updates"
          value={news.length}
          subtitle="Published articles"
          icon={<FaNewspaper className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Recent Job Postings */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Job Postings</h2>
          <a href="/jobs" className="text-primary-600 hover:text-primary-700 font-medium">
            View all →
          </a>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {jobs.slice(0, 4).map((job: any) => (
            <JobPostingCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}