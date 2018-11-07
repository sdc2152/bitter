import React from "react";

import PostListItem from "./postListItem";
import PostShowRepliesList from "./postShowRepliesList";

const PostReplyListItem = ({postContext, post}) => (
  <div>
    <PostListItem postContext={postContext}
      key={post.id} post={post} />
    <PostShowRepliesList post={post} />
  </div>
);

export default PostReplyListItem;
