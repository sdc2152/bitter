import React from "react";
import {connect} from "react-redux";

import {fetchPostsByLocation} from "../../actions/postsActions";
import {
  getPosts,
  getDisplayUser,
} from "../../reducers/selectors";

class PostList extends React.Component {
  componentWillMount() {
    const {fetchPostsByLocation, location} = this.props;

    fetchPostsByLocation(location);
  }

  render() {
    const {posts} = this.props;
    const postsList = posts.map(e => <li key={e.id} >{e.body}</li>);
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
    fetchPostsByLocation: params => dispatch(fetchPostsByLocation(params)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
