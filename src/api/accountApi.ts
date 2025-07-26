import { put } from "./axiosConfig"

export const doiMatKhau = async (data: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await put<any>("/account/DoiMatKhau", data)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}
