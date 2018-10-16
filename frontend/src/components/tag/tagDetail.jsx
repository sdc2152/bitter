import React from "react";

import {getTagPageFetchParams} from "../../actions/postsActions";
import PostList from "../posts/postsList";

class TagDetail extends React.Component {
  render() {
    const {match} = this.props;
    const {params} = match;
    const tagPageParams = getTagPageFetchParams(params);
    return (
      <div>
        <PostList params={tagPageParams}/>
      </div>
    );
  }
}

export default TagDetail;
