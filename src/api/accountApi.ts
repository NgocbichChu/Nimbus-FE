import { put, get, post } from "./axiosConfig"

export const doiMatKhau = async (data: { oldPassword: string; newPassword: string }) => {
  try {
    const response = await put<any>("/account/DoiMatKhau", data)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const layThongTinTaiKhoan = async () => {
  try {
    const response = await get<any>("/account/LayThongTin")
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const capNhatThongTin = async (data: any) => {
  try {
    const response = await put<any>("/account/CapNhatThongTin", data)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const taoBenhNhan = async () => {
  try {
    const response = await post<any>("/auth/thong-tin-bo-sung")
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}
