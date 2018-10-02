import React from "react";
import {connect} from "react-redux";
import {createPost, changePostBody} from "../../actions/postsActions";

import {getPostFormBody} from "../../reducers/selectors";

const PostForm = ({body, createPost, changePostBody}) => (
  <form onSubmit={e => {e.preventDefault(); return createPost(body);}}>
    <label>
      Post
      <input type="text" value={body}
        onChange={e => changePostBody(e.target.value)} name="body"
      />
    </label>
    <input type="submit" value="Submit" />
  </form>
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
