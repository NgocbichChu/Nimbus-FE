import type { ApiResponse } from "@/redux"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { get, put } from "./axiosConfig"
import { toastError, toastSuccess } from "@/helper/toast"

export interface Manager {
  quanLyId: number
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  ngayTuyenDung: string
  chucVu: string
  ghiChu: string
  matKhau: string
  ngayTao: string
  ngayCapNhat: string
  trangThaiHoatDong: boolean
}

interface UpdateManagerRequest {
  quanLyId: number
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  matKhau: string
  chucVu: string
  ghiChu: string
  trangThaiHoatDong: boolean
}

export const fetchManager = createAsyncThunk(
  "manages/fetchManager",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get<ApiResponse<Manager[]>>("/quan-ly/LayDanhSachQuanLy")

      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải danh sách lễ tân"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

export const updateManager = createAsyncThunk(
  "doctors/updateDoctor",
  async ({ quanLyId, ...updateData }: UpdateManagerRequest, { rejectWithValue }) => {
    const payload = {
      hoTen: updateData.hoTen,
      gioiTinh: updateData.gioiTinh,
      email: updateData.email,
      soDienThoai: updateData.soDienThoai,
      matKhau: updateData.matKhau,
      chucVu: updateData.chucVu,
      ghiChu: updateData.ghiChu,
      trangThaiHoatDong: updateData.trangThaiHoatDong,
    }

    try {
      const response = await put<Manager>(`/quan-ly/CapNhatQuanLy/${quanLyId}`, updateData)
      toastSuccess("Cập nhật quản lý thành công!")
      return response
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật quản lý"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)
