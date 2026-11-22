import { useEffect, useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function SettingsPage({ settings, onSave }) {
  useDocumentTitle('Settings')

  const [form, setForm] = useState(settings)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(settings)
  }, [settings])

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }))
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      ...form,
      studyDuration: Number(form.studyDuration) || 25,
      breakDuration: Number(form.breakDuration) || 5,
      hideCompleted: Boolean(form.hideCompleted), // Ensure it saves as true/false
    })
    setSaved(true)
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Settings</h1>
        <p className="mt-2 text-base text-slate-600 md:text-lg">Customise your StudyFlow experience.</p>
      </header>

      <Card title="Preferences">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="displayName" className="mb-1 block text-sm font-semibold text-slate-700">
              Display name
            </label>
            <input
              id="displayName"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="studyDuration" className="mb-1 block text-sm font-semibold text-slate-700">
                Study duration (minutes)
              </label>
              <input
                id="studyDuration"
                type="number"
                min="1"
                max="120"
                name="studyDuration"
                value={form.studyDuration}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base"
              />
            </div>
            <div>
              <label htmlFor="breakDuration" className="mb-1 block text-sm font-semibold text-slate-700">
                Break duration (minutes)
              </label>
              <input
                id="breakDuration"
                type="number"
                min="1"
                max="60"
                name="breakDuration"
                value={form.breakDuration}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base"
              />
            </div>
          </div>

          {/* UPDATED UI PREFERENCE TOGGLE - Clickable Label */}
          <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100">
            <input
              type="checkbox"
              name="hideCompleted"
              checked={form.hideCompleted || false}
              onChange={handleChange}
              className="h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <div>
              <span className="block text-base font-medium text-slate-900">
                Hide completed tasks
              </span>
              <span className="block text-sm text-slate-500">
                Hide finished tasks from your Dashboard and Tasks list.
              </span>
            </div>
          </label>

          <div className="flex items-center gap-4 pt-2">
            <Button type="submit" variant="accent" size="lg">Save settings</Button>
            {saved && <span className="text-base font-medium text-emerald-600">✅ Saved!</span>}
          </div>
        </form>
      </Card>
    </div>
  )
}