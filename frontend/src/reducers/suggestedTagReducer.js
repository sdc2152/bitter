import {combineReducers} from "redux";

import {normalizeArray} from "../apiUtils";
import {
  IS_FETCHING_SUGGESTED_TAGS,
  RECEIVE_SUGGESTED_TAGS,
  RECEIVE_SUGGESTED_TAGS_ERRORS,
  CLEAR_SUGGESTED_TAGS_ERRORS,
} from "../actions/suggestedTagActions";

function isFetching(state=false, action) {
  switch(action.type) {
    case IS_FETCHING_SUGGESTED_TAGS:
      return true;
    case RECEIVE_SUGGESTED_TAGS_ERRORS:
    case RECEIVE_SUGGESTED_TAGS:
      return false;
    default:
      return state;
  }
}

function byIds(state={}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SUGGESTED_TAGS:
      return Object.assign({}, state, normalizeArray(action.tags, "id"));
    default:
      return state;
  }
}

function tagIds(state=[], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SUGGESTED_TAGS:
      return action.tags.map(tag => tag.id);
    default:
      return state;
  }
}

function errors(state={}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SUGGESTED_TAGS_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_SUGGESTED_TAGS_ERRORS:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  isFetching,
  byIds,
  tagIds,
  errors,
});
