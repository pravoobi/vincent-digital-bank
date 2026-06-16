import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
}

export interface Address {
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IdDocument {
  idType: string;
  idNumber: string;
  idFirstName: string;
  idLastName: string;
  idDob: string;
  imageBase64: string | null;
}

export interface AiSuggestion {
  field: string;
  value: string;
  reason: string;
}

export interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  personal: Partial<PersonalDetails>;
  address: Partial<Address>;
  document: Partial<IdDocument>;
  aiSuggestions: AiSuggestion[];
  submitted: boolean;
}

const initialState: OnboardingState = {
  currentStep: 1,
  personal: {},
  address: {},
  document: {},
  aiSuggestions: [],
  submitted: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<1 | 2 | 3 | 4>) {
      state.currentStep = action.payload;
    },
    savePersonal(state, action: PayloadAction<PersonalDetails>) {
      state.personal = action.payload;
    },
    saveAddress(state, action: PayloadAction<Address>) {
      state.address = action.payload;
    },
    saveDocument(state, action: PayloadAction<Partial<IdDocument>>) {
      state.document = { ...state.document, ...action.payload };
    },
    addAiSuggestion(state, action: PayloadAction<AiSuggestion>) {
      state.aiSuggestions.push(action.payload);
    },
    clearAiSuggestions(state) {
      state.aiSuggestions = [];
    },
    submitApplication(state) {
      state.submitted = true;
    },
    resetOnboarding() {
      return initialState;
    },
  },
});

export const {
  setStep,
  savePersonal,
  saveAddress,
  saveDocument,
  addAiSuggestion,
  clearAiSuggestions,
  submitApplication,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
