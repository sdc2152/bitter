import React from "react";
import {connect} from "react-redux";

import {fetchUserFromSlug} from "../../actions/userActions";
import {getProfilePageFetchParams} from "../../actions/postsActions";
import {
  isDisplayUserFound,
  isFetchingDisplayUser,
  isUserNotFound,
  getDisplayUser,
} from "../../reducers/selectors";

import UserNotFound from "./userNotFound";
import UserInfoProfile from "./userInfoProfile";
import PostList from "../posts/postsList";
import Loading from "../loading";

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
      match,
    } = this.props;
    const {params} = match;
    return (
      isFetchingDisplayUser ?
      <Loading />
      :
      isDisplayUserFound ?
      (
        <div>
          <div className="profile-header">
            <div className="profile-header-top bg-primary">

              <div className="app-container h-100 position-relative mx-auto">
                <div className="profile-header-pic">
                  <div className="profile-pic bg-white rounded-circle">
                  </div>
                </div>
              </div>

            </div>

              <div className="profile-header-bottom bg-white">
                <div className="nav app-container mx-auto">
                  <div className="user-info-width"></div>
                  <div className="nav-link ml-2">
                    Tweets
                  </div>
                </div>
            </div>
          </div>

          <div className="app-container mx-auto">
            <div className="d-flex p-2 justify-content-start">
              <div className="mr-2">
                <UserInfoProfile user={displayUser} />
              </div>

              <div className="ml-2 bg-white center-display rounded-bottom">
                <PostList params={getProfilePageFetchParams(params)}
                />
              </div>
            </div>
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
