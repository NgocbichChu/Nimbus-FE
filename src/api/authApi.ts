import { toastError, toastSuccess } from "@/helper/toast"
import { post } from "./axiosConfig"

interface LoginRequest {
  email: string
  matKhau: string
}

interface RegisterRequest {
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  matKhau: string
  baoHiem: string
  lienHeKhanCap: string
}

export const loginUser = async (loginData: LoginRequest): Promise<any> => {
  try {
    const response = await post<any>("/auth/login", loginData)
    
    if (response.data) {
      localStorage.setItem("token", response.data)
    }
    if (response.success === true) {
      toastSuccess("Đăng nhập thành công")
    }

    return response
  } catch (error) {
    toastError("Đăng nhập thất bại")
    console.error("Login failed:", error)
    throw error
  }
}
export const registerUser = async (registerData: RegisterRequest): Promise<any> => {
  try {
    const response = await post<any>("/auth/register", registerData)

    if (response.success === true) {
      toastSuccess("Vui lòng kiểm tra email để xác nhận tài khoản!")
    }

    return response
  } catch (error) {
    toastError("Đăng ký thất bại")
    console.error("Register failed:", error)
    throw error
  }
}

export const confirmOTP = async (otpData: { otp: any }): Promise<any> => {
  try {
    const response = await post<any>(`/auth/confirm_OTP?otp=${otpData.otp}`)

    if (response.success === true) {
      toastSuccess("Xác nhận OTP thành công. Bạn có thể đăng nhập ngay bây giờ!")
    }

    return response
  } catch (error) {
    toastError("Xác nhận OTP thất bại")
    console.error("Confirm OTP failed:", error)
    throw error
  }
}

   