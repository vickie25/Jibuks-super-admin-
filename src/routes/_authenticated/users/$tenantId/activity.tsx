import { createFileRoute } from '@tanstack/react-router'
import { TenantWorkspaceWrapper } from '@/features/tenants/components/workspace/TenantWorkspaceWrapper'

export const Route = createFileRoute('/_authenticated/users/$tenantId/activity')({
  component: TenantWorkspaceWrapper,
})
