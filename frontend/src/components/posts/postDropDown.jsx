import React from "react";
import {connect} from "react-redux";

import {getCurrentUserId, isLoggedIn} from "../../reducers/selectors";
import {deletePost} from "../../actions/postsActions";


// TODO: implement menu for posts not owned by user
const PostDropDown = ({post, currentUserId, deletePost, isLoggedIn}) => (
  !isLoggedIn ?
  null
  :
  currentUserId === post.user.id ?
  (
    <div className="dropdown">
      <button className="btn dropdown-toggle"
        type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item" onClick={() => deletePost(post.id)}>
          Delete
        </button>
      </div>
    </div>
  )
  :
  (
    <div className="dropdown">
      <button className="btn dropdown-toggle"
        type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item">
          not implemented
        </button>
      </div>
    </div>
  )
);

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
