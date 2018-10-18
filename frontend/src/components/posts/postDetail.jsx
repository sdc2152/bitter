import React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";

import PostForm from "./postForm";
import PostReplyList from "./postReplyList";
import PostDetailView from "./postDetailView";

import {
  fetchPostDetail,
  fetchReplies,
  clearReplies,
  clearPostDetail,
  getRepliesFetchParams,
} from "../../actions/postDetailActions";

import {POST_CONTEXT} from "../../actions/postsActions";

import {
  isPostDetailFound,
  getIsFetchingReplies,
  getReplies,
  getPostDetail
} from "../../reducers/selectors";

const customStyles = {
  content : {
    position: "absolute",
    width: "642px",
    borderRadius: "10px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    position: "fixed",
    overflowY: "scroll",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 9999,
  },
};

class PostDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    document.body.style.overflow = "hidden";
    const {postId, fetchReplies, fetchPostDetail} = this.props;
    fetchPostDetail(postId);
    fetchReplies(postId);
  }

  closeModal() {
    const {clearPostDetail, clearReplies} = this.props;
    this.setState({modalIsOpen: false});
    document.body.style.overflow = "auto";
    clearPostDetail();
    clearReplies();
  }

  render() {
    const {
      children,
      isPostDetailFound,
      isFetchingReplies,
      postDetail,
      replies,
    } = this.props;
    return (
      <div>
        <div className="post-detail-button" onClick={this.openModal}>
          {children}
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Post Detail"
        >
          <PostDetailView postDetail={postDetail}
            isPostDetailFound={isPostDetailFound}/>

          <PostForm
            replyTo={postDetail.id}
            postContext={POST_CONTEXT.POST_DETAIL}
          />

          <PostReplyList replies={replies} />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isPostDetailFound: isPostDetailFound(state),
  isFetchingReplies: getIsFetchingReplies(state),
  postDetail: getPostDetail(state),
  replies: getReplies(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPostDetail: postId => dispatch(fetchPostDetail(postId)),
  fetchReplies: postId => dispatch(
    fetchReplies(getRepliesFetchParams(postId))
  ),
  clearReplies: () => dispatch(clearReplies()),
  clearPostDetail: () => dispatch(clearPostDetail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
