import { createSlice } from "@reduxjs/toolkit"

interface RoleState {
  user: null
}

const initialState: RoleState = {
  user: null,
}
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    saveRoleUser(state, action) {},
    saveRoleUserSuccess(state, action) {
      state.user = action.payload
    },
  },
})

export const roleAction = roleSlice.actions
export default roleSlice.reducer
