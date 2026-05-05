/**
 * Normalizes `redirect` from sign-in search (may be a path or full URL from location.href).
 */
export function parseRedirectTarget(raw?: string): string {
  if (!raw?.trim()) return '/'
  const s = raw.trim()
  if (s.startsWith('http://') || s.startsWith('https://')) {
    try {
      const u = new URL(s)
      return u.pathname + u.search + u.hash || '/'
    } catch {
      return '/'
    }
  }
  return s.startsWith('/') ? s : '/'
}
