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
      "Số CMND/CCCD phải gồm 9 hoặc 12 số",
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
  oldPassword: yup.string().trim().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .trim()
    .min(6, "Mật khẩu mới phải ≥ 6 ký tự")
    .required("Vui lòng nhập mật khẩu mới"),
})
export type PasswordChange = yup.InferType<typeof passwordChangeSchema>
