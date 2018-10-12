import React from "react";
import {Link} from "react-router-dom";

import AuthStatus from "./auth/authStatus";
import TweetButton from "./tweetButton";

const NavBar = () => {
  return (
    <nav className="navbar fixed-top navbar-light bg-white shadow-sm">
        <div className="d-flex flex-row bd-highlight mb-3">
          <Link className="nav-link" to="/">Home</Link>
        </div>

        <div className="d-flex bd-highlight">
          <AuthStatus />
          <TweetButton />
        </div>
    </nav>
  );
};

export default NavBar;
