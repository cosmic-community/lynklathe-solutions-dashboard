'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaHome, FaBriefcase, FaUsers, FaFileInvoice, FaNewspaper } from 'react-icons/fa'

const navigation = [
  { name: 'Dashboard', href: '/', icon: FaHome },
  { name: 'Job Postings', href: '/jobs', icon: FaBriefcase },
  { name: 'Workers', href: '/workers', icon: FaUsers },
  { name: 'Quotations', href: '/quotations', icon: FaFileInvoice },
  { name: 'News & Updates', href: '/news', icon: FaNewspaper },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-600">Lynklathe</h1>
        <p className="text-sm text-gray-500 mt-1">Solutions Dashboard</p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}