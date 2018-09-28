export const RECEIVE_DISPLAY_USER = "RECEIVE_DISPLAY_USER";

export const receiveDisplayUser = user => (
  {
    type: RECEIVE_DISPLAY_USER,
    user: user
  }
);

export const fetchUserFromSlug = slug => (
  dispatch => (
    fetch(`/api/users/${slug}/`)
      .then(response => (
        response.ok ?
        response.json().then(json => dispatch(receiveDisplayUser(json)))
        :
        response.json().then(json => dispatch(receiveErrors(json)))
      ))
  )
);
