import {combineReducers} from "redux";

import {normalizeArray} from "../apiUtils";

import {
  ADD_POST,
  REMOVE_POST,
  RECEIVE_POSTS,
  IS_FETCHING_POSTS,
  CHANGE_POST_BODY,
  CREATE_POST_SUCCESS,
  RECEIVE_POST_ERRORS,
  RECEIVE_POSTS_ERRORS,
  CLEAR_POST_ERRORS,
} from "../actions/postsActions";

const postIds = (state=[], action) => {
  console.log(action.type);
  Object.freeze(state);
  switch(action.type) {
    case ADD_POST:
      return [action.post.id, ...state];
    case REMOVE_POST:
      return state.filter(i => i !== action.postId);
    case RECEIVE_POSTS:
      // TODO: the problem here is that clicking links without reloading page
      //       will keep adding posts to the post state. there needs to be a
      //       add new posts and a fetch original posts or something
      //       ADD_POSTS and ADD_POST for adding to the state and RECEIVE for
      //       replacing
      return action.posts.map(post => post.id);
    default:
      return state;
  }
};

const byIds = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case ADD_POST:
      return Object.assign({}, state, {[action.post.id]: action.post});
    case REMOVE_POST: {
      let newState = Object.assign({}, state);
      delete newState[action.postId];
      return newState;
    }
    case RECEIVE_POSTS: {
      return normalizeArray(action.posts, "id");
    }
    default:
      return state;
  }
};

const errors = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    // TODO: maybe change this so different errors ?? idk
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
    case ADD_POST:
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

export default combineReducers({
  byIds,
  postIds,
  errors,
  isFetching,
  form,
});
