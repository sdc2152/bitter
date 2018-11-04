import {combineReducers} from "redux";
import auth from "./authReducer";
import displayUser from "./displayUserReducer";
import profileForm from "./profileFormReducer";
import posts from "./postsReducer";
import postDetail from "./postDetailReducer";
import image from "./imageReducer";
import suggestedFollows from "./suggestedFollowReducer";
import suggestedTags from "./suggestedTagReducer";

const rootReducer = combineReducers({
  auth,
  displayUser,
  profileForm,
  posts,
  postDetail,
  image,
  suggestedFollows,
  suggestedTags,
});

export default rootReducer;
