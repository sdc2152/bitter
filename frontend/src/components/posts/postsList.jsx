import React from "react";
import {connect} from "react-redux";

import {getPosts} from "../../reducers/selectors";
import {fetchPosts} from "../../actions/postsActions";

import PostListItem from "./postListItem";

class PostList extends React.Component {
  componentWillMount() {
    const {fetchPosts, params} = this.props;
    fetchPosts(params);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.params !== this.props.params) {
      this.props.fetchPosts(newProps.params);
    }
  }

  render() {
    const {posts} = this.props;
    const postsList = posts.map(
      post => <PostListItem key={post.id} post={post} />
      );
    return (
      <div className="post-list">
        <ul className="list-group list-group-flush">
          {postsList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: getPosts(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPosts: params => dispatch(fetchPosts(params))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
