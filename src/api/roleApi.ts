import { toastError, toastSuccess } from "@/helper/toast"
import { post } from "./axiosConfig"

interface RoleAdminRequest {
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  matKhau: string
  chucVu: string
  ghiChu: string
}

export const registerAdmin = async (roleData: RoleAdminRequest): Promise<any> => {
  try {
    const res = await post<any>("/quanly/dangki/quanly", roleData)
    if (res.success === true) {
      toastSuccess("Cấp tài khoản thành công!")
    }
    return res
  } catch (error) {
    toastError("Cấp tài khoản thất bại!")
    console.error("Login failed:", error)
    throw error
  }
}
