import { z } from 'zod'

export const clientRoleSchema = z.enum([
  'OWNER',
  'ADMIN',
  'PARENT',
  'CHILD',
  'MEMBER',
  'SUPER_ADMIN',
])

export type ClientRole = z.infer<typeof clientRoleSchema>

export const messagingClientSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  email: z.string(),
  avatarUrl: z.string().nullable(),
  tenantId: z.number(),
  tenantName: z.string().nullable(),
  tenantSlug: z.string().nullable(),
  isActive: z.boolean(),
  role: clientRoleSchema,
})

export type MessagingClient = z.infer<typeof messagingClientSchema>

export const messagingClientsResponseSchema = z.object({
  data: z.array(messagingClientSchema),
  meta: z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
  }),
})

export type MessagingClientsResponse = z.infer<
  typeof messagingClientsResponseSchema
>

export const senderRoleSchema = z.enum(['ADMIN', 'CLIENT'])

export const lastMessagePreviewSchema = z.object({
  id: z.number(),
  body: z.string(),
  senderRole: senderRoleSchema,
  createdAt: z.string(),
})

export const messagingConversationSchema = z.object({
  id: z.string(),
  clientId: z.number(),
  clientName: z.string().nullable(),
  clientEmail: z.string(),
  avatarUrl: z.string().nullable(),
  tenantId: z.number(),
  tenantName: z.string().nullable(),
  tenantSlug: z.string().nullable(),
  clientIsActive: z.boolean(),
  lastMessage: lastMessagePreviewSchema.nullable(),
  lastMessageAt: z.string(),
  unreadCount: z.number(),
})

export type MessagingConversation = z.infer<typeof messagingConversationSchema>

export const messagingConversationsResponseSchema = z.object({
  data: z.array(messagingConversationSchema),
})

export type MessagingConversationsResponse = z.infer<
  typeof messagingConversationsResponseSchema
>

export const createConversationResponseSchema = z.object({
  id: z.string(),
  clientId: z.number(),
  clientName: z.string().nullable(),
  clientEmail: z.string(),
  avatarUrl: z.string().nullable(),
  tenantId: z.number(),
})

export type CreateConversationResponse = z.infer<
  typeof createConversationResponseSchema
>

export const messagingMessageSchema = z.object({
  id: z.number(),
  senderRole: senderRoleSchema,
  body: z.string(),
  attachments: z.unknown().nullable(),
  adminId: z.number().nullable(),
  createdAt: z.string(),
})

export type MessagingMessage = z.infer<typeof messagingMessageSchema>

export const messagingMessagesResponseSchema = z.object({
  data: z.array(messagingMessageSchema),
  meta: z.object({
    hasMore: z.boolean(),
    nextBeforeId: z.number().nullable(),
  }),
})

export type MessagingMessagesResponse = z.infer<
  typeof messagingMessagesResponseSchema
>

export const markReadResponseSchema = z.object({
  success: z.boolean(),
})

export type MarkReadResponse = z.infer<typeof markReadResponseSchema>

export const clientListStatusSchema = z.enum(['active', 'inactive', 'all'])
export type ClientListStatus = z.infer<typeof clientListStatusSchema>
