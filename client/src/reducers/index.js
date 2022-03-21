import { combineReducers } from "redux";
import hdfReducer from "./hdfReducer";
import authReducer from "./authReducer";
import errReducer from "./errReducer";

export default combineReducers({
  hdf: hdfReducer,
  auth: authReducer,
  error: errReducer,
});
