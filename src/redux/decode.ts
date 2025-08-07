import { setUser, setLoading } from "@/redux/authSlice"
import type { AppDispatch } from "./store"

export interface DecodedUser {
  soDienThoai: string
  hoten: string
  roles: string[]
  isQuanLy: boolean
  isLeTan: boolean
  isBacSi: boolean
  isBenhNhan: boolean
  sub: string // email
  iat: number
  exp: number
}

export const decodeAndStoreUserFromToken = (token: string, dispatch: AppDispatch) => {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format")
    }

    // 2. Decode payload (Base64URL → Base64 → JSON)
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
    // Decode Base64 to binary
    const binary = atob(padded)
    const json = decodeURIComponent(
      Array.from(binary)
        .map((char) => "%" + char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    )
    // 3. Parse JSON
    const payload = JSON.parse(json)
    dispatch(setUser(payload))
    return payload
  } catch (error) {
    console.error("Lỗi khi decode token:", error)
    dispatch(setLoading(false))
  }
}
