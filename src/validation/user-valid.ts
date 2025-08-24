import * as yup from "yup"

// Base schema cho các trường chung
const DoctorBaseSchema = yup.object({
  hoTen: yup.string().required("Họ tên không được để trống"),
  gioiTinh: yup.string().oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  tenKhoa: yup.string().required("Chuyên khoa là bắt buộc"),
  chungChi: yup.string().required("Chứng chỉ là bắt buộc"),
  trinhDo: yup.string().required("Trình độ là bắt buộc"),
  kinhNghiem: yup
    .number()
    .typeError("Vui lòng nhập số")
    .min(0, "Kinh nghiệm không được âm")
    .required("Bắt buộc nhập kinh nghiệm"),
  ngayTuyenDung: yup.string().required("Ngày tuyển dụng là bắt buộc"),
  ghiChu: yup.string().optional(),
  trangThaiHoatDong: yup.boolean(),
})

// Schema cho thêm bác sĩ (yêu cầu mật khẩu)
export const DoctorSchema = DoctorBaseSchema.shape({
  matKhau: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
})
export type DoctorSchemaType = yup.InferType<typeof DoctorSchema>

// Schema cho chỉnh sửa bác sĩ (không yêu cầu mật khẩu)
export const DoctorEditSchema = DoctorBaseSchema.shape({
  id: yup.number().optional(),
  matKhau: yup.string().notRequired(),
})

export const taiKhoanSchema = yup.object({
  soDienThoai: yup
    .string()
    .matches(/^0(?:\d{9}|\d{10})$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
})
export type TaiKhoan = yup.InferType<typeof taiKhoanSchema>

const toNull = (v: unknown) => (v === "" || v === undefined ? null : v)
const onlyDigits = (v: unknown) => (typeof v === "string" ? v.replace(/\D/g, "") : v)

export const hoSoSchema = yup.object({
  soDienThoai: yup
    .string()
    .matches(/^0(?:\d{9}|\d{10})$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),

  lienHeKhanCap: yup
    .string()
    .transform((v) => {
      const d = onlyDigits(v)
      return d === "" ? null : (d as string)
    })
    .nullable()
    .matches(/^0(?:\d{9}|\d{10})$/, {
      message: "Số điện thoại không hợp lệ",
      excludeEmptyString: true,
    }),

  diaChi: yup.string().transform(toNull).nullable(),

  baoHiem: yup
    .string()
    .transform((v) => {
      if (typeof v !== "string") return null
      const s = v.trim().toUpperCase()
      return s === "" ? null : s
    })
    .nullable()
    .matches(/^BH[0-9A-Z]+$/, {
      message: "Mã BHYT phải bắt đầu bằng 'BH' và chỉ chứa chữ/số",
      excludeEmptyString: true,
    }),

  canCuocCongDan: yup
    .string()
    .transform((v) => {
      const d = onlyDigits(v)
      return d === "" ? null : (d as string)
    })
    .nullable()
    .test(
      "cmnd-cccd",
      "Số CMND/CCCD phải gồm 9 hoặc 12 số và số 0 ở đầu",
      (val) => !val || /^0(?:\d{8}|\d{11})$/.test(val)
    ),

  danToc: yup
    .string()
    .transform((v) => {
      if (typeof v !== "string") return null
      const s = v.trim()
      return s === "" ? null : s
    })
    .nullable()
    .matches(/^[A-Za-zÀ-ỹ\s]+$/, {
      message: "Dân tộc chỉ được chứa chữ cái",
      excludeEmptyString: true,
    }),
})

export type HoSo = yup.InferType<typeof hoSoSchema>

export const passwordChangeSchema = yup.object({
  oldPassword: yup
    .string()
    .trim()
    .required("Vui lòng nhập mật khẩu hiện tại")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  newPassword: yup
    .string()
    .trim()
    .min(6, "Mật khẩu mới phải ≥ 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
  confirmNewPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu mới")
    .min(6, "Mật khẩu mới phải ≥ 6 ký tự"),
})
export type PasswordChange = yup.InferType<typeof passwordChangeSchema>

// Schema cho thêm Admin mới
export const AdminSchema = yup.object({
  hoTen: yup.string().required("Họ tên không được để trống"),
  gioiTinh: yup
    .string()
    .oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ")
    .required("Vui lòng chọn giới tính"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  matKhau: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  chucVu: yup.string().required("Chức vụ là bắt buộc"),
  ghiChu: yup.string().optional(),
  trangThaiHoatDong: yup.boolean(),
})

// Schema cho thêm Reception mới
export const ReceptionAccessSchema = yup.object({
  hoTen: yup.string().required("Họ tên không được để trống"),
  gioiTinh: yup
    .string()
    .oneOf(["Nam", "Nữ"], "Giới tính không hợp lệ")
    .required("Vui lòng chọn giới tính"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  matKhau: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  ngayTuyenDung: yup.string().required("Ngày tuyển dụng là bắt buộc"),
  chucVu: yup.string().required("Chức vụ là bắt buộc"),
  ghiChu: yup.string().optional(),
  trangThaiHoatDong: yup.boolean(),
})

export type AdminSchemaType = yup.InferType<typeof AdminSchema>
export type ReceptionAccessSchemaType = yup.InferType<typeof ReceptionAccessSchema>
