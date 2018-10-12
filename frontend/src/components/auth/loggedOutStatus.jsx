import React from "react";
import {Link} from "react-router-dom";

const LoggedOutDisplay = ({location}) => {
  const {pathname} = location;
  return (
    <div className="d-flex justfiy-content-around">
      {
      pathname === "/login" ||
      <div className="p-2">
        <Link to="/login">Login</Link>
      </div>
      }
      {
      pathname === "/signup" ||
      <div className="p-2">
        <Link to="/signup">Sign Up</Link>
      </div>
      }
    </div>
  );
};

export default LoggedOutDisplay;
