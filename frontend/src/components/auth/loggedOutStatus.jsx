import React from "react";
import {Link} from "react-router-dom";

const LoggedOutDisplay = ({location}) => {
  const {pathname} = location;
  return (
    <div>
      {pathname === "/login" || <Link to="/login">Login</Link>}
      {pathname === "/signup" || <Link to="/signup">Sign Up</Link>}
    </div>
  );
};

export default LoggedOutDisplay;
