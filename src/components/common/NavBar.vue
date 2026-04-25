<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <nav class="px-6 py-4 flex items-center justify-between border-b border-gray-200 bg-white">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 bg-[#4a7c59] rounded flex items-center justify-center text-white font-bold text-sm">T</div>
      <span class="text-lg font-bold text-[#3b5998]">TaskBuddy</span>
    </div>
    <div class="flex items-center gap-4">
      <a href="#features" class="text-sm text-gray-500 hover:text-gray-800 hidden md:block">Features</a>
      <a href="#about" class="text-sm text-gray-500 hover:text-gray-800 hidden md:block">About</a>
      <button @click="router.push('/login')"
        class="px-4 py-2 bg-[#4a7c59] text-white text-sm font-semibold rounded hover:bg-[#3d6b4a]">
        Login
      </button>
    </div>
  </nav>
</template>
