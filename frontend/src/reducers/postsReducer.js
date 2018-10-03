import {combineReducers} from "redux";

import {normalizeArray} from "../apiUtils";

import {
  RECEIVE_POST,
  RECEIVE_POST_ERRORS,
  RECEIVE_POSTS,
  RECEIVE_POSTS_ERRORS,
  IS_FETCHING_POSTS,
  CHANGE_POST_BODY,
  CREATE_POST_SUCCESS,
} from "../actions/postsActions";

const postIds = (state=[], action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      return [action.post.id, ...state];
    case RECEIVE_POSTS:
      return [...state, ...action.posts.map(post => post.id)];
    default:
      return state;
  }
};

const byIds = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, {[action.post.id]: action.post});
    case RECEIVE_POSTS: {
      return Object.assign({}, state, normalizeArray(action.posts, "id"));
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

export default combineReducers({
  byIds,
  postIds,
  errors,
  isFetching,
  form,
});