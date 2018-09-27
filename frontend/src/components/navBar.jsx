import React from "react";
import {Link} from "react-router-dom";

import AuthStatus from "./auth/authStatus";

const NavBar = () => {
  return (
    <div className="NavBar">
      <Link to="/">Home</Link>
      <AuthStatus />
    </div>
  );
};

export default NavBar;
