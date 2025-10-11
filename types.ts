// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  thumbnail?: string
}

// Job Posting Types
export interface JobPosting extends CosmicObject {
  type: 'job-postings'
  metadata: {
    company_name?: string
    job_title?: string
    job_description?: string
    technical_drawings?: Array<{
      url: string
      imgix_url: string
    }>
    budget_range?: string
    deadline?: string
    job_status?: {
      key: string
      value: JobStatus
    }
    required_quantity?: number
    material_specification?: string
    selected_worker?: WorkerProfile | string
    company_contact?: string
    location?: string
  }
}

export type JobStatus = 'Open' | 'In Progress' | 'Completed' | 'Cancelled'

// Worker Profile Types
export interface WorkerProfile extends CosmicObject {
  type: 'worker-profiles'
  metadata: {
    worker_name?: string
    business_name?: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    specialization?: string[]
    experience_years?: number
    equipment_details?: string
    production_capacity?: string
    portfolio_images?: Array<{
      url: string
      imgix_url: string
    }>
    contact_phone?: string
    contact_email?: string
    location?: string
    rating?: {
      key: string
      value: WorkerRating
    }
    certifications?: string
    languages_spoken?: string[]
  }
}

export type WorkerRating = '5 Star' | '4 Star' | '3 Star' | '2 Star' | '1 Star'

// Quotation Types
export interface Quotation extends CosmicObject {
  type: 'quotations'
  metadata: {
    job_reference?: JobPosting
    worker_reference?: WorkerProfile
    quoted_amount?: string
    per_unit_cost?: string
    delivery_timeline?: string
    additional_terms?: string
    quote_status?: {
      key: string
      value: QuoteStatus
    }
    submission_date?: string
    material_cost_breakdown?: string
    labor_cost_breakdown?: string
    notes?: string
  }
}

export type QuoteStatus = 'Pending' | 'Accepted' | 'Rejected' | 'Withdrawn'

// News & Updates Types
export interface NewsUpdate extends CosmicObject {
  type: 'news-updates'
  metadata: {
    headline?: string
    content?: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    category?: {
      key: string
      value: NewsCategory
    }
    publication_date?: string
    source?: string
    featured?: boolean
  }
}

export type NewsCategory = 'Industry News' | 'Success Story' | 'Platform Update' | 'Tips & Guides'

// API Response Types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}

// Form Data Types
export interface JobPostingFormData {
  title: string
  company_name: string
  job_title: string
  job_description: string
  budget_range: string
  deadline: string
  job_status: JobStatus
  material_specification: string
  company_contact: string
  location: string
}

export interface QuotationFormData {
  title: string
  jobId: string
  workerId: string
  quoted_amount: string
  per_unit_cost: string
  delivery_timeline: string
  additional_terms: string
  material_cost_breakdown: string
  labor_cost_breakdown: string
  notes: string
}

// Type guards
export function isJobPosting(obj: CosmicObject): obj is JobPosting {
  return obj.type === 'job-postings'
}

export function isWorkerProfile(obj: CosmicObject): obj is WorkerProfile {
  return obj.type === 'worker-profiles'
}

export function isQuotation(obj: CosmicObject): obj is Quotation {
  return obj.type === 'quotations'
}

export function isNewsUpdate(obj: CosmicObject): obj is NewsUpdate {
  return obj.type === 'news-updates'
}