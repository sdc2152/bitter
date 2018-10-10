import React from "react";
import {connect} from "react-redux";

import {createFollow, deleteFollow} from "../../actions/userActions";
import {
  getCurrentUserFollows,
  getCurrentUserId
} from "../../reducers/selectors";

const FollowButton = ({
  userId,
  currentUserFollows,
  currentUserId,
  createFollow,
  deleteFollow
}) => {
  return currentUserId === userId ?
    null
  :
  currentUserFollows.includes(userId) ?
    (
      <button onClick={() => deleteFollow(userId)}>unfollow</button>
    )
  :
    (
      <button onClick={() => createFollow(userId)}>follow</button>
    );
};

const mapStateToProps = state => (
  {
    currentUserFollows: getCurrentUserFollows(state),
    currentUserId: getCurrentUserId(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    createFollow: id => dispatch(createFollow(id)),
    deleteFollow: id => dispatch(deleteFollow(id)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
