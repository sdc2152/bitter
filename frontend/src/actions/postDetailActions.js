import {getParamString} from "../apiUtils";

// Post Detail --------------
export const RECEIVE_POST_DETAIL = "RECEIVE_POST_DETAIL";
export const IS_FETCHING_POST_DETAIL = "IS_FETCHING_POST_DETAIL";
export const CLEAR_POST_DETAIL = "CLEAR_POST_DETAIL";

export const receivePostDetail = post => (
  {
    type: RECEIVE_POST_DETAIL,
    post: post,
  }
);

export const isFetchingPostDetail = () => (
  {
    type: IS_FETCHING_POST_DETAIL,
  }
);

export const clearPostDetail = () => (
  {
    type: CLEAR_POST_DETAIL,
  }
);


// Replies ------------------
export const RECEIVE_REPLIES = "RECEIVE_REPLIES";
export const IS_FETCHING_REPLIES = "IS_FETCHING_REPLIES";
export const CLEAR_REPLIES = "CLEAR_REPLIES";

export const receiveReplies = replies => (
  {
    type: RECEIVE_REPLIES,
    replies: replies,
  }
);

export const isFetchingReplies = ({REPLIES_TO}) => (
  {
    type: IS_FETCHING_REPLIES,
    replies_to: REPLIES_TO,
  }
);

export const clearReplies = () => (
  {
    type: CLEAR_REPLIES,
  }
);

// Errors -------------------
export const RECEIVE_POST_DETAIL_ERRORS = "RECEIVE_POST_DETAIL_ERRORS";
export const RECEIVE_REPLIES_ERRORS = "RECEIVE_REPLIES_ERRORS";
export const CLEAR_POST_DETAIL_ERRORS = "CLEAR_POST_DETAIL_ERRORS";
export const CLEAR_REPLIES_ERRORS = "CLEAR_REPLIES_ERRORS";

export const receivePostDetailErrors = errors => (
  {
    type: RECEIVE_POST_DETAIL_ERRORS,
    errors: errors,
  }
);

export const clearPostDetailErrors = () => (
  {
    type: CLEAR_POST_DETAIL_ERRORS,
  }
);

export const receiveRepliesErrors = errors => (
  {
    type: RECEIVE_REPLIES_ERRORS,
    errors: errors,
  }
);

export const clearRepliesErrors = () => (
  {
    type: CLEAR_REPLIES_ERRORS,
  }
);


// AJAX -------------------

export const fetchPostDetail = postId => (
  dispatch => {
    dispatch(isFetchingPostDetail());
    return fetch(`/api/posts/${postId}/`)
      .then(response => {
        if (response.ok) {
          return response.json()
            .then(json => dispatch(receivePostDetail(json)))
            .then(() => dispatch(clearPostDetailErrors()));
        } else {
          return response.json()
            .then(json => dispatch(receivePostDetailErrors(json))
          );
        }
      }
    );
  }
);

export const POST_DETAIL_PAGE = "POST_DETAIL_PAGE";

export const getRepliesFetchParams = postId => (
  {
    REPLIES_TO: postId,
    type: POST_DETAIL_PAGE,
  }
);

export const fetchReplies = (params={}) => (
  dispatch => {
    dispatch(isFetchingReplies(params));
    return fetch(`/api/posts/?${getParamString(params)}`)
      .then(response => {
        if (response.ok) {
          return response.json()
            .then(json => dispatch(receiveReplies(json)))
            .then(() => dispatch(clearRepliesErrors()));
        } else {
          return response.json()
            .then(json => dispatch(receiveRepliesErrors(json))
          );
        }
      }
    );
  }
);
