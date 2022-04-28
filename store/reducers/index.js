import { combineReducers } from "redux";
import applicationReducer from "./applicationReducer";

export default combineReducers({
  applicationData: applicationReducer,
});
