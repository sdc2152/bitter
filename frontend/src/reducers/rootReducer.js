import {combineReducers} from "redux";
import auth from "./authReducer";
import user from "./userReducer";
import posts from "./postsReducer";

const rootReducer = combineReducers({
  auth: auth,
  displayUser: user,
  posts: posts,
});

export default rootReducer;
