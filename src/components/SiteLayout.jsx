import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/tasks', label: 'Tasks' },
  { to: '/focus', label: 'Focus' },
  { to: '/settings', label: 'Settings' },
]

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <aside className="border-b border-slate-200 bg-white md:w-60 md:flex-shrink-0 md:border-b-0 md:border-r">
        <div className="p-4">
          <h1 className="text-xl font-bold text-slate-900">StudyFlow</h1>
          <p className="text-xs text-slate-500">Plan · Focus · Progress</p>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-2 md:flex-col md:gap-1 md:p-4">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-teal-600 text-white' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <div className="mx-auto max-w-5xl p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}