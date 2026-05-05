import { z } from 'zod'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { SignIn } from '@/features/auth/sign-in'
import { parseRedirectTarget } from '@/lib/auth-redirect'
import { useAuthStore } from '@/stores/auth-store'

const searchSchema = z.object({
  redirect: z.string().optional(),
})

export const Route = createFileRoute('/(auth)/sign-in')({
  component: SignIn,
  validateSearch: searchSchema,
  beforeLoad: ({ search }) => {
    const token = useAuthStore.getState().auth.accessToken
    if (!token) return
    const to = parseRedirectTarget(search.redirect)
    throw redirect({ to, replace: true })
  },
})
