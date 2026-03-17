import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import { type Task } from '../data/schema'

interface GetTasksParams {
  page?: number
  pageSize?: number
  filter?: string
  status?: string[]
  priority?: string[]
  sort?: string
}

interface GetTasksResponse {
  data: Task[]
  meta: {
    totalCount: number
    page: number
    pageSize: number
    totalPages: number
  }
}

export const useGetTasks = (params: GetTasksParams) => {
  return useQuery({
    queryKey: ['tasks', params],
    queryFn: async () => {
      const { data } = await apiClient.get<GetTasksResponse>('/tasks', {
        params: {
          ...params,
          // Handle arrays for status and priority if needed by joining them or as repeated keys
          // Most backends expect status=todo&status=in_progress
        },
      })
      return data
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (task: Omit<Task, 'id'>) => {
      const { data } = await apiClient.post<Task>('/tasks', task)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, ...task }: Partial<Task> & { id: string | number }) => {
      const { data } = await apiClient.patch<Task>(`/tasks/${id}`, task)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string | number) => {
      await apiClient.delete(`/tasks/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useBulkDeleteTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (ids: (string | number)[]) => {
      await apiClient.post('/tasks/bulk-delete', { ids })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useImportTasks = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (tasks: Omit<Task, 'id'>[]) => {
      const { data } = await apiClient.post('/tasks/import', { tasks })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
