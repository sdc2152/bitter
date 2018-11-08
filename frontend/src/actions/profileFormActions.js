import {getCSRFToken} from "../apiUtils";
import {receiveUser} from "./authActions";

export const SET_INITIAL_PROFILE_FORM = "SET_INITIAL_PROFILE_FORM";
export const CHANGE_PROFILE_FIELD = "CHANGE_PROFILE_FIELD";

export const setInitialProfileForm = currentUser => (
  {
    currentUser: currentUser,
    type: SET_INITIAL_PROFILE_FORM,
  }
);

export const changeProfileField = data => (
  {
    type: CHANGE_PROFILE_FIELD,
    data: data,
  }
);

export const RECEIVE_PROFILE_FORM_ERRORS = "RECEIVE_PROFILE_FORM_ERRORS";
export const CLEAR_PROFILE_FORM_ERRORS = "CLEAR_PROFILE_FORM_ERRORS";

export const receiveProfileFormErrors = errors => (
  {
    type: RECEIVE_PROFILE_FORM_ERRORS,
    errors: errors,
  }
);

export const clearProfileFormErrors = () => (
  {
    type: CLEAR_PROFILE_FORM_ERRORS,
  }
);

// Updating
export const IS_UPDATING_PROFILE = "IS_UPDATING_PROFILE";

export const isUpdatingProfile = () => (
  {
    type: IS_UPDATING_PROFILE,
  }
);

// Flatten and nest data for field representation and sending
export const getProfileDataFromUser = ({profile}) => (
  (({slug, description}) => (
    {
      slug,
      description,
    }
  ))(profile)
);
export const getUserDataFromUser = ({
  username,
  email,
  first_name,
  last_name,
}) => (
  {
    username,
    email,
    first_name,
    last_name,
  }
);

const formDataFromFields = fields => {
  let data = new FormData();
  for (const field in fields) {
    data.append(field, fields[field]);
  }
  return data;
};

export const updateUser = (fields, id) => {
  return dispatch => {
    dispatch(isUpdatingProfile());
    return fetch(`/api/users/${id}/`, {
      method: "PATCH",
      credentials: "same-origin",
      body: formDataFromFields(fields),
      headers: {
        "X-CSRFToken": getCSRFToken()
      }
    })
      .then(response => (
        response.ok ?
        response.json().then(json => dispatch(receiveUser(json)))
        .then(() => dispatch(clearProfileFormErrors()))
        :
        response.json().then(json => dispatch(receiveProfileFormErrors(json)))
      ));
  };
};
