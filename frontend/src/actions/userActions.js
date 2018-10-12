import {getCSRFToken} from "../apiUtils";
import {receiveUser} from "./authActions";

export const RECEIVE_DISPLAY_USER = "RECEIVE_DISPLAY_USER";
export const RECEIVE_DISPLAY_USER_ERRORS = "RECEIVE_DISPLAY_USER_ERRORS";
export const IS_FETCHING_DISPLAY_USER = "IS_FETCHING_DISPLAY_USER";

export const receiveDisplayUser = user => (
  {
    type: RECEIVE_DISPLAY_USER,
    user: user
  }
);

export const receiveDisplayUserErrors = errors => (
  {
    type: RECEIVE_DISPLAY_USER_ERRORS,
    errors: errors,
  }
);

export const isFetchingDisplayUser = () => (
  {
    type: IS_FETCHING_DISPLAY_USER,
  }
);

export const fetchUserFromSlug = slug => (
  dispatch => {
    dispatch(isFetchingDisplayUser());
    return fetch(`/api/users/@${slug}/`)
      .then(response => (
        response.ok ?
        response.json().then(json => dispatch(receiveDisplayUser(json)))
        :
        response.json().then(json => dispatch(receiveDisplayUserErrors(json)))
      ));
  }
);

export const createFollow = id => (
  dispatch => {
    return fetch("/api/follows/", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({id: id}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()
      }
    })
      .then(response => (
        response.ok ?
        response.json().then(json => dispatch(receiveUser(json)))
        :
        response.json().then(json => console.log(json))
      ));
  }
);

export const deleteFollow = id => (
  dispatch => {
    return fetch("/api/follows/", {
      method: "DELETE",
      credentials: "same-origin",
      body: JSON.stringify({id: id}),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()
      }
    })
      .then(response => (
        response.ok ?
        response.json().then(json => dispatch(receiveUser(json)))
        :
        response.json().then(json => console.log(json))
      ));
  }
);
