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

// Flatten and nest data for field representation and sending
export const getProfileDataFromUser = ({profile}) => (
  (({slug, description}) => ({slug, description}))(profile)
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

const formDataToUser = ({
  username,
  email,
  first_name,
  last_name,
  slug,
  description,
}) => (
  {
    username,
    email,
    first_name,
    last_name,
    profile: {
      slug,
      description,
    }
  }
);


export const updateUser = (data, id) => (
  dispatch => {
    return fetch(`/api/users/${id}/`, {
      method: "PATCH",
      credentials: "same-origin",
      body: JSON.stringify(formDataToUser(data)),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
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
  }
);
