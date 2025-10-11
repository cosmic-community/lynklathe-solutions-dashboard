import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Job Postings
export async function getJobPostings() {
  try {
    const response = await cosmic.objects
      .find({ type: 'job-postings' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch job postings')
  }
}

export async function getJobPosting(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'job-postings', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch job posting')
  }
}

// Worker Profiles
export async function getWorkerProfiles() {
  try {
    const response = await cosmic.objects
      .find({ type: 'worker-profiles' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch worker profiles')
  }
}

export async function getWorkerProfile(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'worker-profiles', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch worker profile')
  }
}

// Quotations
export async function getQuotations() {
  try {
    const response = await cosmic.objects
      .find({ type: 'quotations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch quotations')
  }
}

export async function getQuotation(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'quotations', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch quotation')
  }
}

// News & Updates
export async function getNewsUpdates() {
  try {
    const response = await cosmic.objects
      .find({ type: 'news-updates' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch news updates')
  }
}

export async function getNewsUpdate(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'news-updates', slug })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch news update')
  }
}

// Update Functions
export async function updateJobStatus(jobId: string, status: string) {
  await cosmic.objects.updateOne(jobId, {
    metadata: {
      job_status: status
    }
  })
}

export async function updateQuoteStatus(quoteId: string, status: string) {
  await cosmic.objects.updateOne(quoteId, {
    metadata: {
      quote_status: status
    }
  })
}