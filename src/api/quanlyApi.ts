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
    nguoidung_id: number,
    hoTen: string
    gioiTinh: string
    email: string
    soDienThoai: string
    ngaytao: string
    ngaycapnhat: string
}

export const addAdmin  = createAsyncThunk(
    "admin/addAdmin",
    async (accountAdmin: CreateAccountAdmin, { rejectWithValue }) => {
        try {
            const response = await post<Admin>("/quanly/dangki/quanly", accountAdmin)
            toastSuccess("Đăng kí quản lý thành công!")
            return response
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Lỗi khi đăng kí quản lý"
            toastError(errorMessage)
            return rejectWithValue(errorMessage)
        }
    }
)