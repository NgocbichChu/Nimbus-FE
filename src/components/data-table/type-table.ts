export type Doctor = {
  bacsi_id: string
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  chuyenKhoaId: number
  chungChi: string
  trinhDo: string
  kinhNghiem: number
  ngayTuyenDung: string
  ghiChu: string
  trangThaiHoatDong: boolean
}
export type Patient = {
  benhnhan_id: string
  hoTen: string
  gioiTinh: "M" | "F" | "O"
  ngaySinh: string
  email: string
  soDienThoai: string
  cccd: string
  diaChi: string
  nhomMau: "A" | "B" | "AB" | "O"
  trangThaiHoatDong: boolean
}
export type Certification = {
  benhnhan_id: string
  hoTen: string
  email: string
  ngayNop: string
  trangThai: string
}
