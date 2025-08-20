// receptionSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Manager } from "@/components/data-table/type-table"
import { fetchManager } from "@/api/manager"

export interface managerState {
  manager: Manager[]
  loading: boolean
  error: string | null
  currentPatient: Manager | null
}

const initialState: managerState = {
  manager: [],
  loading: false,
  error: null,
  currentPatient: null,
}

const managerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    setManager(state, action: PayloadAction<Manager[]>) {
      state.manager = action.payload
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    setCurrentPatient(state, action: PayloadAction<Manager | null>) {
      state.currentPatient = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchManager.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchManager.fulfilled, (state, action) => {
        state.loading = false
        state.manager = action.payload
        state.error = null
      })
      .addCase(fetchManager.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch receptions'
      })
  },
})

export const { setManager, setLoading, setError, setCurrentPatient } = managerSlice.actions
export default managerSlice.reducer
