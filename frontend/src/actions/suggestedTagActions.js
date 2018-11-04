export const IS_FETCHING_SUGGESTED_TAGS = "IS_FETCHING_SUGGESTED_TAGS";
export const RECEIVE_SUGGESTED_TAGS = "RECEIVE_SUGGESTED_TAGS";
export const RECEIVE_SUGGESTED_TAGS_ERRORS = "RECEIVE_SUGGESTED_TAGS_ERRORS";
export const CLEAR_SUGGESTED_TAGS_ERRORS = "CLEAR_SUGGESTED_TAGS_ERRORS";

export const isFetchingSuggestedTags = () => (
  {
    type: IS_FETCHING_SUGGESTED_TAGS,
  }
);

export const receiveSuggestedTags = tags => (
  {
    type: RECEIVE_SUGGESTED_TAGS,
    tags: tags,
  }
);

export const receiveSuggestedTagsErrors = errors => (
  {
    type: RECEIVE_SUGGESTED_TAGS_ERRORS,
    errors: errors,
  }
);

export const clearSuggestedTagsErrors = () => (
  {
    type: CLEAR_SUGGESTED_TAGS_ERRORS,
  }
);

export const fetchSuggestedTags = () => (
  dispatch => {
    dispatch(isFetchingSuggestedTags());
    return fetch("/api/tags/")
      .then(response => {
        if (response.ok) {
          return response.json()
            .then(json => dispatch(receiveSuggestedTags(json)))
            .then(() => clearSuggestedTagsErrors());
        }
        else {
          return response.json()
            .then(json => dispatch(receiveSuggestedTagsErrors(json)));
        }
      }
    );
  }
);
