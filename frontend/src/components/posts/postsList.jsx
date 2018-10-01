import React from "react";
import {connect} from "react-redux";

import {getPosts, getDisplayUser} from "../../reducers/selectors";
import {fetchPosts} from "../../actions/postsActions";

class PostList extends React.Component {
  componentWillMount() {
    const {displayUser, fetchPosts} = this.props;
    fetchPosts(displayUser);
  }

  render() {
    const {posts} = this.props;
    const postsList = posts.map((e, i) => (
      <li key={e.id} >{e.body}</li>
    ));
    return (
      <div>
        Post List
        <ul>
          {postsList}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: getPosts(state),
    displayUser: getDisplayUser(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchPosts: displayUser => dispatch(fetchPosts(displayUser)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
