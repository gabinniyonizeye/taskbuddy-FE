export const PRIORITY_COLORS = {
  HIGH: 'text-red-600 bg-red-50 border-red-200',
  MEDIUM: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  LOW: 'text-green-600 bg-green-50 border-green-200'
}

export const TASK_STATUSES = [
  { value: 'TODO', label: 'To Do' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'DONE', label: 'Done' }
]

export const TASK_PRIORITIES = ['LOW', 'MEDIUM', 'HIGH']

export const TASK_CATEGORIES = ['Personal', 'Study', 'Work', 'Shopping', 'Health']

export const NAV_LINKS = [
  { to: '/dashboard/all', label: '📋 All Tasks', filter: 'all' },
  { to: '/dashboard/todo', label: '🔲 To Do', filter: 'todo' },
  { to: '/dashboard/in_progress', label: '🔄 In Progress', filter: 'in_progress' },
  { to: '/dashboard/done', label: '✅ Done', filter: 'done' }
]
