export type Doctor = {
  bacsi_id: number,
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  matKhau: string
  tenKhoa: string
  chungChi: string
  trinhDo: string
  kinhNghiem: number
  ngayTuyenDung: string
  ghiChu?: string
  trangThaiHoatDong: boolean
}
export type Patient = {
  benhNhanId: number
  hoTen: string
  gioiTinh: "Nam" | "Nữ"
  email: string
  soDienThoai: string
  danToc: string
  lienHeKhanCap: string
  canCuocCongDan: string
  diaChi: string
}
export type Certification = {
  benhnhan_id: string
  hoTen: string
  email: string
  ngayNop: string
  trangThai: string
}

export type Specialty = {
  chuyenKhoaId: string
  tenKhoa: string
  moTa: string 
}

