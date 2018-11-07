import {combineReducers} from "redux";
import {normalizeArray, normalizeEntry} from "../apiUtils";

// TODO: implement errors
import {RECEIVE_POST, POST_CONTEXT} from "../actions/postsActions";
import {
  RECEIVE_POST_DETAIL,
  IS_FETCHING_POST_DETAIL,
  CLEAR_POST_DETAIL,
  RECEIVE_REPLIES,
  RECEIVE_REPLIES_ERRORS,
  CLEAR_REPLIES,
  RECEIVE_POST_DETAIL_ERRORS,
  IS_FETCHING_REPLIES,
} from "../actions/postDetailActions";

const isParent = ({parent}, {id}) => parent === id;

const receivePostNewStatePost = (state, action) => {
  if (action.postContext === POST_CONTEXT.POST_DETAIL &&
      isParent(action.post, state)) {
    return Object.assign({}, state, {
      replies: [action.post.id, ...state.replies],
    });
  }
  return state;
};

const receivePostNewStateReplies = (state, action) => {
  if (action.postContext === POST_CONTEXT.POST_DETAIL) {

    let newState =  normalizeEntry(action.post, "id");
    const parentPost = state[action.post.parent];

    if (parentPost) {
      const newParentPost = Object.assign({}, parentPost, {
        replies: [action.post.id, ...parentPost.replies],
      });
      Object.assign(newState, normalizeEntry(newParentPost, "id"));
    }
    return Object.assign(
      {},
      state,
      newState
    );
  }
  return state;
};

// Post Detail -----------------
const post = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      return receivePostNewStatePost(state, action);
    case RECEIVE_POST_DETAIL:
      return action.post;
    case CLEAR_POST_DETAIL:
      return {};
    default:
      return state;
  }
};

const isFetching = (state=false, action) => {
  switch(action.type) {
    case RECEIVE_POST_DETAIL_ERRORS:
    case RECEIVE_POST_DETAIL:
      return false;
    case IS_FETCHING_POST_DETAIL:
      return true;
    default:
      return state;
  }
};

// Replies -----------------
const isFetchingReplies = (state=false, action) => {
  switch(action.type) {
    case RECEIVE_REPLIES_ERRORS:
    case RECEIVE_REPLIES:
      return false;
    case IS_FETCHING_REPLIES:
      return true;
    default:
      return state;
  }
};

const fetchingRepliesForId = (state=null, action) => {
  switch(action.type) {
    case RECEIVE_REPLIES_ERRORS:
    case RECEIVE_REPLIES:
      return null;
    case IS_FETCHING_REPLIES:
      return action.replies_to;
    default:
      return state;
  }
};

const byIds = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      return receivePostNewStateReplies(state, action);
    case RECEIVE_REPLIES:
      return Object.assign({}, state, normalizeArray(action.replies, "id"));
    case CLEAR_REPLIES:
      return {};
    default:
      return state;
  }
};

const replies = combineReducers({
  byIds,
  isFetchingReplies,
  fetchingRepliesForId,
});

export default combineReducers({
  post,
  isFetching,
  replies,
});
