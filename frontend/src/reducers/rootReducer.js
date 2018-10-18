import {combineReducers} from "redux";
import auth from "./authReducer";
import user from "./userReducer";
import posts from "./postsReducer";
import postDetail from "./postDetailReducer";

const rootReducer = combineReducers({
  auth: auth,
  displayUser: user,
  posts: posts,
  postDetail: postDetail,
});

export default rootReducer;
