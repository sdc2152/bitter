import {
  RECEIVE_POST,
  RECEIVE_POST_ERRORS,
  RECEIVE_POSTS,
  RECEIVE_POSTS_ERRORS,
  IS_FETCHING_POSTS,
} from "../actions/postsActions";

const defaultState = {
  isFetching: false,
  posts: [],
  errors: {},
};

function posts(state=defaultState, action) {
  Object.freeze(state);
  console.log(action);
  switch(action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, {posts: [action.post, ...state.posts]});
    case RECEIVE_POST_ERRORS:
      // TODO: idk prolly need more state
      return state;
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts,
      });
    case RECEIVE_POSTS_ERRORS:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors,
      });
    case IS_FETCHING_POSTS:
      return Object.assign({}, state, {isFetching: true});
    default:
      return state;
  }
}

export default posts;
