export interface Admin {
  id: number
  email: string
  name: string
  phone?: string
  organization: string
  isActive?: boolean
  createdAt?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  admin: Admin
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  phone: string
  password: string
  organization: string
}
