import * as yup from "yup"

export const DoctorSchema = yup.object({
  hoTen: yup.string().required("Họ tên không được để trống"),
  gioiTinh: yup.string().oneOf(["M", "F"], "Giới tính không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ")
    .required("Vui lòng nhập số điện thoại"),
  matKhau: yup
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Mật khẩu không được để trống"),
  tenKhoa: yup.string().required("Tên khoa là bắt buộc"),
  chungChi: yup.string().required("Chứng chỉ là bắt buộc"),
  trinhDo: yup.string().required("Trình độ là bắt buộc"),
  kinhNghiem: yup.number().min(0, "Kinh nghiệm không được âm").required("Kinh nghiệm là bắt buộc"),
  ngayTuyenDung: yup.string().required("Ngày tuyển dụng là bắt buộc"),
  ghiChu: yup.string().optional(),
  trangThaiHoatDong: yup.boolean(),
})
export type DoctorSchemaType = yup.InferType<typeof DoctorSchema>