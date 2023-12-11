import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "donationWeb",
  initialState: {
    fundingModal: false,
  },
  reducers: {
    updateModalState(state, action) {
      state.fundingModal = action.payload;
    },
  },
});

export const { updateModalState } = todosSlice.actions;
export default todosSlice.reducer;
