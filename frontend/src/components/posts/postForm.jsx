import React from "react";
import {connect} from "react-redux";
import {createPost, changePostBody} from "../../actions/postsActions";

import {getPostFormBody} from "../../reducers/selectors";

const PostForm = ({body, createPost, changePostBody}) => (
  <div className="px-4 py-2 bg-primary-light">
    <form onSubmit={e => {e.preventDefault(); return createPost(body);}}>
      <input className="p-1 border-0 rounded" type="text" value={body}
        placeholder="What's on your mind?" name="body"
        onChange={e => changePostBody(e.target.value)}
      />
    </form>
  </div>
);

const mapDispatchToProps = dispatch => (
  {
    createPost: body => dispatch(createPost(body)),
    changePostBody: body => dispatch(changePostBody(body)),
  }
);

const mapStateToProp = state => (
  {
    body: getPostFormBody(state),
  }
);

export default connect(mapStateToProp, mapDispatchToProps)(PostForm);
