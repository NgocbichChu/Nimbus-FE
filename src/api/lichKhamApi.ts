import { get } from "./axiosConfig"

export const lichSuKham = async () => {
  try {
    const response = await get<any>("/ho-so-ca-nhan/LichSuKham")
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}
