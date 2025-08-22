import { get, put } from "./axiosConfig"

export const lichSuKham = async () => {
  try {
    const response = await get<any>("/ho-so-ca-nhan/LichSuKham")
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const huyLichKham = async (lichkhamId: number) => {
  try {
    const response = await put<any>(`/lich-kham/HuyLichKham/${lichkhamId}`)
    return response
  } catch (error) {
    console.log("Lỗi : ", error)
  }
}
