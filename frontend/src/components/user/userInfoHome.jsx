import React from "react";

const UserInfoHome = ({user}) => {
  const {username, profile} = user;
  const {slug} = profile;
  return (
    <div className="bg-white user-info-home">
      <div>
        <div>
          {username}
        </div>
        <div>
          @{slug}
        </div>
      </div>
    </div>
  );
};

export default UserInfoHome;
