export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}
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
