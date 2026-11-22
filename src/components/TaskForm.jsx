import { useEffect, useState } from 'react'
import Button from './Button'
import { categories, priorities } from '../data/data'

const emptyTask = { title: '', category: 'Math', dueDate: '', priority: 'Medium' }

export default function TaskForm({ onSave, editingTask, onCancel }) {
  const [form, setForm] = useState(emptyTask)
  const [error, setError] = useState('')

  useEffect(() => {
    if (editingTask) {
      const { title, category, dueDate, priority } = editingTask
      setForm({ title, category, dueDate, priority })
    } else {
      setForm(emptyTask)
    }
    setError('')
  }, [editingTask])

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Please enter a task title.')
      return
    }
    onSave({ ...form, title: form.title.trim() })
    setForm(emptyTask)
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="task-title" className="mb-1 block text-sm font-medium text-slate-700">
          Task title
        </label>
        <input
          id="task-title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Read Chapter 5"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor="task-category" className="mb-1 block text-sm font-medium text-slate-700">Category</label>
          <select
            id="task-category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="task-due" className="mb-1 block text-sm font-medium text-slate-700">Due date</label>
          <input
            id="task-due"
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="task-priority" className="mb-1 block text-sm font-medium text-slate-700">Priority</label>
          <select
            id="task-priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {priorities.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="accent">
          {editingTask ? 'Save changes' : 'Add task'}
        </Button>
        {editingTask && (
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </form>
  )
}