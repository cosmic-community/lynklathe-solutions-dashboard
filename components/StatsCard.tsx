import { ReactNode } from 'react'

interface StatsCardProps {
  title: string
  value: number
  subtitle: string
  icon: ReactNode
  color: 'blue' | 'green' | 'yellow' | 'purple'
}

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  purple: 'bg-purple-50 text-purple-600',
}

export default function StatsCard({ title, value, subtitle, icon, color }: StatsCardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div className="mb-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  )
}