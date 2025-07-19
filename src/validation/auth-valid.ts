import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
  matKhau: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(3, "Mật khẩu phải có ít nhất 3 ký tự"),
})

export type LoginSchemaType = yup.InferType<typeof loginSchema>

export const signUpSchema = yup.object({
  hoTen: yup
    .string()
    .required("Vui lòng nhập họ và tên")
    .min(2, "Họ và tên phải có ít nhất 2 ký tự"),

  gioiTinh: yup
    .string()
    .required("Vui lòng chọn giới tính")
    .oneOf(["M", "F"], "Giới tính không hợp lệ"),

  email: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),

  soDienThoai: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^(03|05|07|08|09)\d{8}$/, "Số điện thoại không hợp lệ"),

  matKhau: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),

  baoHiem: yup.string().optional(),

  lienHeKhanCap: yup
    .string()
    .matches(/^(03|05|07|08|09)\d{8}$/, "Số điện thoại không hợp lệ")
    .optional(),

  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu")
    .oneOf([yup.ref("matKhau")], "Mật khẩu xác nhận không khớp"),
})

export type SignUpSchemaType = yup.InferType<typeof signUpSchema>

export const appointmentSchema = yup.object().shape({
  serviceType: yup.string().required("Vui lòng chọn loại hình khám"),

  specialty: yup.string().required("Vui lòng chọn chuyên khoa"),

  doctor: yup.string().required("Vui lòng chọn bác sĩ"),

  selectedDate: yup.string().required("Vui lòng chọn ngày khám"),

  selectedTime: yup.string().required("Vui lòng chọn giờ khám"),

  note: yup.string().max(500, "Vấn đề không được vượt quá 500 ký tự"),
})
