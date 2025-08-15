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
  benhnhan_id: number
  hoTen: string
  gioiTinh: "Nam" | "Nữ"
  email: string
  soDienThoai: string
  cccd: string
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

export type Receptionist = {
  leTanId: number,
  hoTen: string,
  gioiTinh: string,
  email: string,
  soDienThoai: string,
  ngayTuyenDung: string,
  chucVu: string,
  ghiChu: string,
  ngayTao: string,
  ngayCapNhat: string,
  trangThaiHoatDong: boolean
}

export type Manager = {
  quanLiId: number,
  hoTen: string,
  gioiTinh: string,
  email: string,
  soDienThoai: string,
  ngayTuyenDung: string,
  chucVu: string,
  ghiChu: string,
  ngayTao: string,
  ngayCapNhat: string,
  trangThaiHoatDong: boolean
}

