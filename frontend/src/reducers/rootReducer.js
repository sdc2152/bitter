import {combineReducers} from "redux";
import auth from "./authReducer";
import user from "./userReducer";

const rootReducer = combineReducers({
  auth: auth,
  user: user,
});

export default rootReducer;
