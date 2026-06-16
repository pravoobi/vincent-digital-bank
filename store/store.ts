import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";
import onboardingReducer from "./onboardingSlice";

export const makeStore = (preloadedState?: object) =>
  configureStore({
    reducer: {
      applicationData: applicationReducer,
      onboarding: onboardingReducer,
    },
    preloadedState,
  });

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
