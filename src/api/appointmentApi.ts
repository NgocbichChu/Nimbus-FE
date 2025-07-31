import { get } from "./axiosConfig"

export const getLoaiHinhKham = async () => {
  try {
    const response = await get<any>("/api/dich-vu/LayDanhSachDichVu")
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}
