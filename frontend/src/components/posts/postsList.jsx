import React from "react";
import {connect} from "react-redux";
import {getPosts} from "../../reducers/selectors";

import PostListItem from "./postListItem";

class PostList extends React.Component {
  componentWillMount() {
    const {fetchPosts} = this.props;
    fetchPosts();
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

export default connect(mapStateToProps)(PostList);
