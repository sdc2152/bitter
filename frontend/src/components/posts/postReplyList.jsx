import React from "react";

import PostReplyListItem from "./postReplyListItem";
import {POST_CONTEXT} from "../../actions/postsActions";

const PostReplyList = ({replies}) => {
  const replyList = replies.map(
    reply => (
      <PostReplyListItem postContext={POST_CONTEXT.POST_DETAIL}
        key={reply.id} post={reply} />
    )
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
