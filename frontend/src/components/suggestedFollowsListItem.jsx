import React from "react";
import {Link} from "react-router-dom";

import AvatarView from "./image/avatarView";
import FollowButton from "./follows/followButton";

const SuggestedFollowsListItem = ({user}) => {
  const {id, username, profile} = user;
  const {avatar, slug} = profile;
  return (
    <li className="list-group-item py-4 px-3">
      <div className="d-flex align-items-center">

        <div>
          <AvatarView className="avatar-follows rounded-circle"
            avatar={avatar}/>
        </div>

        <div className="ml-2 text-truncate">
          <div className="text-truncate">
            <Link to={`/${slug}`}>{username}@{slug}</Link>
          </div>
          <div>
            <FollowButton userId={id} />
          </div>
        </div>

      </div>
    </li>
  );
};

export default SuggestedFollowsListItem;
