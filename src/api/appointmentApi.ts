import { get, post } from "./axiosConfig"

export const getLoaiDichVu = async () => {
  try {
    const response = await get<any>("/loai-hinh-kham/LayDanhSachLoaiHinhKham")
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const getBacSiByChuyenKhoa = async (tenKhoa: string) => {
  try {
    const response = await get<any>(`/guest/bac-si?tenKhoa=${encodeURIComponent(tenKhoa)}`)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const getNgayKhamByChuyenGia = async (id: number) => {
  try {
    const response = await get<any>(`/guest/bac-si/${id}/ngay-lam-viec`)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const getGioTheoNgay = async (id: number, ngay: string, caTruc: string) => {
  try {
    const response = await get<any>(`/guest/bac-si/${id}/ngay/${ngay}/ca/${caTruc}/gio-trong`)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}

export const postTaoLichKham = async (data: any) => {
  try {
    const response = await post<any>(`/lich-kham/TaoLichKham`, data)
    return response
  } catch (error) {
    console.error("Lỗi : ", error)
    throw error
  }
}
