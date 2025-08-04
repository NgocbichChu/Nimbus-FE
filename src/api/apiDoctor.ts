import { toastError, toastSuccess } from "@/helper/toast"
import type { ApiResponse } from "@/redux/doctorSlice"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { get, post, put } from "./axiosConfig"
import type { Doctor } from "@/components/data-table/type-table"

// Interface for creating a new doctor
 interface CreateDoctorRequest {
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

// Interface for updating a doctor
 interface UpdateDoctorRequest {
  id: number
  hoTen?: string
  gioiTinh?: string
  email?: string
  soDienThoai?: string
  chuyenKhoaId?: number
  chungChi?: string
  trinhDo?: string
  kinhNghiem?: number
  ngayTuyenDung?: string
  ghiChu?: string
  trangThaiHoatDong?: boolean
}

// Async thunk to fetch all doctors
export const fetchDoctors = createAsyncThunk(
  "doctors/fetchDoctors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get<ApiResponse<Doctor[]>>("/bac-si/LayDanhSachBacSi")
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải danh sách bác sĩ"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

// Async thunk to add a new doctor
export const addDoctor = createAsyncThunk(
  "doctors/addDoctor",
  async (doctorData: CreateDoctorRequest, { rejectWithValue }) => {
    try {
      const response = await post<Doctor>("/bac-si/TaoMoiBacSi", doctorData)
      toastSuccess("Thêm bác sĩ thành công!")
      return response
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi thêm bác sĩ"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

// Async thunk to update a doctor
export const updateDoctor = createAsyncThunk(
  "doctors/updateDoctor",
  async ({ id, ...updateData }: UpdateDoctorRequest, { rejectWithValue }) => {
    try {
      const response = await put<Doctor>(`/bac-si/CapNhatBacSi/${id}`, updateData)
      toastSuccess("Cập nhật bác sĩ thành công!")
      return response
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật bác sĩ"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)

// // Async thunk to toggle doctor status
// export const toggleDoctorStatus = createAsyncThunk(
//   "doctors/toggleDoctorStatus",
//   async ({ bacsi_id, trangThaiHoatDong }: { bacsi_id: string; trangThaiHoatDong: boolean }, { rejectWithValue }) => {
//     try {
//       const response = await put<Doctor>(`/bacsi/trangthai/${bacsi_id}`, { trangThaiHoatDong })
//       toastSuccess("Cập nhật trạng thái thành công!")
//       return response
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật trạng thái"
//       toastError(errorMessage)
//       return rejectWithValue(errorMessage)
//     }
//   }
// )