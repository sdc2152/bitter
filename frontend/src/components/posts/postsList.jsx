import React from "react";
import {connect} from "react-redux";
import {getPosts} from "../../reducers/selectors";

class PostList extends React.Component {
  componentWillMount() {
    const {fetchPosts} = this.props;
    fetchPosts();
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
  }
);

export default connect(mapStateToProps)(PostList);
