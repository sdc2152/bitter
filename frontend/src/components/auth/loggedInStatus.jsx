import React from "react";
import {Link} from "react-router-dom";
import AvatarView from "../image/avatarView";

const LoggedInDisplay = ({currentUser, logoutUser}) => {
  const {profile} = currentUser;
  const {avatar} = profile;
  return (
    <div className="dropdown px-3">
      <button className="btn p-0 rounded-circle bg-transparent"
        type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        <AvatarView className="avatar-xs rounded-circle" avatar={avatar}/>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="dropdown-item" to="/edit">
          Edit profile
        </Link>
        <button className="dropdown-item" onClick={logoutUser}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default LoggedInDisplay;
