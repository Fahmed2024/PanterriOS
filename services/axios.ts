import { handleAxiosError } from '@/utils/error'
import axios from 'axios'

// Axios instance
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// export const baseUrl = 'https://api.staging.lisavue.com/api/v1'
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

// Helper functions
export const setTokens = async (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

export const getAccessToken = () => localStorage.getItem('accessToken')
export const getRefreshToken = () => localStorage.getItem('refreshToken')

export const deleteTokens = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const setRegEmail = async (email: string) => {
  localStorage.setItem('email', JSON.stringify(email))
}

export const getRegEmail = async (): Promise<string | null> => {
  const email = localStorage.getItem('email')
  return email ? JSON.parse(email) : null
}

export const deleteRegEmail = async () => {
  localStorage.removeItem('email')
}
export const setOtp = async (otp: string) => {
  localStorage.setItem('otp', JSON.stringify(otp))
}

export const getOtp = async (): Promise<string | null> => {
  const otp = localStorage.getItem('otp')
  return otp ? JSON.parse(otp) : null
}

export const deleteOtp = async () => {
  localStorage.removeItem('otp')
}
// export const setVerifyOtp = async (otp: string) => {
//   localStorage.setItem('verifyOtp', JSON.stringify(otp))
// }
// export const getVerifyOtp = async (): Promise<string | null> => {
//   const otp = localStorage.getItem('verifyOtp')
//   return otp ? JSON.parse(otp) : null
// }

// export const deleteVerifyOtp = async () => {
//   localStorage.removeItem('verifyOtp')
// }

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    handleAxiosError(error as import('axios').AxiosError)
    return Promise.reject(error)
  }
)

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    handleAxiosError(error as import('axios').AxiosError)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getRefreshToken()
        if (!refreshToken || refreshToken === null)
          throw new Error('No refresh token found')

        const { data } = await axios.post(`${baseUrl}/auth/refresh-token`, {
          refreshToken,
        })
        const newAccessToken = data.body.accessToken
        const newRefreshToken = data.body.refreshToken
        setTokens(newAccessToken, newRefreshToken)
        setTokens(newAccessToken, refreshToken)

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return API(originalRequest)
      } catch (refreshError) {
        handleAxiosError(refreshError as import('axios').AxiosError)
        deleteTokens()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default API
