export const IS_FETCHING_SUGGESTED_FOLLOWS = "IS_FETCHING_SUGGESTED_FOLLOWS";
export const RECEIVE_SUGGESTED_FOLLOWS = "RECEIVE_SUGGESTED_FOLLOWS";
export const RECEIVE_SUGGESTED_FOLLOWS_ERRORS = "RECEIVE_SUGGESTED_FOLLOWS_ERRORS";
export const CLEAR_SUGGESTED_FOLLOWS_ERRORS = "CLEAR_SUGGESTED_FOLLOWS_ERRORS";

export const isFetchingSuggestedFollows = () => (
  {
    type: IS_FETCHING_SUGGESTED_FOLLOWS,
  }
);

export const receiveSuggestedFollows = users => (
  {
    type: RECEIVE_SUGGESTED_FOLLOWS,
    users: users,
  }
);

export const receiveSuggestedFollowsErrors = errors => (
  {
    type: RECEIVE_SUGGESTED_FOLLOWS_ERRORS,
    errors: errors,
  }
);

export const clearSuggestedFollowsErrors = () => (
  {
    type: CLEAR_SUGGESTED_FOLLOWS_ERRORS,
  }
);

export const fetchSuggestedFollows = () => (
  dispatch => {
    dispatch(isFetchingSuggestedFollows());
    return fetch("/api/users/")
      .then(response => {
        if (response.ok) {
          return response.json()
            .then(json => dispatch(receiveSuggestedFollows(json)))
            .then(() => dispatch(clearSuggestedFollowsErrors()));
        } else {
          return response.json().then(
            json => dispatch(receiveSuggestedFollowsErrors(json))
          );
        }
      }
    );
  }
);
