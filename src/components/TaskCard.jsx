import Badge from './Badge'
import Button from './Button'

const priorityColor = { Low: 'teal', Medium: 'amber', High: 'red' }

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h3
        className={`text-lg font-semibold ${
          task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
        }`}
      >
        {task.title}
      </h3>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Badge color="slate">{task.category}</Badge>
        <Badge color={priorityColor[task.priority]}>{task.priority}</Badge>
        {task.dueDate && (
          <span className="text-sm text-slate-500">Due {task.dueDate}</span>
        )}
        {task.completed && <Badge color="green">Completed</Badge>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={task.completed ? 'outline' : 'accent'}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button size="sm" variant="ghost" onClick={() => onEdit(task)}>
          Edit
        </Button>
        <Button size="sm" variant="danger" onClick={() => onDelete(task.id)}>
          Delete
        </Button>
      </div>
    </article>
  )
}