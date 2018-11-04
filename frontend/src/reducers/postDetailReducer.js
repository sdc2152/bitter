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


// Post Detail -----------------
const post = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST_DETAIL:
      return action.post;
    case CLEAR_POST_DETAIL:
      return {};
    default:
      return state;
  }
};

const isFetching = (state=false, action) => {
  Object.freeze(state);
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

//const replyIds = (state=[], action) => {
  //Object.freeze(state);
  //switch(action.type) {
    //case RECEIVE_POST:
      //if (action.postContext === POST_CONTEXT.POST_DETAIL) {
        //return [action.post.id, ...state];
      //}
      //return state;
    //case RECEIVE_REPLIES:
      //return action.replies.map(reply => reply.id);
    //case CLEAR_REPLIES:
      //return [];
    //default:
      //return state;
  //}
//};

const byIds = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_POST:
      if (action.postContext === POST_CONTEXT.POST_DETAIL) {
        return Object.assign({}, state, normalizeEntry(action.post, "id"));
      }
      return state;
    case RECEIVE_REPLIES: {
      return normalizeArray(action.replies, "id");
    }
    case CLEAR_REPLIES:
      return {};
    default:
      return state;
  }
};

const replies = combineReducers({
  byIds,
  //replyIds,
  isFetchingReplies,
});

export default combineReducers({
  post,
  isFetching,
  replies,
});
