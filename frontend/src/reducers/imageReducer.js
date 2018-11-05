import {combineReducers} from "redux";

import {
  RECEIVE_IMAGE_ERRORS,
  CLEAR_IMAGE_ERRORS,
  OPEN_IMAGE_MODAL,
  CLOSE_IMAGE_MODAL,
  CHANGE_IMAGE_MODAL_FILE,
  CREATE_IMAGE_SUCCESS,
} from "../actions/imageActions";

const errors = (state={}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_IMAGE_ERRORS:
      return Object.assign({}, state, action.errors);
    case CLEAR_IMAGE_ERRORS:
      return {};
    default:
      return state;
  }
};

const defaultPostModal = {
  isOpen: false,
  file: null,
};

const formModal = (state=defaultPostModal, action) => {
  Object.freeze(state);
  switch(action.type) {
    case OPEN_IMAGE_MODAL:
      return Object.assign({}, state, {isOpen: true});
    case CLOSE_IMAGE_MODAL:
      return defaultPostModal;
    case CHANGE_IMAGE_MODAL_FILE:
      return Object.assign({}, state, {file: action.file});
    case CREATE_IMAGE_SUCCESS:
      return Object.assign({}, state, {title: "", isOpen: false});
    default:
      return state;
  }
};

export default combineReducers({
  errors,
  formModal,
});
