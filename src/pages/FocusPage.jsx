import { useState } from 'react'
import Card from '../components/Card'
import FocusTimer from '../components/FocusTimer'
import Button from '../components/Button'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function FocusPage({ studyDuration, breakDuration }) {
  useDocumentTitle('Focus')
  const [sessionType, setSessionType] = useState('Study')
  const minutes = sessionType === 'Study' ? studyDuration : breakDuration

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Focus</h1>
        <p className="mt-1 text-slate-600">
          Run a focus session and take breaks between study blocks.
        </p>
      </header>

      <Card>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={sessionType === 'Study' ? 'accent' : 'outline'}
            onClick={() => setSessionType('Study')}
          >
            Study ({studyDuration}m)
          </Button>
          <Button
            variant={sessionType === 'Break' ? 'accent' : 'outline'}
            onClick={() => setSessionType('Break')}
          >
            Break ({breakDuration}m)
          </Button>
        </div>

        <FocusTimer
          key={sessionType}
          sessionType={sessionType}
          durationMinutes={minutes}
        />
      </Card>

      <Card title="Tips">
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          <li>Put your phone on silent during a study block.</li>
          <li>Use short breaks to stretch and hydrate.</li>
          <li>Switching between Study and Break resets the timer.</li>
        </ul>
      </Card>
    </div>
  )
}