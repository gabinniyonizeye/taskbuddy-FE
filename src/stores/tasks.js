import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../helpers/api'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const filter = ref('all')
  const loading = ref(false)
  const error = ref('')

  // Getters
  const filteredTasks = computed(() => {
    if (!filter.value || filter.value === 'all') {
      return tasks.value
        .filter(t => t.status !== 'DONE')
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    }
    const f = filter.value.replace('-', '_').toUpperCase()
    return tasks.value.filter(t => t.status === f)
  })

  const byStatus = computed(() => s => tasks.value.filter(t => t.status === s))

  const stats = computed(() => {
    const today = new Date().toISOString().split('T')[0]
    const total = tasks.value.length
    const completed = tasks.value.filter(t => t.status === 'DONE').length
    return {
      total,
      completed,
      pending: total - completed,
      todayCount: tasks.value.filter(t => t.dueDate === today && t.status !== 'DONE').length,
      upcomingCount: tasks.value.filter(t => t.dueDate > today && t.status !== 'DONE').length,
      overdueCount: tasks.value.filter(t => t.dueDate < today && t.status !== 'DONE').length,
      completionRate: total === 0 ? 0 : Math.round((completed / total) * 100)
    }
  })

  async function fetchTasks() {
    try {
      loading.value = true
      error.value = ''
      const res = await api.get('/tasks')
      tasks.value = res.data
    } catch (e) {
      error.value = e.response?.data?.message || 'Failed to load tasks'
      tasks.value = []
    } finally {
      loading.value = false
    }
  }

  async function addTask(task) {
    try {
      const res = await api.post('/tasks', task)
      tasks.value.push(res.data)
    } catch (e) {
      error.value = e.response?.data?.message || 'Failed to add task'
    }
  }

  async function updateTask(updated) {
    try {
      const res = await api.put(`/tasks/${updated.id}`, updated)
      const i = tasks.value.findIndex(t => t.id === updated.id)
      if (i !== -1) tasks.value[i] = res.data
    } catch (e) {
      error.value = e.response?.data?.message || 'Failed to update task'
    }
  }

  async function deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (e) {
      error.value = e.response?.data?.message || 'Failed to delete task'
    }
  }

  return { tasks, filter, loading, error, filteredTasks, byStatus, stats, fetchTasks, addTask, updateTask, deleteTask }
})
