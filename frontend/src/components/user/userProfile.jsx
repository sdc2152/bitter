import React from "react";
import {connect} from "react-redux";

import {fetchUserFromSlug} from "../../actions/userActions";
import {
  isDisplayUserFound,
  isFetchingDisplayUser,
  isUserNotFound,
  getDisplayUser,
} from "../../reducers/selectors";

import UserNotFound from "./userNotFound";
import UserLoading from "./userLoading";
import PostForm from "../posts/postForm";
import PostList from "../posts/postsList";

class UserProfile extends React.Component {
  componentWillMount() {
    const {userSlug} = this.props.match.params;
    this.props.fetchUserFromSlug(userSlug);
  }

  render() {
    const {
      isDisplayUserFound,
      isFetchingDisplayUser,
      isUserNotFound,
      displayUser
    } = this.props;
    const {username, first_name, last_name, email, profile} = displayUser;
    return (
      isFetchingDisplayUser ?
      <UserLoading />
      :
      isDisplayUserFound ?
      (
        <div>
          {username}
          @{profile.slug}
          {profile.description}
          {first_name}
          {last_name}
          {email}
          <PostForm />
          <PostList />
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
