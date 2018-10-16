import {getCSRFToken, getParamString} from "../apiUtils";

// Posts -----------------
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const IS_FETCHING_POSTS = "IS_FETCHING_POSTS";
export const CLEAR_POSTS = "CLEAR_POSTS";

export const receivePosts = posts => (
  {
    type: RECEIVE_POSTS,
    posts: posts,
  }
);

export const isFetchingPosts = () => (
  {
    type: IS_FETCHING_POSTS,
  }
);

export const clearPosts = () => (
  {
    type: CLEAR_POSTS,
  }
);

// Post -----------------
export const ADD_POST = "ADD_POST";
export const REMOVE_POST = "REMOVE_POST";

export const addPost = post => (
  {
    type: ADD_POST,
    post: post,
  }
);

export const removePost = postId => (
  {
    type: REMOVE_POST,
    postId: postId,
  }
);

// Post Form/Modal ----------------
export const CHANGE_POST_BODY = "CHANGE_POST_BODY";
export const CHANGE_POST_MODAL_BODY = "CHANGE_POST_MODAL_BODY";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CLOSE_POST_MODAL = "CLOSE_POST_MODAL";
export const OPEN_POST_MODAL = "OPEN_POST_MODAL";

export const changePostBody = body => (
  {
    type: CHANGE_POST_BODY,
    body: body
  }
);

export const changePostModalBody = body => (
  {
    type: CHANGE_POST_MODAL_BODY,
    body: body,
  }
);

export const createPostSuccess = () => (
  {
    type: CREATE_POST_SUCCESS,
  }
);

export const openPostModal = () => (
  {
    type: OPEN_POST_MODAL,
  }
);

export const closePostModal = () => (
  {
    type: CLOSE_POST_MODAL,
  }
);

// Errors -----------------
export const RECEIVE_POSTS_ERRORS = "RECEIVE_POSTS_ERRORS";
export const RECEIVE_POST_ERRORS = "RECEIVE_POST_ERRORS";
export const CLEAR_POST_ERRORS = "CLEAR_POST_ERRORS";

export const receivePostsErrors = errors => (
  {
    type: RECEIVE_POSTS_ERRORS,
    errors: errors,
  }
);

export const receivePostErrors = errors => (
  {
    type: RECEIVE_POST_ERRORS,
    errors: errors,
  }
);

export const clearPostErrors = () => (
  {
    type: CLEAR_POST_ERRORS,
  }
);


// AJAX ---------------
export const createPost = body => (
  dispatch => {
    return fetch("/api/posts/", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({body: body}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()
      }
    })
      .then(response => (
        response.ok ?
        response.json().then(json => dispatch(addPost(json)))
        .then(() => dispatch(createPostSuccess()))
        .then(() => dispatch(clearPostErrors()))
        :
        response.json().then(json => dispatch(receivePostErrors(json)))
      ));
  }
);

export const deletePost = postId => (
  dispatch => {
    return fetch(`/api/posts/${postId}/`, {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()
      }
    })
      .then(response => {
        if (response.ok) {
          dispatch(clearPostErrors());
          dispatch(removePost(postId));
        }
        else {
          return response.json().then(
            json => dispatch(receivePostErrors(json))
          );
        }
      });
  }
);


export const PROFILE_PAGE = "PROFILE_PAGE";
export const HOME_PAGE = "HOME_PAGE";
export const TAG_PAGE = "TAG_PAGE";

export const getProfilePageFetchParams = ({userSlug}) => (
  {
    USER_SLUG: userSlug,
    type: PROFILE_PAGE,
  }
);

export const getHomePageFetchParams = ({id}) => (
  {
    USER_ID: id,
    type: HOME_PAGE,
  }
);

export const getTagPageFetchParams = ({tagName}) => (
  {
    TAG_NAME: tagName,
    type: TAG_PAGE,
  }
);

export const isDifferentFetchParams = (oldParams, newParams) => {
  if (oldParams.type !== newParams.type) {
    return true;
  }
  switch(oldParams.type) {
    case HOME_PAGE:
      return oldParams.USER_ID !== newParams.USER_ID;
    case PROFILE_PAGE:
      return oldParams.USER_SLUG !== newParams.USER_SLUG;
    case TAG_PAGE:
      return oldParams.TAG_NAME !== newParams.TAG_NAME;
    default:
      return false;
  }
};

export const fetchPosts = (params={}) => (
  dispatch => {
    dispatch(isFetchingPosts());
    return fetch(`/api/posts/?${getParamString(params)}`)
      .then(response => {
        if (response.ok) {
          return response.json().then(json => dispatch(receivePosts(json)))
          .then(() => dispatch(clearPostErrors()));
        } else {
          return response.json().then(json => dispatch(receivePostsErrors(json)));
        }
      }
    );
  }
);
