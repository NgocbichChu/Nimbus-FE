import { get } from "./axiosConfig"

export const getDanhSachChuyenKhoa = async () => {
  try {
    const response = await get<any>("/api/chuyen-khoa/LayDanhSachChuyenKhoa")
    return response
  } catch (error) {
    console.error("Lỗi lấy danh sách chuyên khoa:", error)
    throw error
  }
}
