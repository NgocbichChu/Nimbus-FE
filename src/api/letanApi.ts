 import { toastError, toastSuccess } from "@/helper/toast"
import type { ApiResponse } from "@/redux"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { get, put } from "./axiosConfig"
import type { Manager } from "@/components/data-table/type-table"
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
       console.log("Lễ tân", response.data)
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Lỗi khi tải danh sách lễ tân";
      toastError(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

interface UpdateReceptionRequest {
  leTanId: number
  hoTen: string,
  gioiTinh: string,
  email: string,
  ngayTuyenDung: string,
  soDienThoai: string,
  matKhau: string,
  chucVu: string,
  ghiChu: string,
  trangThaiHoatDong: boolean
}

export const updateReception = createAsyncThunk(
  "reception/updateReception",
  async ({ leTanId, ...updateData }: UpdateReceptionRequest, { rejectWithValue }) => {
    console.log("id",leTanId)
    const payload = {
      hoTen: updateData.hoTen,
      gioiTinh: updateData.gioiTinh,
      email: updateData.email,
      soDienThoai: updateData.soDienThoai,
      matKhau: updateData.matKhau,
      ngayTuyenDung: updateData.ngayTuyenDung,
      chucVu: updateData.chucVu,
      ghiChu: updateData.ghiChu,
      trangThaiHoatDong: updateData.trangThaiHoatDong
    }
     console.log("body", payload)
    try {
      const response = await put<Manager>(`/le-tan/CapNhatLeTan/${leTanId}`, updateData)
      toastSuccess("Cập nhật lễ tân thành công!")
      return response
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Lỗi khi cập nhật lễ tân"
      toastError(errorMessage)
      return rejectWithValue(errorMessage)
    }
  }
)