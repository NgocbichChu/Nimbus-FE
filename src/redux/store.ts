import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import doctorSlice from "./doctorSlice"
import patientSlice from "./patientSlice"
import receptionSlice from "./receptionSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    doctors: doctorSlice,
    patient: patientSlice,
    reception: receptionSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
