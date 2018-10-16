import React from "react";
import {connect} from "react-redux";

import {fetchUserFromSlug} from "../../actions/userActions";
import {
  fetchPosts,
  getProfilePageFetchParams
} from "../../actions/postsActions";
import {
  isDisplayUserFound,
  isFetchingDisplayUser,
  isUserNotFound,
  getDisplayUser,
} from "../../reducers/selectors";

import UserNotFound from "./userNotFound";
import UserLoading from "./userLoading";
import UserInfoProfile from "./userInfoProfile";
import PostList from "../posts/postsList";

class UserProfile extends React.Component {
  componentWillMount() {
    const {userSlug} = this.props.match.params;
    this.props.fetchUserFromSlug(userSlug);
  }

  componentWillReceiveProps(newProps) {
    const {userSlug} = newProps.match.params;
    if (userSlug !== this.props.match.params.userSlug) {
      newProps.fetchUserFromSlug(userSlug);
    }
  }

  render() {
    const {
      isDisplayUserFound,
      isFetchingDisplayUser,
      isUserNotFound,
      displayUser,
    } = this.props;
    return (
      isFetchingDisplayUser ?
      <UserLoading />
      :
      isDisplayUserFound ?
      (
        <div className="d-flex p-2 justify-content-start">
          <div className="mr-2">
            <UserInfoProfile user={displayUser} />
          </div>

          <div className="ml-2 bg-white center-display rounded-bottom">
            <PostList params={getProfilePageFetchParams(displayUser)}/>
          </div>

        </div>
      )
      :
      isUserNotFound ?
      <UserNotFound />
      :
      null
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    fetchUserFromSlug: slug => dispatch(fetchUserFromSlug(slug)),
  }
);

const mapStateToProps = state => (
  {
    isDisplayUserFound: isDisplayUserFound(state),
    isFetchingDisplayUser: isFetchingDisplayUser(state),
    isUserNotFound: isUserNotFound(state),
    displayUser: getDisplayUser(state),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
