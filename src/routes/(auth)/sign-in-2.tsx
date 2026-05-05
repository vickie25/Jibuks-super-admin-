import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignIn2 } from '@/features/auth/sign-in/sign-in-2'
import { parseRedirectTarget } from '@/lib/auth-redirect'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/(auth)/sign-in-2')({
  component: SignIn2,
  beforeLoad: () => {
    const token = useAuthStore.getState().auth.accessToken
    if (!token) return
    throw redirect({ to: '/', replace: true })
  },
})
