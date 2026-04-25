<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const taskInput = ref('')
const tasks = ref([])

const completedCount = computed(() => tasks.value.filter(t => t.done).length)

const increase = () => count.value++
const decrease = () => { if (count.value > 0) count.value-- }
const reset = () => count.value = 0

const addTask = () => {
  if (!taskInput.value.trim()) return
  tasks.value.push({ id: Date.now(), text: taskInput.value.trim(), done: false })
  taskInput.value = ''
}

const toggleTask = (id) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) task.done = !task.done
}

const removeTask = (id) => {
  tasks.value = tasks.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="max-w-md mx-auto p-8 space-y-8">

    <!-- Counter Section -->
    <section>
      <h2 class="text-xl font-bold text-gray-800 mb-4">Counter</h2>
      <div class="flex items-center gap-4">
        <button @click="decrease" class="px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300">−</button>
        <span class="text-3xl font-bold text-[#3b5998] w-12 text-center">{{ count }}</span>
        <button @click="increase" class="px-4 py-2 bg-[#4a7c59] text-white font-bold rounded-lg hover:bg-[#3d6b4a]">+</button>
        <button @click="reset" class="px-4 py-2 border border-gray-300 text-sm text-gray-500 rounded-lg hover:bg-gray-50">Reset</button>
      </div>
    </section>

    <!-- Task Section -->
    <section>
      <h2 class="text-xl font-bold text-gray-800 mb-4">
        Tasks
        <span class="text-sm font-normal text-gray-400 ml-2">{{ completedCount }}/{{ tasks.length }} done</span>
      </h2>

      <form @submit.prevent="addTask" class="flex gap-2 mb-4">
        <input
          v-model="taskInput"
          type="text"
          placeholder="Add a task..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
        />
        <button type="submit" class="px-4 py-2 bg-[#4a7c59] text-white text-sm font-semibold rounded-lg hover:bg-[#3d6b4a]">
          Add
        </button>
      </form>

      <ul class="space-y-2">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center justify-between px-4 py-2 bg-white border border-gray-200 rounded-lg"
        >
          <span
            @click="toggleTask(task.id)"
            class="flex-1 text-sm cursor-pointer select-none"
            :class="task.done ? 'line-through text-gray-400' : 'text-gray-800'"
          >
            {{ task.text }}
          </span>
          <button @click="removeTask(task.id)" class="text-gray-300 hover:text-red-500 ml-3 text-xs">✕</button>
        </li>
        <li v-if="tasks.length === 0" class="text-sm text-gray-400 text-center py-4">No tasks yet</li>
      </ul>
    </section>

  </div>
</template>
