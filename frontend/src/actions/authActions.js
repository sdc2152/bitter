import {getCSRFToken} from "../apiUtils";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const RECEIVE_LOGOUT = "RECEIVE_LOGOUT";

export const receiveUser = user => (
  {
    type: RECEIVE_USER,
    user: user,
  }
);

export const receiveErrors = errors => (
  {
    type: RECEIVE_ERRORS,
    errors: errors,
  }
);

export const clearErrors = () => (
  {
    type: CLEAR_ERRORS,
  }
);

export const receiveLogout = () => (
  {
    type: RECEIVE_LOGOUT,
  }
);

export const getLoginStatus = () => (
  dispatch => (
    fetch("api/login_status/")
    .then(response => response.json())
    .then(json => dispatch(receiveUser(json)))
  )
);

export const signUpUser = (username, password) => (
  dispatch => {
    return fetch("/api/users/", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({username: username, password: password}),
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
        response.json().then(json => dispatch(receiveErrors(json)))
      ));
  }
);

export const loginUser = (username, password) => (
  dispatch => {
    return fetch("/api/login/", {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify({username: username, password: password}),
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
        response.json().then(json => dispatch(receiveErrors(json)))
      ));
  }
);

export const logoutUser = () => (
  dispatch => {
    return fetch("/api/logout/", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken()
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)));
  }
);
