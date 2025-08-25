import { get } from "./axiosConfig"

export interface StatisticsData {
  benhNhanMoi: number
  tongLuotKham: number
  dangKiKham: number
  tongLuotHuyKham: number
}

export const getStatistics = async (month: number, year: number): Promise<StatisticsData> => {
  try {
    const response = await get(`/thong-ke/thongkebenhnhan-dangkikham-luotKham-huykham`, {
      params: { month, year },
    })

    console.log("🔍 Raw API response:", response)

    // Nếu response có structure { data: {...} }
    if (response && typeof response === "object" && "data" in response) {
      console.log("📦 Response has .data property:", response.data)
      return response.data as StatisticsData
    }

    // Nếu response trả về trực tiếp object
    console.log("📦 Response is direct object:", response)
    return response as StatisticsData
  } catch (error) {
    console.error("Error fetching statistics:", error)
    throw error
  }
}
