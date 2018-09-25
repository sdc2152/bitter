import {
  RECEIVE_USER,
} from "../actions/userActions";

function user(state={}, action) {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_USER:
      console.log(action.user);
      return state;
    default:
      return state;
  }
}

export default user;
