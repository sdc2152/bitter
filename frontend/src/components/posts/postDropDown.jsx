import React from "react";
import {connect} from "react-redux";

import {getCurrentUserId, isLoggedIn} from "../../reducers/selectors";
import {deletePost} from "../../actions/postsActions";

const UserOwnedPostDropDown = ({deletePost, post}) => (
  <button className="dropdown-item"
    onClick={e => {e.stopPropagation(); return deletePost(post.id);}}>
      Delete
    </button>
);

const UserUnownedPostDropDown = () => (
    <button className="dropdown-item">
      not implemented
    </button>
);

const PostDropDown = ({post, currentUserId, deletePost, isLoggedIn}) => {
  const dropDownMenu = currentUserId === post.user.id ?
    <UserOwnedPostDropDown deletePost={deletePost} post={post}/>
    :
    <UserUnownedPostDropDown />;

  return isLoggedIn ?
  (
    <div className="dropdown">
      <button className="btn dropdown-toggle btn-sm bg-transparent
        text-secondary" onClick={e => e.stopPropagation()}
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
