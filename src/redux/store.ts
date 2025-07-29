import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import doctorSlice from "./doctorSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    doctors: doctorSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
