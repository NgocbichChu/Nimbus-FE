import * as yup from "yup"

export const signUpSchema = yup.object({
  hoTen: yup.string().required("Họ tên không được để trống"),
  gioiTinh: yup.string().oneOf(["M", "F"]).required("Giới tính là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  soDienThoai: yup.string().required("Số điện thoại là bắt buộc"),
  matKhau: yup.string().required("Mật khẩu là bắt buộc"),
  tenKhoa: yup.string().required("Tên khoa là bắt buộc"),
  chungChi: yup.string().optional(),
  trinhDo: yup.string().optional(),
  kinhNghiem: yup.number().min(0, "Kinh nghiệm phải >= 0").optional(),
  ngayTuyenDung: yup.string().optional(),
  ghiChu: yup.string().optional(),
  trangThaiHoatDong: yup.boolean().optional(),
})
