import React from "react";
import {Link} from "react-router-dom";

import PostDropDown from "./postDropDown";
import PostBody from "./postBody";
import PostDetail from "./postDetail";

const PostReplyListItem = ({reply}) => {
  const {id, body, user, created} = reply;
  const {username, profile} = user;
  const {slug} = profile;
  return (
    <li className="list-group-item p-0">
      <PostDetail postId={id}>
        <div className="p-4">
          <div className="d-flex justify-content-between">
            <div>
              <Link to={`/${slug}`}>
                {username}@{slug}
              </Link>
              <div>
                {created}
              </div>
            </div>

            <div className="post-item-dd">
              <PostDropDown className="post-item-dd" post={reply} />
            </div>
          </div>

          <div className="p-2">
            <PostBody>
              {body}
            </PostBody>
          </div>
        </div>
      </PostDetail>
    </li>
  );
};

export default PostReplyListItem;
