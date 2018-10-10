import React from "react";
import {connect} from "react-redux";

import {getCurrentUser} from "../../reducers/selectors";
import {fetchPosts, getHomePageFetchParams} from "../../actions/postsActions";

import PostList from "../posts/postsList";
import PostForm from "../posts/postForm";

const UserHome = ({currentUser, fetchPosts}) => {
  return (
    <div>
      user home
      <PostForm />
      <PostList fetchPosts={fetchPosts(currentUser)}/>
    </div>
  );
};

const mapStateToProps = state => (
  {
    currentUser: getCurrentUser(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPosts: user => () => dispatch(
      fetchPosts(getHomePageFetchParams(user))
    ),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
