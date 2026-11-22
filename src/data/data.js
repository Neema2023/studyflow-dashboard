export const categories = ['Math', 'Science', 'History', 'Language', 'Art', 'Other']
export const priorities = ['Low', 'Medium', 'High']

export const initialTasks = [
    { id: 't1', title: 'Read Chapter 4 - Algebra', category: 'Math', dueDate: '2026-11-25', priority: 'High', completed: false },
    { id: 't2', title: 'Write essay on Industrial Revolution', category: 'History', dueDate: '2026-11-27', priority: 'Medium', completed: false },
    { id: 't3', title: 'Chemistry lab report', category: 'Science', dueDate: '2026-11-22', priority: 'High', completed: true },
    { id: 't4', title: 'Spanish vocabulary practice', category: 'Language', dueDate: '2026-11-24', priority: 'Low', completed: false },
    { id: 't5', title: 'Sketch for art portfolio', category: 'Art', dueDate: '2026-11-30', priority: 'Low', completed: false },
    { id: 't6', title: 'Trigonometry problem set', category: 'Math', dueDate: '2026-11-23', priority: 'Medium', completed: false },
]

export const defaultSettings = {
    displayName: 'Student',
    studyDuration: 25,
    breakDuration: 5,
}