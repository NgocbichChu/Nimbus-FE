 import { toastError } from "@/helper/toast"
import type { ApiResponse } from "@/redux"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { get } from "./axiosConfig"
// Model dữ liệu
export interface Receptionist {
  leTanId: number
  hoTen: string
  gioiTinh: string
  email: string
  soDienThoai: string
  ngayTuyenDung: string
  chucVu: string
  ghiChu: string
  ngayTao: string
  ngayCapNhat: string
  trangThaiHoatDong: boolean
}
export const fetchReceptions = createAsyncThunk(
  "receptions/fetchReceptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get<ApiResponse<Receptionist[]>>(
        "/le-tan/LayDanhSachLeTan"
      );
       
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Lỗi khi tải danh sách lễ tân";
      toastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
