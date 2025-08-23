import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
  matKhau: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})

export type LoginSchemaType = yup.InferType<typeof loginSchema>

export const signUpSchema = yup.object({
  hoTen: yup.string().required("Họ tên không được để trống"),
  gioiTinh: yup.string().oneOf(["Nam", "Nữ"]).required("Giới tính là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  matKhau: yup
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("matKhau")], "Xác nhận mật khẩu không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
})

export type SignUpSchemaType = yup.InferType<typeof signUpSchema>

export const appointmentSchema = yup.object().shape({
  serviceType: yup.string().required("Vui lòng chọn loại hình khám"),

  specialty: yup.string().required("Vui lòng chọn chuyên khoa"),

  doctor: yup.string().required("Vui lòng chọn bác sĩ"),

  selectedDate: yup.string().required("Vui lòng chọn ngày khám"),

  selectedDate2: yup.string().required("Vui lòng chọn ngày khám"),

  selectedTime: yup.string().required("Vui lòng chọn giờ khám"),

  selectedTime2: yup.string().required("Vui lòng chọn giờ khám"),

  note: yup.string().max(500, "Vấn đề không được vượt quá 500 ký tự"),
})

export const ForgetPasswordSchema = yup.object({
  email: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
})

export type ForgetPasswordSchema = yup.InferType<typeof ForgetPasswordSchema>

export const OtpSchema = yup.object({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP")
    .matches(/^[0-9]{6}$/, "Mã OTP phải gồm đúng 6 chữ số"),
})
export type OtpSchema = yup.InferType<typeof OtpSchema>

export const ResetPasswordSchema = yup.object({
  matKhau: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
})
export type ResetPasswordSchema = yup.InferType<typeof ResetPasswordSchema>
