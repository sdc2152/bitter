import React from "react";
import {connect} from "react-redux";

import {getCurrentUser} from "../../reducers/selectors";
import {fetchPosts, getHomePageFetchParams} from "../../actions/postsActions";

import PostList from "../posts/postsList";
import PostForm from "../posts/postForm";
import UserInfoHome from "./userInfoHome";

const UserHome = ({currentUser, fetchPosts}) => {
  return (
    <div>
      <div className="d-flex p-2 justify-content-start">
        <div className="mr-2">
          <UserInfoHome user={currentUser} />
        </div>

        <div className="ml-2 bg-white center-display rounded-bottom">
          <PostForm />
          <PostList fetchPosts={fetchPosts(currentUser)}/>
        </div>

      </div>
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
