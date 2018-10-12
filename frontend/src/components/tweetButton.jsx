import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";

import {
  changePostModalBody,
  createPost,
  openPostModal,
  closePostModal,
} from "../actions/postsActions";

import {
  getIsPostModalOpen,
  getPostModalBody,
  isLoggedIn,
} from "../reducers/selectors";

const customStyles = {
  content : {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
  },
};

const TweetButton = ({
  body,
  isLoggedIn,
  isOpen,
  changePostModalBody,
  createPost,
  closePostModal,
  openPostModal,
}) => {
  return isLoggedIn ?
  (
    <div>
      <button className="btn btn-primary"
        onClick={openPostModal}>
        Tweet
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closePostModal}
        style={customStyles}
        contentLabel="Tweet"
      >

        <h2>Compose New Tweet</h2>
        <form onSubmit={e => {e.preventDefault(); return createPost(body);}}>
          <div className="form-group">
            <textarea className="form-control"
              value={body}
              onChange={e => changePostModalBody(e.target.value)}
              rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Tweet</button>
        </form>
      </Modal>
    </div>
  )
  :
  null;
};

const mapStateToProps = state => (
  {
    isOpen: getIsPostModalOpen(state),
    body: getPostModalBody(state),
    isLoggedIn: isLoggedIn(state),
  }
);

const mapDispatchToProsp = dispatch => (
  {
    createPost: body => dispatch(createPost(body)),
    changePostModalBody: body => dispatch(changePostModalBody(body)),
    openPostModal: () => dispatch(openPostModal()),
    closePostModal: () => dispatch(closePostModal()),
  }
);

export default connect(mapStateToProps, mapDispatchToProsp)(TweetButton);
