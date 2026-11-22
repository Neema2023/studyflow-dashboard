import { Link } from 'react-router-dom'
import Card from '../components/Card'
import SummaryCard from '../components/SummaryCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function DashboardPage({ tasks, displayName, hideCompleted }) {
  useDocumentTitle('Dashboard')

  // Stats are calculated from ALL tasks
  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed
  const overdue = tasks.filter(
    t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length
  const progress = total ? Math.round((completed / total) * 100) : 0

  // Upcoming tasks respects the UI preference
  const upcoming = [...tasks]
    .filter(t => !t.completed && (!hideCompleted || !t.completed))
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Hello, {displayName || 'Student'}
        </h1>
        <p className="mt-2 text-base text-slate-600 md:text-lg">
          {pending} task{pending !== 1 ? 's' : ''} remaining.
        </p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 md:grid-cols-4 md:gap-4">
        <SummaryCard label="Total" value={total} accent="slate" />
        <SummaryCard label="Done" value={completed} accent="green" />
        <SummaryCard label="Pending" value={pending} accent="amber" />
        <div className="hidden md:block">
          <SummaryCard label="Overdue" value={overdue} accent="red" />
        </div>
      </div>

      {/* Progress Bar */}
      <Card title="Progress" subtitle="Overall completion">
        <div className="mb-3 flex justify-between text-sm text-slate-600 md:text-base">
          <span className="font-semibold">{progress}% complete</span>
          <span>{completed} / {total}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 md:h-4">
          <div className="h-full bg-teal-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </Card>

      {/* Next Tasks List */}
      <Card
        title="Next tasks"
        action={
          <Link to="/tasks" className="text-sm font-medium text-teal-600 hover:underline md:text-base">
            View all →
          </Link>
        }
      >
        {upcoming.length === 0 ? (
          <p className="text-base text-slate-500">No upcoming tasks. 🎉</p>
        ) : (
          <div className="flex flex-col gap-3">
            {upcoming.map(task => (
              <div
                key={task.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="h-4 w-4 flex-shrink-0 rounded-full border-2 border-teal-500" />
                <div className="flex-1">
                  <p className="text-base font-medium text-slate-900">{task.title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {task.category} · Due {task.dueDate || '—'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}