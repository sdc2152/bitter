import React from "react";
import {connect} from "react-redux";

import {getCurrentUserId, isLoggedIn} from "../../reducers/selectors";
import {deletePost} from "../../actions/postsActions";

const PostDropDown = ({post, currentUserId, deletePost, isLoggedIn}) => {
  const dropDownMenu = currentUserId === post.user.id ?
  (
    <button className="dropdown-item" onClick={() => deletePost(post.id)}>
      Delete
    </button>
  )
  :
  (
    <button className="dropdown-item">
      not implemented
    </button>
  );
  return isLoggedIn ?
  (
    <div className="dropdown">
      <button className="btn dropdown-toggle btn-sm bg-white text-secondary"
        type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
      </button>
      <div className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuButton">
        {dropDownMenu}
      </div>
    </div>
  )
  :
  null;
};

const mapStateToProps = state => (
  {
    isLoggedIn: isLoggedIn(state),
    currentUserId: getCurrentUserId(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    deletePost: postId => dispatch(deletePost(postId)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PostDropDown);
