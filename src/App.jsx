import { Routes, Route } from 'react-router-dom'
import SiteLayout from './components/SiteLayout'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import FocusPage from './pages/FocusPage'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { initialTasks, defaultSettings } from './data/data'

export default function App() {
  const [tasks, setTasks] = useLocalStorage('studyflow.tasks', initialTasks)
  const [settings, setSettings] = useLocalStorage('studyflow.settings', defaultSettings)

  const addTask = data =>
    setTasks(prev => [
      { ...data, id: crypto.randomUUID(), completed: false },
      ...prev,
    ])

  const updateTask = (id, data) =>
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...data } : t)))

  const deleteTask = id =>
    setTasks(prev => prev.filter(t => t.id !== id))

  const toggleTask = id =>
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )

  return (
    <SiteLayout>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage tasks={tasks} displayName={settings.displayName} />}
        />
        <Route
          path="/tasks"
          element={
            <TasksPage
              tasks={tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
            />
          }
        />
        <Route
          path="/focus"
          element={
            <FocusPage
              studyDuration={settings.studyDuration}
              breakDuration={settings.breakDuration}
            />
          }
        />
        <Route
          path="/settings"
          element={<SettingsPage settings={settings} onSave={setSettings} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  )
}