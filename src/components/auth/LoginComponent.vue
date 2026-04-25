<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import ErrorBanner from '../reusable/ErrorBanner.vue'

const router = useRouter()
const auth = useAuthStore()

const email = ref('demo@taskbuddy.com')
const password = ref('1234')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    error.value = e.response?.data?.message || 'Wrong email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full max-w-md bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
    <div class="text-center mb-8">
      <div class="w-10 h-10 bg-[#4a7c59] rounded-lg flex items-center justify-center text-white font-bold mx-auto mb-3">T</div>
      <h2 class="text-2xl font-bold text-gray-900">Welcome back</h2>
      <p class="text-sm text-gray-500 mt-1">Sign in to your TaskBuddy account</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="login-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
          required
          placeholder="you@example.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
        />
      </div>
      <div>
        <label for="login-password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
          required
          placeholder="Password"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4a7c59]"
        />
      </div>

      <ErrorBanner :message="error" />

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 bg-[#4a7c59] text-white font-semibold rounded-lg hover:bg-[#3d6b4a] disabled:opacity-50"
      >
        {{ loading ? 'Signing in...' : 'Sign in' }}
      </button>

      <p class="text-sm text-center text-gray-500">
        No account?
        <router-link to="/register" class="text-[#3b5998] font-medium hover:underline">Sign up</router-link>
      </p>
    </form>
  </div>
</template>
