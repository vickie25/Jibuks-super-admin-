import { z } from 'zod'

export const tenantTypeSchema = z.union([
  z.literal('PERSONAL'),
  z.literal('BUSINESS'),
  z.literal('ENTERPRISE'),
])

export type TenantType = z.infer<typeof tenantTypeSchema>

export const tenantSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  tenantType: tenantTypeSchema,
  ownerEmail: z.string().email().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Tenant = z.infer<typeof tenantSchema>

export const tenantListSchema = z.array(tenantSchema)
