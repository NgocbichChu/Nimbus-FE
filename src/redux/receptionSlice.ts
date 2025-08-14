// receptionSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Receptionist } from "@/components/data-table/type-table"

export interface ReceptionState {
  Receptionist: Receptionist[]
  loading: boolean
  error: string | null
  currentPatient: Receptionist | null
}

const initialState: ReceptionState = {
  Receptionist: [],
  loading: false,
  error: null,
  currentPatient: null,
}

const receptionSlice = createSlice({
  name: "reception",
  initialState,
  reducers: {
    setReceptionist(state, action: PayloadAction<Receptionist[]>) {
      state.Receptionist = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setCurrentPatient(state, action: PayloadAction<Receptionist | null>) {
      state.currentPatient = action.payload
    },
  },
})

export const { setReceptionist, setLoading, setError, setCurrentPatient } =
  receptionSlice.actions
export default receptionSlice.reducer
