<script setup>
defineProps({
  message: { type: String, default: '' }
})
</script>

<template>
  <p
    v-if="message"
    role="alert"
    class="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
  >
    {{ message }}
  </p>
</template>
