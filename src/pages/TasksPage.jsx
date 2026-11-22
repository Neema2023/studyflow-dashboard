import { useMemo, useRef, useState } from 'react'
import Card from '../components/Card'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import Button from '../components/Button'
import { categories } from '../data/data'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useDebounce } from '../hooks/useDebounce'

export default function TasksPage({ tasks, addTask, updateTask, deleteTask, toggleTask }) {
  useDocumentTitle('Tasks')

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [sort, setSort] = useState('dueAsc')
  const [editingTask, setEditingTask] = useState(null)
  const [showForm, setShowForm] = useState(false) // NEW: form visibility

  const debouncedSearch = useDebounce(search, 250)
  const searchRef = useRef(null)

  const filtered = useMemo(() => {
    let list = tasks
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase()
      list = list.filter(t => t.title.toLowerCase().includes(q))
    }
    if (category !== 'all') list = list.filter(t => t.category === category)
    if (status === 'active') list = list.filter(t => !t.completed)
    if (status === 'completed') list = list.filter(t => t.completed)

    const copy = [...list]
    if (sort === 'dueAsc') copy.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''))
    if (sort === 'dueDesc') copy.sort((a, b) => (b.dueDate || '').localeCompare(a.dueDate || ''))
    if (sort === 'az') copy.sort((a, b) => a.title.localeCompare(b.title))
    return copy
  }, [tasks, debouncedSearch, category, status, sort])

  function handleSave(data) {
    if (editingTask) {
      updateTask(editingTask.id, data)
      setEditingTask(null)
    } else {
      addTask(data)
    }
    setShowForm(false)
  }

  function handleEdit(task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function handleCancel() {
    setEditingTask(null)
    setShowForm(false)
  }

  const noTasks = tasks.length === 0
  const noResults = !noTasks && filtered.length === 0

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">Tasks</h1>
          <p className="mt-2 text-lg text-slate-600">
            Add, edit, complete and organise your study tasks.
          </p>
        </div>
        {!showForm && (
          <Button variant="accent" size="lg" onClick={() => setShowForm(true)}>
            + Add task
          </Button>
        )}
      </header>

      {showForm && (
        <Card title={editingTask ? 'Edit task' : 'New task'}>
          <TaskForm
            onSave={handleSave}
            editingTask={editingTask}
            onCancel={handleCancel}
          />
        </Card>
      )}

      <Card title="Filters">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="search" className="mb-2 block text-sm font-semibold text-slate-700">
              Search
            </label>
            <input
              id="search"
              ref={searchRef}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="category-filter" className="mb-2 block text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base"
            >
              <option value="all">All categories</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="status-filter" className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              id="status-filter"
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="sort" className="mb-2 block text-sm font-semibold text-slate-700">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base"
            >
              <option value="dueAsc">Due date (soonest)</option>
              <option value="dueDesc">Due date (latest)</option>
              <option value="az">Title A–Z</option>
            </select>
          </div>
        </div>
      </Card>

      <Card title={`Tasks (${filtered.length})`}>
        {noTasks && !showForm && (
          <div className="rounded-xl bg-slate-50 p-6 text-center">
            <p className="text-base text-slate-600">
              No tasks yet. Click <strong>+ Add task</strong> to get started.
            </p>
          </div>
        )}
        {noResults && (
          <p className="rounded-xl bg-amber-50 p-4 text-base text-amber-700">
            No tasks match your current search and filters.
          </p>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={handleEdit}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}