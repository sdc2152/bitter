import {
  RECEIVE_USER,
  RECEIVE_LOGOUT,
} from "../actions/authActions";

const defaultAuthState = {
  initialLoginCheckComplete: false,
  user: {},
};

function auth(state=defaultAuthState, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
      console.log(action.user);
      return Object.assign({}, state, {
        initialLoginCheckComplete: true,
        user: action.user
      });
    case RECEIVE_LOGOUT:
      return Object.assign({}, state, {user: {}});
    default:
      return state;
  }
}

export default auth;
