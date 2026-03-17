import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add the bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().auth.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiClient
