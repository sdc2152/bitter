import React from "react";
import {connect} from "react-redux";

import {getIsFetchingPosts, getPosts} from "../../reducers/selectors";
import {fetchPosts, isDifferentFetchParams} from "../../actions/postsActions";

import PostListItem from "./postListItem";
import Loading from "../loading";

// TODO: get more uniform way to determine fetch
class PostList extends React.Component {
  componentWillMount() {
    const {fetchPosts, params} = this.props;
    fetchPosts(params);
  }

  componentWillReceiveProps(newProps) {
    const {params: oldParams} = this.props;
    const {params: newParams} = newProps;
    if (isDifferentFetchParams(oldParams, newParams)) {
      this.props.fetchPosts(newParams);
    }
  }

  render() {
    const {posts, isFetchingPosts, postContext} = this.props;
    const postsList = posts.map(post => (
        <PostListItem postContext={postContext} key={post.id} post={post} />
    ));
    return isFetchingPosts ?
      <Loading />
      :
      (
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
    isFetchingPosts: getIsFetchingPosts(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPosts: params => dispatch(fetchPosts(params))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
