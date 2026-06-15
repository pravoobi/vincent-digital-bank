import {
  getSampleData,
  setApplicationData,
  setApplicationStep,
} from "../../store/actions/applicationAction";
import {
  GET_SAMPLE,
  SET_APPLICATION,
  SET_APPLICATION_STEP,
} from "../../store/types";

describe("applicationAction", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it("getSampleData dispatches GET_SAMPLE with payload", async () => {
    await getSampleData()(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_SAMPLE,
      payload: [1, 2, 3, 4, 5, 6],
    });
  });

  it("setApplicationData dispatches SET_APPLICATION with given data", async () => {
    const data = { email: "test@test.com", password: "secret" };
    await setApplicationData(data)(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_APPLICATION,
      payload: data,
    });
  });

  it("setApplicationStep dispatches SET_APPLICATION_STEP with given step", async () => {
    await setApplicationStep("DOCUMENT_UPLOAD")(dispatch);
    expect(dispatch).toHaveBeenCalledWith({
      type: SET_APPLICATION_STEP,
      payload: "DOCUMENT_UPLOAD",
    });
  });
});
