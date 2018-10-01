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
