<script setup>
import { ref } from 'vue'
import SideBar from '../common/SideBar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
    <SideBar :class="sidebarOpen ? 'block' : 'hidden md:block'" />

    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Mobile header -->
      <div class="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <span class="font-bold text-[#3b5998]">TaskBuddy</span>
        <button @click="sidebarOpen = !sidebarOpen" class="text-sm text-gray-600 border px-2 py-1 rounded">Menu</button>
      </div>

      <div class="flex-1 overflow-y-auto p-6">
        <slot />
      </div>
    </main>
  </div>
</template>
