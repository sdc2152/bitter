import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";

import {
  getCreatePostData,
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

class TweetButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    const {changePostModalBody} = this.props;
    changePostModalBody(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {body, createPost, replyTo, postContext} = this.props;
    e.preventDefault();
    createPost(getCreatePostData(body, replyTo), postContext);
  }

  render() {
    const {
      body,
      isLoggedIn,
      isOpen,
      closePostModal,
      openPostModal,
    } = this.props;

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
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <textarea className="form-control"
                value={body}
                onChange={this.handleChange}
                rows="3"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Tweet</button>
          </form>
        </Modal>
      </div>
    )
    :
    null;
  }
}

const mapStateToProps = state => (
  {
    isOpen: getIsPostModalOpen(state),
    body: getPostModalBody(state),
    isLoggedIn: isLoggedIn(state),
  }
);

const mapDispatchToProsp = dispatch => (
  {
    createPost: (data, postContext) => dispatch(createPost(data, postContext)),
    changePostModalBody: body => dispatch(changePostModalBody(body)),
    openPostModal: () => dispatch(openPostModal()),
    closePostModal: () => dispatch(closePostModal()),
  }
);

export default connect(mapStateToProps, mapDispatchToProsp)(TweetButton);
