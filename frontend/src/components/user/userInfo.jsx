import React from "react";
import FollowButton from "../follows/followButton";

const UserInfo = ({user}) => {
  const {id, username, profile, first_name, last_name, email} = user;
  const {description, slug} = profile;
  return (
    <div className="p-4 m-4">
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
  );
};

export default UserInfo;
