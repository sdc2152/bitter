import {combineReducers} from "redux";

import {normalizeArray} from "../apiUtils";
import {
  IS_FETCHING_SUGGESTED_FOLLOWS,
  RECEIVE_SUGGESTED_FOLLOWS,
  RECEIVE_SUGGESTED_FOLLOWS_ERRORS,
  CLEAR_SUGGESTED_FOLLOWS_ERRORS,
} from "../actions/suggestedFollowActions";

function isFetching(state=false, action) {
  switch(action.type){
    case IS_FETCHING_SUGGESTED_FOLLOWS:
      return true;
    case RECEIVE_SUGGESTED_FOLLOWS_ERRORS:
    case RECEIVE_SUGGESTED_FOLLOWS:
      return false;
    default:
      return state;
  }
}

function byIds(state={}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SUGGESTED_FOLLOWS:
      return Object.assign({}, state, normalizeArray(action.users, "id"));
    default:
      return state;
  }
}

function userIds(state=[], action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SUGGESTED_FOLLOWS:
      return action.users.map(user => user.id);
    default:
      return state;
  }
}

function errors(state={}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SUGGESTED_FOLLOWS_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_SUGGESTED_FOLLOWS_ERRORS:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  byIds,
  userIds,
  isFetching,
  errors,
});
