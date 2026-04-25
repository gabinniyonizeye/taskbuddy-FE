<script setup>
import { useTaskStore } from '../../stores/tasks'
import { PRIORITY_COLORS, TASK_STATUSES } from '../../helpers/constants'

const taskStore = useTaskStore()

const isOverdue = (task) => new Date(task.dueDate) < new Date() && task.status !== 'DONE'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <article
      v-for="task in taskStore.filteredTasks"
      :key="task.id"
      class="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all group"
      :class="{ 'border-red-300': isOverdue(task) }"
    >
      <div class="flex items-start justify-between mb-3">
        <span
          class="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full border"
          :class="PRIORITY_COLORS[task.priority]"
        >
          {{ task.priority }}
        </span>
        <button
          @click="taskStore.deleteTask(task.id)"
          class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1 rounded"
          aria-label="Delete task"
        >
          🗑
        </button>
      </div>

      <h3 class="text-base font-semibold text-gray-900 mb-1">{{ task.title }}</h3>
      <p class="text-sm text-gray-400 mb-4 line-clamp-2">{{ task.description }}</p>

      <div class="flex items-center justify-between text-xs">
        <span :class="isOverdue(task) ? 'text-red-500 font-medium' : 'text-gray-400'">
          {{ isOverdue(task) ? 'Overdue ' : 'Due ' }}{{ task.dueDate }}
        </span>
        <select
          :value="task.status"
          @change="taskStore.updateTask({ ...task, status: $event.target.value })"
          class="text-xs border border-gray-200 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-[#4a7c59]"
          aria-label="Change task status"
        >
          <option v-for="s in TASK_STATUSES" :key="s.value" :value="s.value">{{ s.label }}</option>
        </select>
      </div>
    </article>

    <div
      v-if="taskStore.filteredTasks.length === 0"
      class="col-span-full flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl"
    >
      <p class="text-4xl mb-3">📭</p>
      <h3 class="text-lg font-semibold text-gray-700">No tasks here</h3>
      <p class="text-sm text-gray-400">Create a new task to get started.</p>
    </div>
  </div>
</template>
