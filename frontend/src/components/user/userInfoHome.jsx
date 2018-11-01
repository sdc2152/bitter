import React from "react";
import {Link} from "react-router-dom";

import AvatarView from "../image/avatarView";
import BannerView from "../image/bannerView";

const UserInfoHome = ({user}) => {
  const {username, profile} = user;
  const {slug, avatar, banner} = profile;
  return (
    <div className="bg-white user-info-home">
      <BannerView banner={banner}
        className="bg-primary user-info-header"
      >
        <div className="home-info-header-pic bg-white rounded-circle">
          <AvatarView avatar={avatar}
            className="avatar-medium rounded-circle p-1"/>
        </div>
      </BannerView>
      <div className="p-4">
        <div>
          <Link to={`/${slug}`}>
            {username}
          </Link>
        </div>
        <div>
          <Link to={`/${slug}`}>
            @{slug}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfoHome;
