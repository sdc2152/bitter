import React from "react";

const LoggedInDisplay = ({currentUser, logoutUser}) => {
  const {username} = currentUser;
  return (
    <div className="dropdown">
      <button className="btn dropdown-toggle"
        type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
        {username}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button className="dropdown-item" onClick={logoutUser}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default LoggedInDisplay;
