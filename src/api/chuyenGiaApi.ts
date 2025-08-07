import { get } from "./axiosConfig"

export const getDanhSachChuyenGia = async () => {
  try {
    const response = await get<any>("/bac-si/LayDanhSachBacSi")
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}
