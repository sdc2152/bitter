import {
  RECEIVE_USER,
  RECEIVE_ERRORS,
  CLEAR_ERRORS,
  RECEIVE_LOGOUT,
} from "../actions/authActions";

const defaultAuthState = {
  initialLoginCheckComplete: false,
  user: {},
  errors: {},
};

function auth(state=defaultAuthState, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
      console.log(action.user.profile);
      return Object.assign({}, state, {
        initialLoginCheckComplete: true,
        user: action.user,
        errors: {},
      });
    case RECEIVE_ERRORS:
      return Object.assign({}, state, {errors: action.errors});
    case CLEAR_ERRORS:
      return Object.assign({}, state, {errors: {}});
    case RECEIVE_LOGOUT:
      return Object.assign({}, state, {user: {}});
    default:
      return state;
  }
}

export default auth;
