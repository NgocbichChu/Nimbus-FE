import { fetchPatient } from "@/api/petientApi"
import type { Patient } from "@/components/data-table/type-table"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface PatientState {
  patients: Patient[]
  loading: boolean
  error: string | null
  currentPatient: Patient | null
}

const initialState: PatientState = {
  patients: [],
  loading: false,
  error: null,
  currentPatient: null,
}


const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentPatient: (state, action: PayloadAction<Patient | null>) => {
      state.currentPatient = action.payload
    },
    clearCurrentPatient: (state) => {
      state.currentPatient = null
    },
  },
  extraReducers: (builder) => {
    // Fetch patients
    builder
      .addCase(fetchPatient.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPatient.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.loading = false
        state.patients = action.payload
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })  
  },
})

export const { setCurrentPatient, clearCurrentPatient } = patientSlice.actions

export default patientSlice.reducer