import axios from 'axios'
import type { LoginData, RegisterData, User } from '../models/Auth'
import { apiClient } from '../api/apiClient'

interface MessageResponse {
  message: string
}

function extractMessage(data: unknown): string | null {
  if (typeof data === 'string' && data.trim()) return data

  if (Array.isArray(data)) {
    const messages = data.filter((item): item is string => typeof item === 'string')
    return messages.length > 0 ? messages.join(' ') : null
  }

  if (data && typeof data === 'object') {
    if ('errors' in data && data.errors && typeof data.errors === 'object') {
      const messages = Object.values(data.errors as Record<string, unknown>)
        .flat()
        .filter((item): item is string => typeof item === 'string')
      if (messages.length > 0) return messages.join(' ')
    }

    if ('message' in data && typeof data.message === 'string') return data.message
    if ('title' in data && typeof data.title === 'string') return data.title
  }

  return null
}

function createAuthError(error: unknown, fallback: string): Error {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return new Error(extractMessage(error.response.data) ?? fallback, { cause: error })
    }

    if (error.request) {
      return new Error(`${fallback} Brak odpowiedzi z serwera.`, { cause: error })
    }
  }

  return new Error(fallback, { cause: error })
}

export async function login(data: LoginData): Promise<User> {
  try {
    const response = await apiClient.post<User>('/account/login', data)
    return response.data
  } catch (error) {
    throw createAuthError(error, 'Nie udało się zalogować.')
  }
}

export async function register(data: RegisterData): Promise<string> {
  try {
    const response = await apiClient.post<MessageResponse>('/account/register', data)
    return response.data.message
  } catch (error) {
    throw createAuthError(error, 'Nie udało się utworzyć konta.')
  }
}

export async function confirmEmail(userId: string, token: string): Promise<string> {
  try {
    const response = await apiClient.get<MessageResponse>('/account/confirm-email', {
      params: { userId, token },
    })
    return response.data.message
  } catch (error) {
    throw createAuthError(error, 'Nie udało się potwierdzić konta.')
  }
}

export async function forgotPassword(email: string): Promise<string> {
  try {
    const response = await apiClient.post<MessageResponse>('/account/forgot-password', { email })
    return response.data.message
  } catch (error) {
    throw createAuthError(error, 'Nie udało się wysłać wiadomości.')
  }
}

export async function resetPassword(email: string, token: string, newPassword: string): Promise<string> {
  try {
    const response = await apiClient.post<MessageResponse>('/account/reset-password', {
      email,
      token,
      newPassword,
    })
    return response.data.message
  } catch (error) {
    throw createAuthError(error, 'Nie udało się zmienić hasła.')
  }
}
