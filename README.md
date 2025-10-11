# Lynklathe Solutions Dashboard

![App Preview](https://imgix.cosmicjs.com/3f19e8e0-a681-11f0-9d14-5ddd3530621f-photo-1504868584819-f8e8b4b6d7e3-1760173420411.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive React dashboard for managing the Lynklathe Solutions platform - connecting manufacturing companies with skilled MSME lathe workers across India.

## ✨ Features

- **Job Posting Management** - Create and manage manufacturing job postings with technical specifications
- **Worker Profile Directory** - Browse skilled lathe workers with detailed profiles and ratings
- **Quotation Tracking** - Monitor and manage quotations with cost breakdowns
- **News & Updates** - Publish industry news and success stories
- **Real-time Status Updates** - Track job and quotation statuses in real-time
- **Responsive Design** - Optimized for desktop and tablet workflows
- **Image Optimization** - Automatic image optimization via imgix
- **Multi-language Ready** - Built to support India's diverse languages

## 📋 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ea1be73393cb29a9184bb0&clone_repository=68ea1efb3393cb29a9184bd4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "You are a skilled app developer with a strong background in creating innovative solutions for small businesses and enterprises. I want you to design an application named "Lynklathe Solutions" that facilitates connections between large companies like Ashok Leyland and TVS and small MSME lathe workers. The app should allow companies to post job proposals and drawings, enabling lathe workers to quote their amounts for the jobs. If a company's accepted quote matches their requirements, the chosen worker should receive a notification to proceed. Additionally, the worker's profile must include a quotation block, job tracking dialog, and live delivery tracking for both the company and the worker. The main screen of the app should feature a scrolling feed of news and job postings from both companies and workers. 
>
> Here's an example of an app interface I envision: The main screen displays a dynamic feed with job postings, while each worker's profile showcases their skills, past work, and current proposals. 
>
> I want you to also ensure the app is user-friendly and visually appealing, with intuitive navigation and responsiveness across devices. The output must be in a comprehensive design document format that outlines the app's features, user interface elements, and user experience flows. 
>
> I want you to also know that this app aims to enhance collaboration in the manufacturing sector, providing a seamless platform for job proposals and worker engagement.and with all indian languages as app languages"

### Code Generation Prompt

> Create a React dashboard that displays and manages my existing content

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Icons** - Icon library
- **Next.js Image Optimization** - Automatic image optimization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
```bash
git clone <repository-url>
cd lynklathe-dashboard
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Cosmic SDK Examples

### Fetching Job Postings

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getJobPostings() {
  try {
    const response = await cosmic.objects
      .find({ type: 'job-postings' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw error
  }
}
```

### Creating a Quotation

```typescript
export async function createQuotation(data: QuotationFormData) {
  const response = await cosmic.objects.insertOne({
    type: 'quotations',
    title: data.title,
    metadata: {
      job_reference: data.jobId,
      worker_reference: data.workerId,
      quoted_amount: data.quotedAmount,
      per_unit_cost: data.perUnitCost,
      delivery_timeline: data.deliveryTimeline,
      quote_status: 'Pending',
      submission_date: new Date().toISOString().split('T')[0]
    }
  })
  
  return response.object
}
```

### Updating Job Status

```typescript
export async function updateJobStatus(jobId: string, status: JobStatus) {
  await cosmic.objects.updateOne(jobId, {
    metadata: {
      job_status: status
    }
  })
}
```

## 🌐 Cosmic CMS Integration

This application uses Cosmic as a headless CMS to manage all content. The content structure includes:

- **Job Postings** - Manufacturing job requirements with technical drawings
- **Worker Profiles** - Skilled lathe worker information and portfolios
- **Quotations** - Worker quotes for specific jobs
- **News & Updates** - Industry news and platform announcements

All content is fetched dynamically and can be managed through the Cosmic dashboard.

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above
2. Connect your repository
3. Add environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button
2. Connect your repository
3. Add environment variables in Netlify dashboard
4. Deploy!

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

<!-- README_END -->