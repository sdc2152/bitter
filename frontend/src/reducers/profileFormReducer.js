import {combineReducers} from "redux";

import {
  SET_INITIAL_PROFILE_FORM,
  CHANGE_PROFILE_FIELD,
  RECEIVE_PROFILE_FORM_ERRORS,
  CLEAR_PROFILE_FORM_ERRORS,
  IS_UPDATING_PROFILE,
  getProfileDataFromUser,
  getUserDataFromUser,
} from "../actions/profileFormActions";

const defaultState = {
  avatar: null,
  banner: null,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  slug: "",
  description: "",
};

function fields(state=defaultState, action) {
  Object.freeze(state);
  switch(action.type) {
    case SET_INITIAL_PROFILE_FORM: {
      const {currentUser} = action;
      return {
        ...getUserDataFromUser(currentUser),
        ...getProfileDataFromUser(currentUser),
      };
    }
    case CHANGE_PROFILE_FIELD:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function errors(state={}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_PROFILE_FORM_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_PROFILE_FORM_ERRORS:
      return {};
    default:
      return state;
  }
}

function isUpdating(state=false, action) {
  switch(action.type) {
    case RECEIVE_PROFILE_FORM_ERRORS:
    case CLEAR_PROFILE_FORM_ERRORS:
      return false;
    case IS_UPDATING_PROFILE:
      return true;
    default:
      return state;
  }
}

export default combineReducers({
  fields,
  errors,
  isUpdating,
});
