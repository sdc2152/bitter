import React from "react";
import FollowButton from "../follows/followButton";

const UserInfoProfile = ({user}) => {
  const {id, username, profile, first_name, last_name, email} = user;
  const {description, slug} = profile;
  return (
    <div className="bg-white user-info-home">
      <div>
        <div>
          {username}
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
