import {
  RECEIVE_DISPLAY_USER,
  RECEIVE_DISPLAY_USER_ERRORS,
  IS_FETCHING_DISPLAY_USER,
} from "../actions/userActions";

const defaultState = {
  isFetching: false,
  user: {},
  errors: {},
};

function user(state=defaultState, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_DISPLAY_USER:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user,
      });
    case RECEIVE_DISPLAY_USER_ERRORS:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors,
      });
    case IS_FETCHING_DISPLAY_USER:
      return Object.assign({}, state, {isFetching: true});
    default:
      return state;
  }
}

export default user;
