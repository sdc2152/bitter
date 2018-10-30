import React from "react";
import {connect} from "react-redux";

import {createFollow, deleteFollow} from "../../actions/displayUserActions";
import {
  isLoggedIn,
  getCurrentUserFollows,
  getCurrentUserId,
} from "../../reducers/selectors";

const FollowButton = ({
  userId,
  isLoggedIn,
  currentUserFollows,
  currentUserId,
  createFollow,
  deleteFollow,
}) => {
  return currentUserId === userId || !isLoggedIn?
  null
  :
  currentUserFollows.includes(userId) ?
  (
    <button className="btn btn-primary"
      onClick={() => deleteFollow(userId)}
    >
      unfollow
    </button>
  )
  :
  (
    <button className="btn btn-outline-primary"
      onClick={() => createFollow(userId)}
    >
      follow
    </button>
  );
};

const mapStateToProps = state => (
  {
    isLoggedIn: isLoggedIn(state),
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
