<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="text-center">
      <p class="text-8xl font-extrabold text-[#4a7c59]">404</p>
      <h1 class="text-2xl font-bold text-gray-900 mt-4 mb-2">Page not found</h1>
      <p class="text-gray-400 text-sm mb-8">The page you're looking for doesn't exist.</p>
      <button
        @click="router.push('/')"
        class="px-6 py-2 bg-[#4a7c59] text-white font-semibold rounded-lg hover:bg-[#3d6b4a]"
      >
        Go Home
      </button>
    </div>
  </div>
</template>
