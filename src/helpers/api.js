import axios from 'axios'
import router from '../router'

const api = axios.create({
  baseURL: 'https://taskbuddy-be-production.up.railway.app/api',
  withCredentials: false
})

// Attach JWT token to every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('tb_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Global error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tb_token')
      localStorage.removeItem('tb_current_user')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api
