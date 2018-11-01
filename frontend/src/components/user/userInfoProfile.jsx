import React from "react";
import FollowButton from "../follows/followButton";

const UserInfoProfile = ({user}) => {
  const {id, username, profile} = user;
  const {description, slug} = profile;
  return (
    <div className="pt-4 user-info-width">
      <div className="p-4">
        <div>
          <h5>{username}</h5>
        </div>
        <div>
          @{slug}
        </div>
        <div>
          {description}
        </div>
        <FollowButton userId={id} />
      </div>
    </div>
  );
};

export default UserInfoProfile;
