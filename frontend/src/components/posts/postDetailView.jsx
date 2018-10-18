import React from "react";
import {Link} from "react-router-dom";

import PostDropDown from "./postDropDown";
import PostBody from "./postBody";
import FollowButton from "../follows/followButton";
import Loading from "../loading";

const PostDetailView = ({postDetail, isPostDetailFound}) => {
  if (isPostDetailFound) {
    const {created, body, user} = postDetail;
    const {id:userId, profile, username} = user;
    const {slug} = profile;
    return (
      <div className="p-4 position-relative">
        <div className="d-flex justify-content-between">
          <div>
            <Link onClick={this.closeModal} to={`/${slug}`}>
              {username}@{slug}
            </Link>
            <div>
              {created}
            </div>
          </div>

          <div className="d-flex">
            <FollowButton userId={userId}/>
            <div className="post-item-dd">
              <PostDropDown className="post-item-dd" post={postDetail} />
            </div>
          </div>

        </div>

        <div className="p-2">
          <PostBody>
            {body}
          </PostBody>
        </div>
      </div>
    );
  }
  else {
    return <Loading />;
  }
};

export default PostDetailView;
