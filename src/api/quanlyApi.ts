import { createAsyncThunk } from "@reduxjs/toolkit"
import { post } from "./axiosConfig"
import { toastError, toastSuccess } from "@/helper/toast"

interface CreateAccountAdmin {
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  matkhau: string
  chucVu: string
  ghiChu: string
}

export type Admin = {
  nguoidung_id: number
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  ngaytao: string
  ngaycapnhat: string
}

export type Reception = {
  hoTen: string
  gioiTinh: string
  email: string
  matkhau: string
  soDienThoai: string
  chucVu: string
  ngayTuyenDung: string
  ghiChu: string
  trangThaiHoatDong: boolean
}

export const addReception = createAsyncThunk(
  "admin/addReception",
  async (accountReception: Reception, { rejectWithValue }) => {
    try {
      const response = await post("/quanly/dangki/letan", accountReception)
      toastSuccess("Đăng kí lễ tân thành công!")
      return response
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi đăng kí lễ tân"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

export const addAdmin = createAsyncThunk(
  "admin/addAdmin",
  async (accountAdmin: CreateAccountAdmin, { rejectWithValue }) => {
    try {
      const response = await post("/quanly/dangki/quanly", accountAdmin)

      toastSuccess("Đăng kí quản lý thành công!")
      return response
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi đăng kí quản lý"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)
