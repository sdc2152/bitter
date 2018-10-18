import React from "react";
import {connect} from "react-redux";
import {
  createPost,
  changePostBody,
  getCreatePostData,
} from "../../actions/postsActions";

import {getPostFormBody} from "../../reducers/selectors";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const {body, createPost, replyTo, postContext} = this.props;
    e.preventDefault();
    createPost(getCreatePostData(body, replyTo), postContext);
  }

  handleChange(e) {
    const {changePostBody} = this.props;
    e.preventDefault();
    changePostBody(e.target.value);
  }

  render() {
    const {body} = this.props;
    return (
      <div className="px-4 py-2 bg-primary-light d-flex">
        <form className="flex-fill"
          onSubmit={this.handleSubmit}>
          <input className="p-1 border-0 rounded w-100" type="text" value={body}
            placeholder="What's on your mind?" name="body"
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    createPost: (data, postContext) => dispatch(createPost(data, postContext)),
    changePostBody: body => dispatch(changePostBody(body)),
  }
);

const mapStateToProp = state => (
  {
    body: getPostFormBody(state),
  }
);

export default connect(mapStateToProp, mapDispatchToProps)(PostForm);
