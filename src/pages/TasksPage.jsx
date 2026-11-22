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
  const [showForm, setShowForm] = useState(false)

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
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to top to see form
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
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">My tasks</h1>
        </div>
        {/* Hide top button on mobile, show on desktop */}
        {!showForm && (
          <Button variant="accent" size="lg" onClick={() => setShowForm(true)} className="hidden md:inline-flex">
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

      <Card title="Filters" className="hidden md:block">
        {/* Desktop Filters (hidden on mobile) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="search-d" className="mb-2 block text-sm font-semibold text-slate-700">Search</label>
            <input
              id="search-d"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base focus:border-teal-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="cat-d" className="mb-2 block text-sm font-semibold text-slate-700">Category</label>
            <select id="cat-d" value={category} onChange={e => setCategory(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base">
              <option value="all">All categories</option>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="status-d" className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
            <select id="status-d" value={status} onChange={e => setStatus(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort-d" className="mb-2 block text-sm font-semibold text-slate-700">Sort by</label>
            <select id="sort-d" value={sort} onChange={e => setSort(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base">
              <option value="dueAsc">Due date (soonest)</option>
              <option value="dueDesc">Due date (latest)</option>
              <option value="az">Title A–Z</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Mobile Search Bar only */}
      <div className="md:hidden">
        <input
          ref={searchRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks ..."
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base shadow-sm focus:border-teal-500 focus:outline-none"
        />
      </div>

      <div className="space-y-4">
        {noTasks && !showForm && (
          <div className="rounded-xl bg-white p-6 text-center shadow-sm border border-slate-200">
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
        
        {/* Tasks List */}
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
      </div>

      {/* Floating Add Task Button for Mobile */}
      {!showForm && (
        <div className="fixed bottom-20 left-0 z-20 w-full px-4 md:hidden">
          <Button 
            variant="accent" 
            size="lg" 
            onClick={() => { setShowForm(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }} 
            className="w-full shadow-lg justify-center py-4 text-lg"
          >
            + Add task
          </Button>
        </div>
      )}
    </div>
  )
}