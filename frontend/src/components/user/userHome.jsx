import React from "react";
import {connect} from "react-redux";

import {getCurrentUser} from "../../reducers/selectors";
import {
  getHomePageFetchParams,
  POST_CONTEXT,
} from "../../actions/postsActions";

import PostList from "../posts/postsList";
import PostForm from "../posts/postForm";
import UserInfoHome from "./userInfoHome";

const UserHome = ({currentUser}) => {
  return (
    <div className="app-container mx-auto">
      <div className="d-flex p-2 justify-content-start">
        <div className="mr-2">
          <UserInfoHome user={currentUser} />
        </div>

        <div className="ml-2 bg-white center-display rounded-bottom">
          <PostForm postContext={POST_CONTEXT.HOME_PAGE}/>
          <PostList params={getHomePageFetchParams(currentUser)}/>
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

export default connect(mapStateToProps)(UserHome);
