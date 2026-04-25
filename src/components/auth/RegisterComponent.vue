<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import ErrorBanner from '../reusable/ErrorBanner.vue'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  loading.value = true
  try {
    await auth.register(username.value, email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = e.response?.data?.message || e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
    <div class="text-center mb-8">
      <div class="w-10 h-10 bg-[#4a7c59] rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-3">T</div>
      <h2 class="text-2xl font-bold text-gray-900">Create account</h2>
      <p class="text-sm text-gray-500 mt-1">Join TaskBuddy today</p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label for="reg-username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          id="reg-username"
          v-model="username"
          type="text"
          required
          placeholder="johndoe"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
        />
      </div>
      <div>
        <label for="reg-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="reg-email"
          v-model="email"
          type="email"
          required
          placeholder="you@example.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
        />
      </div>
      <div>
        <label for="reg-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          id="reg-password"
          v-model="password"
          type="password"
          required
          placeholder="Password"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
        />
      </div>
      <div>
        <label for="reg-confirm" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <input
          id="reg-confirm"
          v-model="confirmPassword"
          type="password"
          required
          placeholder="Confirm Password"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
        />
      </div>

      <ErrorBanner :message="error" />

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 bg-[#4a7c59] text-white font-semibold rounded-lg hover:bg-[#3d6b4a] disabled:opacity-50"
      >
        {{ loading ? 'Creating account...' : 'Sign up' }}
      </button>

      <p class="text-sm text-center text-gray-500">
        Already have an account?
        <router-link to="/login" class="text-[#3b5998] font-medium hover:underline">Sign in</router-link>
      </p>
    </form>
  </div>
</template>
