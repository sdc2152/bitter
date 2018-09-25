import {getCSRFToken} from "../api_utils";

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = (user) => (
  {
    type: RECEIVE_USER,
    user: user
  }
);

export const signUpUser = (username, password) => (
  (dispatch) => {
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
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)));
  }
);

export const loginUser = (username, password) => (
  (dispatch) => {
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
      .then(response => response.json())
      .then(json => dispatch(receiveUser(json)));
  }
);

export const logoutUser = () => (
  (dispatch) => {
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
