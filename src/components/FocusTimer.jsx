import { useEffect, useRef, useState } from 'react'
import Button from './Button'

export default function FocusTimer({ sessionType, durationMinutes }) {
  const totalSeconds = durationMinutes * 60
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return

    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [running])

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-xs uppercase tracking-wide text-slate-500">{sessionType} session</p>
        <p className="mt-2 font-mono text-6xl font-semibold text-slate-900" aria-live="polite">
          {mm}:{ss}
        </p>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div className="h-full bg-teal-500 transition-all" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="accent" onClick={() => setRunning(true)} disabled={running || secondsLeft === 0}>
          {running ? 'Running…' : 'Start'}
        </Button>
        <Button variant="outline" onClick={() => setRunning(false)} disabled={!running}>
          Pause
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setRunning(false)
            setSecondsLeft(totalSeconds)
          }}
        >
          Reset
        </Button>
      </div>

      {secondsLeft === 0 && (
        <p className="text-center text-sm font-medium text-emerald-600">
          ✅ Session complete — take a break!
        </p>
      )}
    </div>
  )
}