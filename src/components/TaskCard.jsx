import Badge from './Badge'
import Button from './Button'

const priorityColor = { Low: 'teal', Medium: 'amber', High: 'red' }

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    // 1. flex-col and h-full make the card stretch to fill the grid cell
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      
      {/* Top section: Title and Badges */}
      <div>
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
      </div>

      {/* Bottom section: Buttons */}
      {/* justify-between pushes the Complete button to the left and Edit/Delete to the right */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        
        {/* Complete/Undo Button on the left */}
        <Button
          size="sm"
          variant={task.completed ? 'outline' : 'accent'}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </Button>

        {/* Edit and Delete on the right side */}
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(task.id)}>
            Delete
          </Button>
        </div>
      </div>
      
    </article>
  )
}