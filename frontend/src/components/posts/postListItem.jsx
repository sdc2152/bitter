import React from "react";
import {Link} from "react-router-dom";
import PostDropDown from "./postDropDown";
import PostBody from "./postBody";

const PostListItem = ({post}) => {
  const {body, user, created} = post;
  const {username, profile} = user;
  const {slug} = profile;
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between">

        <div>
          <Link to={`/${slug}`}>
            {username}@{slug}
          </Link>
          <div>
            {created}
          </div>
        </div>

        <PostDropDown post={post} />
      </div>

      <div className="p-2">
        <PostBody>
          {body}
        </PostBody>
      </div>
    </li>
  );
};

export default PostListItem;
