import React from "react";

import ReplyListItem from "./postReplyListItem";

const PostReplyList = ({replies}) => {
  const replyList = replies.map(
    reply => <ReplyListItem key={reply.id} reply={reply} />
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
