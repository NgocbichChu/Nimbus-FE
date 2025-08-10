import type { ApiResponse } from "@/redux";
import { post } from "./axiosConfig";


interface SendMail {
    name: string,
    email: string
    phone: string
    subject: string
    message: string
}

export const sendMail = async (data: SendMail) => {
    try {
        const response = await post<ApiResponse<any>>("/mail/send-mail", data);
        return response.data
    } catch (error: any) {
        console.error("Lỗi : ", error)
        throw error
    }
}