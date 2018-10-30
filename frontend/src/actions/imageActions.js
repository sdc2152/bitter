import {getCSRFToken} from "../apiUtils";

export const RECEIVE_IMAGE_ERRORS = "RECEIVE_IMAGE_ERRORS";
export const CLEAR_IMAGE_ERRORS = "CLEAR_IMAGE_ERRORS";

export const receiveImageErrors = errors => (
  {
    type: RECEIVE_IMAGE_ERRORS,
    errors: errors,
  }
);

export const clearImageErrors = () => (
  {
    type: CLEAR_IMAGE_ERRORS,
  }
);

export const OPEN_IMAGE_MODAL = "OPEN_IMAGE_MODAL";
export const CLOSE_IMAGE_MODAL = "CLOSE_IMAGE_MODAL";
export const CHANGE_IMAGE_MODAL_FILE = "CHANGE_IMAGE_MODAL_FILE";
export const CREATE_IMAGE_SUCCESS = "CREATE_IMAGE_SUCCESS";

export const openImageModal = () => (
  {
    type: OPEN_IMAGE_MODAL,
  }
);

export const closeImageModal = () => (
  {
    type: CLOSE_IMAGE_MODAL,
  }
);

export const changeImageModalFile = file => (
  {
    type: CHANGE_IMAGE_MODAL_FILE,
    file: file,
  }
);

export const createImageSuccess = () => (
  {
    type: CREATE_IMAGE_SUCCESS,
  }
);

export const createImage = file => (
  dispatch => {

    let data = new FormData();
    data.append("image", file);

    return fetch("/api/image/", {
      method: "POST",
      credentials: "same-origin",
      body: data,
      headers: {
        "X-CSRFToken": getCSRFToken(),
      }
    })
      .then(response => (
        response.ok ?
        response.json()
        .then(() => dispatch(createImageSuccess()))
        .then(() => dispatch(clearImageErrors()))
        :
        response.json().then(json => dispatch(receiveImageErrors(json)))
      ));
  }
);
