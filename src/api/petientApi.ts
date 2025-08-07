import type { Patient } from "@/components/data-table/type-table"
import { get } from "./axiosConfig"
import type { ApiResponse } from "@/redux"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toastError } from "@/helper/toast"

export const fetchPatient = createAsyncThunk(
  "patients/fetchPatients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get<ApiResponse<Patient[]>>("/benh-nhan/LayDanhSachBenhNhan")
      return response.data
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi tải danh sách bệnh nhân"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)