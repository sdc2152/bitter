import React from "react";

import {getTagPageFetchParams} from "../../actions/postsActions";
import PostList from "../posts/postsList";

class TagDetail extends React.Component {
  render() {
    const {match} = this.props;
    const {params} = match;
    const {tagName} = params;
    return (
      <div>
        <div className="bg-primary tag-header">
          <div className="p-4">
            <h1 className="text-white">
              {tagName}
            </h1>
          </div>
        </div>
        <PostList params={getTagPageFetchParams(params)}/>
      </div>
    );
  }
}

export default TagDetail;
