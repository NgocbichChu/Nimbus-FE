import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { DecodedUser } from "./decode"

interface AuthState {
  user: DecodedUser | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
    },
    register(state, action) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
    setUser(state, action: PayloadAction<DecodedUser>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
  },
})

//  action
export const authActions = authSlice.actions

// reducer
export const { login, logout, register, setUser, clearUser } = authSlice.actions
export default authSlice.reducer
