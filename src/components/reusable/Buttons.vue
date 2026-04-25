<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | outline | danger | ghost
  size: { type: String, default: 'md' },          // sm | md | lg
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
      variant === 'primary' && 'bg-[#4a7c59] text-white hover:bg-[#3d6b4a]',
      variant === 'outline' && 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 bg-transparent',
      variant === 'danger'  && 'bg-red-500 text-white hover:bg-red-600',
      variant === 'ghost'   && 'text-gray-600 hover:bg-gray-100 bg-transparent',
      size === 'sm' && 'px-3 py-1 text-xs',
      size === 'md' && 'px-4 py-2 text-sm',
      size === 'lg' && 'px-6 py-3 text-base',
    ]"
  >
    <span v-if="loading" class="mr-2">⏳</span>
    <slot />
  </button>
</template>
