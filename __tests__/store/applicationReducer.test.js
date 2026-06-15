import applicationReducer from "../../store/reducers/applicationReducer";
import {
  GET_SAMPLE,
  SET_APPLICATION,
  SET_APPLICATION_STEP,
} from "../../store/types";

const initialState = {
  sample: [],
  step: "",
  application: {},
  loading: true,
};

describe("applicationReducer", () => {
  it("returns the initial state when called with undefined", () => {
    expect(applicationReducer(undefined, {})).toEqual(initialState);
  });

  it("handles GET_SAMPLE", () => {
    const payload = [1, 2, 3];
    const state = applicationReducer(undefined, { type: GET_SAMPLE, payload });
    expect(state.sample).toEqual([1, 2, 3]);
  });

  it("handles SET_APPLICATION_STEP", () => {
    const state = applicationReducer(undefined, {
      type: SET_APPLICATION_STEP,
      payload: "DOCUMENT_UPLOAD",
    });
    expect(state.step).toBe("DOCUMENT_UPLOAD");
  });

  it("handles SET_APPLICATION by merging into existing application data", () => {
    const first = applicationReducer(undefined, {
      type: SET_APPLICATION,
      payload: { email: "test@test.com" },
    });
    const second = applicationReducer(first, {
      type: SET_APPLICATION,
      payload: { firstName: "John" },
    });
    expect(second.application).toEqual({
      email: "test@test.com",
      firstName: "John",
    });
  });

  it("overwrites existing fields on SET_APPLICATION", () => {
    const first = applicationReducer(undefined, {
      type: SET_APPLICATION,
      payload: { email: "old@test.com" },
    });
    const second = applicationReducer(first, {
      type: SET_APPLICATION,
      payload: { email: "new@test.com" },
    });
    expect(second.application.email).toBe("new@test.com");
  });

  it("does not mutate state on unknown action", () => {
    const state = applicationReducer(initialState, { type: "UNKNOWN" });
    expect(state).toBe(initialState);
  });
});
