'use client'

import { useState } from 'react'

const statuses = ['All', 'Open', 'In Progress', 'Completed', 'Cancelled']

export default function JobStatusFilter() {
  const [selected, setSelected] = useState('All')

  return (
    <div className="flex gap-2">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setSelected(status)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selected === status
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  )
}