import { post } from "./axiosConfig"

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const response = await post<any>(`/auth/forgot-password?email=${email}`)

    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const resetPassword = async (data: {
  email: string
  otp: string
  newPassword: string
}): Promise<any> => {
  try {
    const query = `email=${encodeURIComponent(data.email)}&otp=${encodeURIComponent(data.otp)}&newPassword=${encodeURIComponent(data.newPassword)}`
    const response = await post<any>(`/auth/reset-password?${query}`)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}
