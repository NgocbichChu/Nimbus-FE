import { get } from "./axiosConfig"

export const getDanhSachChuyenKhoa = async () => {
  try {
    const response = await get<any>("/guest/chuyen-khoa")
    return response
  } catch (error) {
    console.error("Lỗi lấy danh sách chuyên khoa:", error)
    throw error
  }
}

export const getChuyenKhoaAdmin = async () => {
  try {
    const response = await get<any>("/chuyen-khoa/LayDanhSachChuyenKhoa")
    return response
  } catch (error) {
    console.error("Lỗi lấy danh sách chuyên khoa cho admin:", error)
    throw error
  }
}
