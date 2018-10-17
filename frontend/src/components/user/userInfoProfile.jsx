import React from "react";
import FollowButton from "../follows/followButton";

const UserInfoProfile = ({user}) => {
  const {id, username, profile, first_name, last_name, email} = user;
  const {description, slug} = profile;
  return (
    <div className="pt-5 user-info-width">
      <div className="p-4">
        <div>
          <h4>{username}</h4>
        </div>
        <div>
          @{slug}
        </div>
        <div>
          {description}
        </div>
        <div>
          {first_name}
        </div>
        <div>
          {last_name}
        </div>
        <div>
          {email}
        </div>
        <FollowButton userId={id} />
      </div>

    </div>
  );
};

export default UserInfoProfile;
