import {combineReducers} from "redux";
import auth from "./authReducer";
import displayUser from "./displayUserReducer";
import profileForm from "./profileFormReducer";
import posts from "./postsReducer";
import postDetail from "./postDetailReducer";
import image from "./imageReducer";

const rootReducer = combineReducers({
  auth,
  displayUser,
  profileForm,
  posts,
  postDetail,
  image,
});

export default rootReducer;
