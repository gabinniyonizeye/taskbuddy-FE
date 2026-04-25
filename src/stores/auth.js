import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../helpers/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('tb_current_user')) || null)
  const isAuthenticated = computed(() => !!user.value)

  async function login(email, password) {
    const res = await api.post('/auth/login', { email, password })
    localStorage.setItem('tb_token', res.data.token)
    localStorage.setItem('tb_current_user', JSON.stringify(res.data))
    user.value = res.data
    return true
  }

  async function register(username, email, password) {
    const res = await api.post('/auth/register', { username, email, password })
    localStorage.setItem('tb_token', res.data.token)
    localStorage.setItem('tb_current_user', JSON.stringify(res.data))
    user.value = res.data
    return true
  }

  function logout() {
    user.value = null
    localStorage.removeItem('tb_token')
    localStorage.removeItem('tb_current_user')
  }

  return { user, isAuthenticated, login, logout, register }
})
