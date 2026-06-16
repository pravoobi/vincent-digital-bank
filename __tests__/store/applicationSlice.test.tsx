import applicationReducer, {
  setApplicationStep,
  setApplicationData,
} from "../../store/applicationSlice";

const initialState = { step: "", application: {} };

describe("applicationSlice", () => {
  it("returns the initial state when called with undefined", () => {
    expect(applicationReducer(undefined, { type: "@@INIT" })).toEqual(
      initialState
    );
  });

  it("setApplicationStep updates step", () => {
    const state = applicationReducer(
      undefined,
      setApplicationStep("DOCUMENT_UPLOAD")
    );
    expect(state.step).toBe("DOCUMENT_UPLOAD");
  });

  it("setApplicationData merges into existing application data", () => {
    const first = applicationReducer(
      undefined,
      setApplicationData({ email: "test@test.com" })
    );
    const second = applicationReducer(
      first,
      setApplicationData({ firstName: "John" })
    );
    expect(second.application).toEqual({
      email: "test@test.com",
      firstName: "John",
    });
  });

  it("setApplicationData overwrites existing fields", () => {
    const first = applicationReducer(
      undefined,
      setApplicationData({ email: "old@test.com" })
    );
    const second = applicationReducer(
      first,
      setApplicationData({ email: "new@test.com" })
    );
    expect(second.application.email).toBe("new@test.com");
  });

  it("ignores unknown action types", () => {
    const state = applicationReducer(initialState, { type: "UNKNOWN" });
    expect(state).toEqual(initialState);
  });
});
