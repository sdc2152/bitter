import React from "react";

const LoggedInDisplay = ({currentUser, logoutUser}) => {
  const {username} = currentUser;
  return (
    <div>
      {username}
      <button onClick={logoutUser}>
        logout
      </button>
    </div>
  );
};

export default LoggedInDisplay;
