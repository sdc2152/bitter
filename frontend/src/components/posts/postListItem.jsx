import React from "react";
import {Link} from "react-router-dom";

import PostDropDown from "./postDropDown";
import PostBody from "./postBody";
import PostDetail from "./postDetail";
import AvatarView from "../image/avatarView";
import PostModal from "./postModal";

import ReplyIcon from "../../images/reply_icon.png";

const stopProp = e => e.stopPropagation();

const PostListItem = ({post, postContext}) => {
  const {id, body, user, created, replies} = post;
  const {username, profile} = user;
  const {slug, avatar} = profile;
  return (
    <li className="list-group-item p-0">
      <PostDetail postId={id}>
        <div className="p-4 d-flex">

          <div className="pt-2">
            <AvatarView className="avatar-sm rounded-circle"
              avatar={avatar} />
          </div>

          <div className="ml-3 w-100">

            <div>
              <div className="d-flex justify-content-between">
                <div onClick={stopProp}>
                  <Link to={`/${slug}`}>
                    {username}@{slug}
                  </Link>
                  <div>
                    {created}
                  </div>
                </div>

                <div className="post-item-dd">
                  <PostDropDown className="post-item-dd" post={post} />
                </div>
              </div>
              <div className="p-2">
                <PostBody>
                  {body}
                </PostBody>
              </div>
            </div>

            <div className="d-inline-block">
              <PostModal postContext={postContext} replyTo={id}>
                <img src={ReplyIcon} className="reply-icon" alt="" />
                {replies.length > 0 && replies.length}
              </PostModal>
            </div>

          </div>
        </div>


      </PostDetail>
    </li>
  );
};

export default PostListItem;
