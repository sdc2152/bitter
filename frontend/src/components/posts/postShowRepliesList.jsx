import React from "react";
import {connect} from "react-redux";

import {
  fetchReplies,
  getRepliesFetchParams,
} from "../../actions/postDetailActions";

import {getRepliesByPost} from "../../reducers/selectors";

import PostReplyList from "./postReplyList";

class PostShowRepliesList extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenClick = this.handleOpenClick.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  handleOpenClick(e) {
    const {fetchReplies, post} = this.props;
    e.preventDefault();
    fetchReplies(post.id);
    this.setState({isOpen: true});
  }

  handleCloseClick(e) {
    e.preventDefault();
    this.setState({isOpen: false});
  }

  render() {
    const {post, replies} = this.props;
    return post.replies.length > 0 ?
    (
      this.state.isOpen ?
      <div>
        <button className="btn bg-transparent btn-block"
          onClick={this.handleCloseClick}
        >
          Hide Replies
        </button>
        <PostReplyList replies={replies} />
        <br/>
      </div>
      :
      <button className="btn bg-transparent btn-block"
        onClick={this.handleOpenClick}
      >
        Show Replies
      </button>
    )
    :
    null;
  }
}

const mapStateToProps = (state, {post}) => (
  {
    replies: getRepliesByPost(state, post),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchReplies: postId => dispatch(
      fetchReplies(getRepliesFetchParams(postId))
    ),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostShowRepliesList);
