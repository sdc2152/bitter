import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";

import {
  getCreatePostData,
  changePostModalBody,
  createPost,
} from "../../actions/postsActions";

import {
  getPostModalBody,
  isLoggedIn,
} from "../../reducers/selectors";

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

class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
    this.state = {
      isOpen: false,
    };
    // TODO: state for each modal so all dont open or all dont
    // TODO: post modal is opening when clicking on post form
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
    this.setState({isOpen: false});
  }

  handleOpen(e) {
    e.stopPropagation();
    this.setState({isOpen: true});
  }

  handleClose(e) {
    e.stopPropagation();
    this.setState({isOpen: false});
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const {
      body,
      isLoggedIn,
      children,
    } = this.props;

    return isLoggedIn ?
    (
      <div onClick={this.stopPropagation}>
        <div onClick={this.handleOpen}>
          {children}
        </div>
        <Modal
          isOpen={this.state.isOpen}
          onRequestClose={this.handleClose}
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
            <button type="submit" className="btn btn-primary">
              Tweet
            </button>
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
    body: getPostModalBody(state),
    isLoggedIn: isLoggedIn(state),
  }
);

const mapDispatchToProsp = dispatch => (
  {
    createPost: (data, postContext) => dispatch(createPost(data, postContext)),
    changePostModalBody: body => dispatch(changePostModalBody(body)),
  }
);

export default connect(mapStateToProps, mapDispatchToProsp)(PostModal);
