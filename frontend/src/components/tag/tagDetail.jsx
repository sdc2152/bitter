import React from "react";

import {getTagPageFetchParams} from "../../actions/postsActions";
import PostList from "../posts/postsList";

class TagDetail extends React.Component {
  render() {
    const {match} = this.props;
    const {params} = match;
    return (
      <div>
        <PostList params={getTagPageFetchParams(params)}/>
      </div>
    );
  }
}

export default TagDetail;
