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
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setSaved(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({
      ...form,
      studyDuration: Number(form.studyDuration) || 25,
      breakDuration: Number(form.breakDuration) || 5,
    })
    setSaved(true)
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-600">Customise your StudyFlow experience.</p>
      </header>

      <Card title="Preferences">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="displayName" className="mb-1 block text-sm font-medium text-slate-700">
              Display name
            </label>
            <input
              id="displayName"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="studyDuration" className="mb-1 block text-sm font-medium text-slate-700">
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
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="breakDuration" className="mb-1 block text-sm font-medium text-slate-700">
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
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" variant="accent">Save settings</Button>
            {saved && <span className="text-sm font-medium text-emerald-600">✅ Saved!</span>}
          </div>
        </form>
      </Card>
    </div>
  )
}