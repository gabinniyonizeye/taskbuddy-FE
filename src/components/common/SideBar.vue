<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useTaskStore } from '../../stores/tasks'
import { NAV_LINKS } from '../../helpers/constants'

const router = useRouter()
const auth = useAuthStore()
const taskStore = useTaskStore()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <aside class="w-full md:w-56 bg-white border-r border-gray-200 flex-shrink-0">
    <div class="h-14 flex items-center px-5 border-b border-gray-200">
      <span class="text-lg font-bold text-[#3b5998]">TaskBuddy</span>
    </div>

    <nav class="p-3 space-y-1" aria-label="Sidebar navigation">
      <router-link
        v-for="link in NAV_LINKS"
        :key="link.filter"
        :to="link.to"
        class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100"
        :class="taskStore.filter === link.filter ? 'bg-green-50 text-[#4a7c59]' : 'text-gray-600'"
      >
        {{ link.label }}
      </router-link>

      <div class="pt-4 mt-4 border-t border-gray-200">
        <div class="px-3 py-2 flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-[#3b5998] text-white flex items-center justify-center text-xs font-bold">
            {{ auth.user?.username.charAt(0).toUpperCase() }}
          </div>
          <span class="text-sm font-medium text-gray-700 truncate">{{ auth.user?.username }}</span>
        </div>
        <button
          @click="handleLogout"
          class="w-full mt-1 px-3 py-2 text-sm text-left text-red-500 hover:bg-red-50 rounded-lg font-medium"
        >
          Log out
        </button>
      </div>
    </nav>
  </aside>
</template>
