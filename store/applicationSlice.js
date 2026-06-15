import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: "",
  application: {},
};

const applicationSlice = createSlice({
  name: "applicationData",
  initialState,
  reducers: {
    setApplicationStep(state, action) {
      state.step = action.payload;
    },
    setApplicationData(state, action) {
      state.application = { ...state.application, ...action.payload };
    },
  },
});

export const { setApplicationStep, setApplicationData } =
  applicationSlice.actions;
export default applicationSlice.reducer;
