<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from '../stores/tasks'
import { TASK_PRIORITIES, TASK_CATEGORIES } from '../helpers/constants'
import AppLayout from '../components/layout/AppLayout.vue'
import TaskList from '../components/tasks/TaskList.vue'

const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()

const showModal = ref(false)
const isFetching = ref(false)

const newTask = ref({
  title: '',
  description: '',
  priority: 'MEDIUM',
  dueDate: '',
  category: 'Personal'
})

const syncFilter = () => {
  taskStore.filter = route.params.filter?.replace('-', '_') || 'all'
  if (!route.params.filter) router.replace('/dashboard/all')
}

onMounted(async () => {
  isFetching.value = true
  await taskStore.fetchTasks()
  isFetching.value = false
  syncFilter()
})

watch(() => route.params.filter, syncFilter)

const handleCreate = () => {
  if (!newTask.value.title.trim()) return
  taskStore.addTask({ ...newTask.value })
  showModal.value = false
  newTask.value = { title: '', description: '', priority: 'MEDIUM', dueDate: '', category: 'Personal' }
}

const dashboardTitle = () =>
  taskStore.filter === 'all' ? 'Dashboard' : taskStore.filter.replace('_', ' ') + ' Tasks'
</script>

<template>
  <AppLayout>
    <!-- Loading state -->
    <div v-if="isFetching" class="flex items-center justify-center py-20">
      <p class="text-gray-400 text-sm">Loading tasks...</p>
    </div>

    <template v-else>
    <!-- Stats (all view only) -->
    <div v-if="taskStore.filter === 'all'" class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <p class="text-xs text-gray-400 uppercase font-semibold mb-1">Today</p>
        <p class="text-3xl font-bold text-gray-900">{{ taskStore.stats.todayCount }}</p>
        <p class="text-xs text-gray-400 mt-1">Due today</p>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <p class="text-xs text-gray-400 uppercase font-semibold mb-1">Upcoming</p>
        <p class="text-3xl font-bold text-gray-900">{{ taskStore.stats.upcomingCount }}</p>
        <p class="text-xs text-gray-400 mt-1">Scheduled</p>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <p class="text-xs text-gray-400 uppercase font-semibold mb-1">Overdue</p>
        <p class="text-3xl font-bold text-red-500">{{ taskStore.stats.overdueCount }}</p>
        <p class="text-xs text-gray-400 mt-1">Needs attention</p>
      </div>
      <div class="bg-white border border-gray-200 rounded-xl p-4">
        <p class="text-xs text-gray-400 uppercase font-semibold mb-1">Done</p>
        <p class="text-3xl font-bold text-[#4a7c59]">{{ taskStore.stats.completionRate }}%</p>
        <div class="w-full h-1.5 bg-gray-100 rounded-full mt-2">
          <div class="h-full bg-[#4a7c59] rounded-full" :style="{ width: taskStore.stats.completionRate + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 capitalize">{{ dashboardTitle() }}</h1>
        <p class="text-sm text-gray-400 mt-0.5">Manage your tasks below</p>
      </div>
      <button
        @click="showModal = true"
        class="px-4 py-2 bg-[#4a7c59] text-white text-sm font-semibold rounded-lg hover:bg-[#3d6b4a]"
      >
        + New Task
      </button>
    </div>

    <TaskList />

    <!-- Create Task Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-black/40" @click="showModal = false"></div>
      <div class="relative w-full max-w-md bg-white rounded-xl border border-gray-200 p-6 shadow-xl">
        <h3 class="text-lg font-bold text-gray-900 mb-1">New Task</h3>
        <p class="text-sm text-gray-400 mb-5">Fill in the details below</p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              v-model="newTask.title"
              type="text"
              placeholder="Task title"
              autofocus
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="newTask.description"
              rows="3"
              placeholder="Task description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                v-model="newTask.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
              >
                <option v-for="p in TASK_PRIORITIES" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                v-model="newTask.dueDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              v-model="newTask.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
            >
              <option v-for="c in TASK_CATEGORIES" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button
            @click="showModal = false"
            class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleCreate"
            class="px-4 py-2 bg-[#4a7c59] text-white text-sm font-semibold rounded-lg hover:bg-[#3d6b4a]"
          >
            Create
          </button>
        </div>
      </div>
    </div>
    </template>
  </AppLayout>
</template>
