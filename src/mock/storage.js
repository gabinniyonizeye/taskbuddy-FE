export const MOCK_USERS = [
  {
    id: 1,
    username: 'demo',
    email: 'demo@taskbuddy.com',
    password: '1234',
    roles: ['user']
  }
]

export const MOCK_TASKS = [
  {
    id: 101,
    title: 'Finish Web Tech Assignment',
    description: 'Complete the Vue 3 frontend project',
    status: 'TODO',
    priority: 'HIGH',
    dueDate: '2025-06-01',
    category: 'Study'
  },
  {
    id: 102,
    title: 'Buy Groceries',
    description: 'Milk, eggs, bread',
    status: 'IN_PROGRESS',
    priority: 'LOW',
    dueDate: '2025-05-20',
    category: 'Personal'
  }
]

export function initializeMockData() {
  if (!localStorage.getItem('tb_users')) {
    localStorage.setItem('tb_users', JSON.stringify(MOCK_USERS))
  }
  if (!localStorage.getItem('tb_tasks')) {
    localStorage.setItem('tb_tasks', JSON.stringify(MOCK_TASKS))
  }
}
