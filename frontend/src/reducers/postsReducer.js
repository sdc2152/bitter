import {combineReducers} from "redux";
import {normalizeArray, normalizeEntry} from "../apiUtils";
import {
  POST_CONTEXT,
  REMOVE_POST,
  RECEIVE_POSTS,
  RECEIVE_POST,
  IS_FETCHING_POSTS,
  CLEAR_POSTS,
  CHANGE_POST_BODY,
  CHANGE_POST_MODAL_BODY,
  CREATE_POST_SUCCESS,
  RECEIVE_POST_ERRORS,
  RECEIVE_POSTS_ERRORS,
  CLEAR_POST_ERRORS,
} from "../actions/postsActions";

const postIds = (state=[], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      if (action.postContext === POST_CONTEXT.HOME_PAGE) {
        return [action.post.id, ...state];
      }
      return state;
    case REMOVE_POST:
      return state.filter(i => i !== action.postId);
    case RECEIVE_POSTS:
      return action.posts.map(post => post.id);
    case CLEAR_POSTS:
      return [];
    default:
      return state;
  }
};

const byIds = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case REMOVE_POST: {
      let newState = Object.assign({}, state);
      delete newState[action.postId];
      return newState;
    }
    case RECEIVE_POST:
      if (action.postContext === POST_CONTEXT.HOME_PAGE) {
        return Object.assign({}, state, normalizeEntry(action.post, "id"));
      }
      return state;
    case RECEIVE_POSTS: {
      return normalizeArray(action.posts, "id");
    }
    case CLEAR_POSTS:
      return {};
    default:
      return state;
  }
};

const errors = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST_ERRORS:
    case RECEIVE_POSTS_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_POST_ERRORS:
      return {};
    default:
      return state;
  }
};

const isFetching = (state=false, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST_ERRORS:
    case RECEIVE_POSTS_ERRORS:
    case RECEIVE_POST:
    case RECEIVE_POSTS:
      return false;
    case IS_FETCHING_POSTS:
      return true;
    default:
      return state;
  }
};

const defaultPostForm = {
  body: ""
};

const form = (state=defaultPostForm, action) => {
  Object.freeze(state);
  switch(action.type) {
    case CHANGE_POST_BODY:
      return Object.assign({}, state, {body: action.body});
    case CREATE_POST_SUCCESS:
      return Object.assign({}, state, {body: ""});
    default:
      return state;
  }
};

const defaultPostModal = {
  body: "",
};

const formModal = (state=defaultPostModal, action) => {
  Object.freeze(state);
  switch(action.type) {
    case CHANGE_POST_MODAL_BODY:
      return Object.assign({}, state, {body: action.body});
    case CREATE_POST_SUCCESS:
      return defaultPostModal;
    default:
      return state;
  }
};

export default combineReducers({
  byIds,
  postIds,
  errors,
  isFetching,
  form,
  formModal,
});
