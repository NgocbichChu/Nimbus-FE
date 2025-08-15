import { toastError, toastSuccess } from "@/helper/toast"
import { post, get } from "./axiosConfig"

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
      localStorage.setItem("pendingEmail", registerData.email)
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
      localStorage.removeItem("pendingEmail");
      toastSuccess("Xác nhận OTP thành công. Bạn có thể đăng nhập ngay bây giờ!")
    }

    return response
  } catch (error) {
    toastError("Xác nhận OTP thất bại")
    console.error("Confirm OTP failed:", error)
    throw error
  }
}

export const resendOTP = async (): Promise<any> => {
  const email = localStorage.getItem("pendingEmail")
  if (!email) {
    toastError("Không tìm thấy email cần xác nhận")
    return
  }

  try {
    const response = await get<any>(`/auth/resend-otp`, {
      params: { email },
    })

    if (response.data?.success) {
      toastSuccess("Mã OTP đã được gửi lại")
    }
    return response
  } catch (error) {
    toastError("Gửi lại OTP thất bại")
    console.error("Resend OTP failed:", error)
    throw error
  }
}

export const logoutUser = async (): Promise<any> => {
  try {
    const response = await post<any>("/auth/logout")

    if (response.success === true) {
      localStorage.removeItem("token")
      toastSuccess("Đăng xuất thành công")
    }
    return response
  } catch (error) {
    toastError("Đăng xuất thất bại")
    console.error("Logout failed:", error)
    throw error
  }
}
