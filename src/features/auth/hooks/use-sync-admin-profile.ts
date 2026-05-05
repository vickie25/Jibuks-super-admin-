import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { useGetCurrentAdmin } from '../api/auth-api'

/**
 * After a hard refresh, only the token is restored from cookies; refetch `/admin/me`
 * and hydrate name/email (and optional avatar) into the auth store.
 */
export function useSyncAdminProfile() {
  const token = useAuthStore((s) => s.auth.accessToken)
  const setUser = useAuthStore((s) => s.auth.setUser)

  const { data, isSuccess } = useGetCurrentAdmin({
    enabled: !!token,
    staleTime: 60 * 1000,
  })

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data)
    }
  }, [isSuccess, data, setUser])
}
