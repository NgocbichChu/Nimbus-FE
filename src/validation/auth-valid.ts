import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup.string().required("Vui lòng nhập email").email("Email không hợp lệ"),
  matKhau: yup.string().required("Vui lòng nhập mật khẩu").min(3, "Mật khẩu phải có ít nhất 6 ký tự"),
})

export type LoginSchemaType = yup.InferType<typeof loginSchema>

