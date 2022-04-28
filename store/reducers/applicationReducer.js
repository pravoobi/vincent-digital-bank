import { GET_SAMPLE, SET_APPLICATION, SET_APPLICATION_STEP } from "../types";

const initialState = {
  sample: [],
  step: "",
  application: {},
  loading: true,
};

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAMPLE:
      return {
        ...state,
        sample: action.payload,
      };

    case SET_APPLICATION_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case SET_APPLICATION:
      return {
        ...state,
        application: {
          ...state.application,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default applicationReducer;
