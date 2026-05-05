import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import apiClient from '@/lib/api-client'
import {
  type ClientListStatus,
  type MessagingMessage,
  type MessagingMessagesResponse,
  createConversationResponseSchema,
  markReadResponseSchema,
  messagingClientsResponseSchema,
  messagingConversationsResponseSchema,
  messagingMessagesResponseSchema,
  messagingMessageSchema,
} from '../data/messaging-schema'

const MESSAGING_PREFIX = '/admin/messaging'

export const messagingKeys = {
  all: ['messaging'] as const,
  clients: (params: ClientsQueryParams) =>
    ['messaging', 'clients', params] as const,
  conversations: () => ['messaging', 'conversations'] as const,
  messages: (conversationId: string) =>
    ['messaging', 'messages', conversationId] as const,
}

export type ClientsQueryParams = {
  page?: number
  limit?: number
  search?: string
  tenantId?: number
  status?: ClientListStatus
}

export function useMessagingClients(params: ClientsQueryParams) {
  const { page = 1, limit = 30, search, tenantId, status = 'active' } = params

  return useQuery({
    queryKey: messagingKeys.clients({ page, limit, search, tenantId, status }),
    queryFn: async () => {
      const { data } = await apiClient.get<unknown>(
        `${MESSAGING_PREFIX}/clients`,
        {
          params: {
            page,
            limit,
            ...(search?.trim() ? { search: search.trim() } : {}),
            ...(tenantId != null ? { tenantId } : {}),
            status,
          },
        }
      )
      return messagingClientsResponseSchema.parse(data)
    },
  })
}

export function useConversations(options?: { refetchInterval?: number | false }) {
  return useQuery({
    queryKey: messagingKeys.conversations(),
    queryFn: async () => {
      const { data } = await apiClient.get<unknown>(
        `${MESSAGING_PREFIX}/conversations`
      )
      return messagingConversationsResponseSchema.parse(data)
    },
    refetchInterval: options?.refetchInterval ?? false,
  })
}

const DEFAULT_MESSAGE_LIMIT = 30

export function useMessages(conversationId: string | null) {
  return useInfiniteQuery({
    queryKey: conversationId
      ? messagingKeys.messages(conversationId)
      : ['messaging', 'messages', 'none'],
    enabled: !!conversationId,
    initialPageParam: undefined as number | undefined,
    queryFn: async ({ pageParam }) => {
      if (!conversationId) {
        throw new Error('conversationId required')
      }
      const { data } = await apiClient.get<unknown>(
        `${MESSAGING_PREFIX}/conversations/${conversationId}/messages`,
        {
          params: {
            limit: DEFAULT_MESSAGE_LIMIT,
            ...(pageParam != null ? { beforeId: pageParam } : {}),
          },
        }
      )
      return messagingMessagesResponseSchema.parse(data)
    },
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore && lastPage.meta.nextBeforeId != null
        ? lastPage.meta.nextBeforeId
        : undefined,
  })
}

export function useCreateConversation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: { clientId: number }) => {
      const { data } = await apiClient.post<unknown>(
        `${MESSAGING_PREFIX}/conversations`,
        body
      )
      return createConversationResponseSchema.parse(data)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: messagingKeys.conversations(),
      })
    },
    onError: (error: unknown) => {
      const msg = isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined
      toast.error(msg ?? 'Could not open conversation')
    },
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (vars: {
      conversationId: string
      body: { body: string; attachments?: unknown }
    }) => {
      const { data } = await apiClient.post<unknown>(
        `${MESSAGING_PREFIX}/conversations/${vars.conversationId}/messages`,
        vars.body
      )
      return messagingMessageSchema.parse(data)
    },
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: messagingKeys.messages(variables.conversationId),
      })
      void queryClient.invalidateQueries({
        queryKey: messagingKeys.conversations(),
      })
    },
    onError: (error: unknown) => {
      const msg = isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined
      toast.error(msg ?? 'Failed to send message')
    },
  })
}

export function useMarkConversationRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (conversationId: string) => {
      const { data } = await apiClient.post<unknown>(
        `${MESSAGING_PREFIX}/conversations/${conversationId}/read`
      )
      return markReadResponseSchema.parse(data)
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: messagingKeys.conversations(),
      })
    },
    onError: (error: unknown) => {
      const msg = isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined
      if (msg) toast.error(msg)
    },
  })
}

/** Oldest → newest for rendering (infinite pages: page0 = latest window) */
export function flattenMessagePages(
  pages: MessagingMessagesResponse[]
): MessagingMessage[] {
  if (pages.length === 0) return []
  return [...pages].reverse().flatMap((p) => p.data)
}
