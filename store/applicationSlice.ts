import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationData {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: string;
  houseNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  securityWord?: string;
  otp?: string;
  accountNumber?: string;
  routingNumber?: string;
  consents?: { consent: string; accepted: boolean }[];
  [key: string]: string | undefined | { consent: string; accepted: boolean }[];
}

interface ApplicationState {
  step: string;
  application: ApplicationData;
}

const initialState: ApplicationState = {
  step: "",
  application: {},
};

const applicationSlice = createSlice({
  name: "applicationData",
  initialState,
  reducers: {
    setApplicationStep(state, action: PayloadAction<string>) {
      state.step = action.payload;
    },
    setApplicationData(state, action: PayloadAction<ApplicationData>) {
      state.application = { ...state.application, ...action.payload };
    },
  },
});

export const { setApplicationStep, setApplicationData } =
  applicationSlice.actions;
export default applicationSlice.reducer;
