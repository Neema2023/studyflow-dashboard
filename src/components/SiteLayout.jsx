import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', end: true, icon: '📊' },
  { to: '/tasks', label: 'Tasks', icon: '📝' },
  { to: '/focus', label: 'Focus', icon: '⏱️' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      {/* Sidebar */}
      <aside className="border-b border-slate-200 bg-white md:sticky md:top-0 md:h-screen md:w-64 md:flex-shrink-0 md:border-b-0 md:border-r">
        <div className="px-5 py-5">
          <h1 className="text-2xl font-bold text-slate-900">StudyFlow</h1>
          <p className="mt-1 text-sm text-slate-500">Plan · Focus · Progress</p>
        </div>

        <nav className="flex gap-2 overflow-x-auto px-4 pb-4 md:flex-col md:gap-1 md:px-3 md:pb-0">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-base font-medium transition ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Changed max-w-6xl to max-w-7xl to use more space, 
            and reduced left padding (md:pl-6) to bring it closer to the sidebar */}
        <div className="mx-auto max-w-7xl px-4 py-6 md:pl-6 md:pr-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}