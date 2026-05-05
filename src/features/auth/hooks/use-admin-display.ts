import { useAuthStore } from '@/stores/auth-store'

function initialsFromName(name: string) {
  return (
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?'
  )
}

export function useAdminDisplay() {
  const user = useAuthStore((s) => s.auth.user)
  const token = useAuthStore((s) => s.auth.accessToken)

  const loading = Boolean(token && !user)
  const name = user?.name?.trim() || 'Admin'
  const email = user?.email ?? ''
  const avatar = user?.avatarUrl?.trim() || '/avatars/01.png'

  return {
    name,
    email,
    avatar,
    initials: initialsFromName(name),
    loading,
  }
}
