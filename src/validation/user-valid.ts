import * as yup from "yup"

export const DoctorSchema = yup.object({
  hoTen: yup.string().required("Họ tên không được để trống"),
  gioiTinh: yup.string().oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  matKhau: yup.string().notRequired(),
  tenKhoa: yup.string().required("Tên khoa là bắt buộc"),
  chungChi: yup.string().required("Chứng chỉ là bắt buộc"),
  trinhDo: yup.string().required("Trình độ là bắt buộc"),
  kinhNghiem: yup.number().min(0, "Kinh nghiệm không được âm").required("Kinh nghiệm là bắt buộc"),
  ngayTuyenDung: yup.string().required("Ngày tuyển dụng là bắt buộc"),
  ghiChu: yup.string().optional(),
  trangThaiHoatDong: yup.boolean(),
})
export type DoctorSchemaType = yup.InferType<typeof DoctorSchema>

export const DoctorAddSchema = DoctorSchema.shape({
  matKhau: yup.string().required("Mật khẩu không được để trống"),
})

export const DoctorEditSchema = DoctorSchema.shape({
  id: yup.number().optional(), // 👈 thêm id
})

export const taiKhoanSchema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  lienHeKhanCap: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  diaChi: yup.string().required("Địa chỉ không được để trống"),
  maBHYT: yup
    .string()
    .required("Mã BHYT không được để trống")
    .matches(/^BH[A-Za-z0-9]*$/, "Mã BHYT phải bắt đầu bằng 'BH' và chỉ chứa chữ/số"),
  CCCD: yup
    .string()
    .required("Số CMND/CCCD không được để trống")
    .matches(/^0[0-9]{8,11}$/, "Số CMND/CCCD phải bắt đầu bằng 0 và chỉ chứa số"),
  danToc: yup
    .string()
    .required("Dân tộc không được để trống")
    .matches(/^[A-Za-zÀ-ỹ\s]+$/, "Dân tộc chỉ được chứa chữ cái"),
})
export type TaiKhoan = yup.InferType<typeof taiKhoanSchema>

export const passwordChangeSchema = yup.object({
  oldPassword: yup.string().trim().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .trim()
    .min(6, "Mật khẩu mới phải ≥ 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
})
export type PasswordChange = yup.InferType<typeof passwordChangeSchema>
