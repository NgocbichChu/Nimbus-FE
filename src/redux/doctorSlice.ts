import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Doctor } from "@/components/data-table/type-table"
import { addDoctor, fetchDoctors, updateDoctor } from "@/api/apiDoctor"



interface DoctorState {
  doctors: Doctor[]
  loading: boolean
  error: string | null
  currentDoctor: Doctor | null
}

const initialState: DoctorState = {
  doctors: [],
  loading: false,
  error: null,
  currentDoctor: null,
}

export interface ApiResponse<T> {
  code: string
  message: string
  data: T
}




const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentDoctor: (state, action: PayloadAction<Doctor | null>) => {
      state.currentDoctor = action.payload
    },
    clearCurrentDoctor: (state) => {
      state.currentDoctor = null
    },
  },
  extraReducers: (builder) => {
    // Fetch doctors
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
        state.loading = false
        state.doctors = action.payload
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Add doctor
    builder
      .addCase(addDoctor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
        state.loading = false
        state.doctors.push(action.payload)
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update doctor
    builder
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
        state.loading = false
        const index = state.doctors.findIndex(doc => doc.bacsi_id === action.payload.bacsi_id)
        if (index !== -1) {
          state.doctors[index] = action.payload
        }
        if (state.currentDoctor?.bacsi_id === action.payload.bacsi_id) {
          state.currentDoctor = action.payload
        }
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Toggle doctor status
    // builder
    //   .addCase(toggleDoctorStatus.pending, (state) => {
    //     state.loading = true
    //     state.error = null
    //   })
    //   .addCase(toggleDoctorStatus.fulfilled, (state, action: PayloadAction<Doctor>) => {
    //     state.loading = false
    //     const index = state.doctors.findIndex(doc => doc.bacsi_id === action.payload.bacsi_id)
    //     if (index !== -1) {
    //       state.doctors[index] = action.payload
    //     }
    //     if (state.currentDoctor?.bacsi_id === action.payload.bacsi_id) {
    //       state.currentDoctor = action.payload
    //     }
    //   })
    //   .addCase(toggleDoctorStatus.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = action.payload as string
    //   })
  },
})

// Actions
export const doctorActions = doctorSlice.actions

// Selectors
export const selectDoctors = (state: { doctors: DoctorState }) => state.doctors.doctors
export const selectLoading = (state: { doctors: DoctorState }) => state.doctors.loading
export const selectError = (state: { doctors: DoctorState }) => state.doctors.error
export const selectCurrentDoctor = (state: { doctors: DoctorState }) => state.doctors.currentDoctor

// Destructure actions
export const { clearError, setCurrentDoctor, clearCurrentDoctor } = doctorSlice.actions

export default doctorSlice.reducer