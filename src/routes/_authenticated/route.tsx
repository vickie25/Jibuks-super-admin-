import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { parseRedirectTarget } from '@/lib/auth-redirect'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const token = useAuthStore.getState().auth.accessToken
    if (token) return
    const target = parseRedirectTarget(
      `${location.pathname}${location.search}${location.hash}`
    )
    throw redirect({
      to: '/sign-in',
      search: { redirect: target },
      replace: true,
    })
  },
  component: AuthenticatedLayout,
})
