import { configureStore } from "@reduxjs/toolkit";
import applicationReducer from "./applicationSlice";

export const makeStore = (preloadedState) =>
  configureStore({
    reducer: { applicationData: applicationReducer },
    preloadedState,
  });

export const store = makeStore();
