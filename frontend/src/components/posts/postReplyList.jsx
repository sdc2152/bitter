import React from "react";

import PostListItem from "./postListItem";

const PostReplyList = ({replies}) => {
  const replyList = replies.map(
    reply => <PostListItem key={reply.id} post={reply} />
  );
  return (
    <div className="post-list">
      <ul className="list-group list-group-flush">
        {replyList}
      </ul>
    </div>
  );
};

export default PostReplyList;
