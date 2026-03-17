import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  Admin,
} from '../types'

export const useRegisterAdmin = () => {
  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await apiClient.post<AuthResponse>(
        '/admin/register',
        credentials
      )
      return data
    },
  })
}

export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post<AuthResponse>(
        '/admin/login',
        credentials
      )
      return data
    },
  })
}

export const useGetCurrentAdmin = () => {
  return useQuery({
    queryKey: ['admin-me'],
    queryFn: async () => {
      const { data } = await apiClient.get<Admin>('/admin/me')
      return data
    },
  })
}

export const useLogoutAdmin = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.post<{ message: string }>('/admin/logout')
      return data
    },
  })
}
