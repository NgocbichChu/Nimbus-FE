import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { DecodedUser } from "./decode"

interface AuthState {
  user: DecodedUser | null
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.isLoading = false
    },
    register(state, action) {
      state.user = action.payload
      state.isLoading = false
    },
    logout(state) {
      state.user = null
      state.isLoading = false
    },
    setUser(state, action: PayloadAction<DecodedUser>) {
      state.user = action.payload
      state.isLoading = false
    },
    clearUser(state) {
      state.user = null
      state.isLoading = false
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

//  action
export const authActions = authSlice.actions

// reducer
export const { login, logout, register, setUser, clearUser, setLoading } = authSlice.actions
export default authSlice.reducer
