import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { type Tenant } from '../data/tenant-schema'

export const useGetTenants = () => {
  return useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      // The backend route is /api/admin/management/tenants
      // apiClient has baseURL: /api
      const { data } = await apiClient.get<Tenant[]>('/admin/management/tenants')
      return data
    },
  })
}
