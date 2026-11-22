import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', icon: '', end: true },
  { to: '/tasks', label: 'Tasks', icon: '' },
  { to: '/focus', label: 'Focus', icon: '' },
  { to: '/settings', label: 'Settings', icon: '' },
]

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      
      {/* --- MOBILE HEADER (Hidden on Desktop) --- */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-slate-50 px-5 py-4 md:hidden">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          studyflow
        </h1>
      </div>

      {/* --- DESKTOP SIDEBAR (Hidden on Mobile) --- */}
      <aside className="hidden border-slate-200 bg-white md:sticky md:top-0 md:block md:h-screen md:w-64 md:flex-shrink-0 md:border-r">
        <div className="px-5 py-5">
          <h1 className="text-2xl font-bold text-slate-900">StudyFlow</h1>
          <p className="mt-1 text-sm text-slate-500">Plan · Focus · Progress</p>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition ${
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

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 pb-24 md:pb-0">
        {/* Reduced max-width to match design, adjusted padding for mobile */}
        <div className="mx-auto max-w-7xl px-4 py-6 md:pl-8 md:pr-10 md:py-10">
          {children}
        </div>
      </main>

      {/* --- MOBILE BOTTOM NAVIGATION (Hidden on Desktop) --- */}
      <nav className="fixed bottom-0 left-0 z-30 flex w-full justify-around border-t border-slate-200 bg-white px-2 py-3 md:hidden">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-xs font-medium transition ${
                isActive ? 'text-teal-600' : 'text-slate-500 hover:text-slate-900'
              }`
            }
          >
            <span className="text-xl">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
      
    </div>
  )
}