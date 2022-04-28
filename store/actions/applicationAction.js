import { GET_SAMPLE, SET_APPLICATION_STEP, SET_APPLICATION } from "../types";

export const getSampleData = () => async (dispatch) => {
  dispatch({
    type: GET_SAMPLE,
    payload: [1, 2, 3, 4, 5, 6],
  });
};

export const setApplicationData = (applicationData) => async (dispatch) => {
  dispatch({ type: SET_APPLICATION, payload: applicationData });
};
export const setApplicationStep = (step) => async (dispatch) => {
  dispatch({ type: SET_APPLICATION_STEP, payload: step });
};
