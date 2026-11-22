import { Link } from 'react-router-dom'
import Card from '../components/Card'
import SummaryCard from '../components/SummaryCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function DashboardPage({ tasks, displayName }) {
  useDocumentTitle('Dashboard')

  const total = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const pending = total - completed
  const overdue = tasks.filter(
    t => !t.completed && t.dueDate && new Date(t.dueDate) < new Date()
  ).length
  const progress = total ? Math.round((completed / total) * 100) : 0

  const upcoming = [...tasks]
    .filter(t => !t.completed)
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {displayName || 'Student'} 👋
        </h1>
        <p className="mt-1 text-slate-600">
          {pending} task{pending !== 1 ? 's' : ''} remaining.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total tasks" value={total} accent="slate" />
        <SummaryCard label="Completed" value={completed} accent="green" />
        <SummaryCard label="Pending" value={pending} accent="amber" />
        <SummaryCard label="Overdue" value={overdue} accent="red" />
      </div>

      <Card title="Progress" subtitle="Overall completion">
        <div className="mb-2 flex justify-between text-sm text-slate-600">
          <span>{progress}% complete</span>
          <span>{completed} / {total}</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
          <div className="h-full bg-teal-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </Card>

      <Card
        title="Upcoming tasks"
        action={<Link to="/tasks" className="text-sm font-medium text-teal-600 hover:underline">View all →</Link>}
      >
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-500">No upcoming tasks. 🎉</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {upcoming.map(task => (
              <div key={task.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="font-medium text-slate-900">{task.title}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {task.category} · Due {task.dueDate || '—'}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Focus preview">
        <p className="text-sm text-slate-600">
          Ready to concentrate?{' '}
          <Link to="/focus" className="font-medium text-teal-600 hover:underline">
            Start a focus session →
          </Link>
        </p>
      </Card>
    </div>
  )
}