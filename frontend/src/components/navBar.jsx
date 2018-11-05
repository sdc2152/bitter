import React from "react";
import {Link} from "react-router-dom";

import AuthStatus from "./auth/authStatus";
import PostModal from "./posts/postModal";
import ImageFormModal from "./image/imageFormModal";

import {POST_CONTEXT} from "../actions/postsActions";

const NavBar = ({location}) => {
  let postContext;
  if (location.pathname === "/") {
    postContext = POST_CONTEXT.HOME_PAGE;
  }
  return (
    <nav className="navbar fixed-top navbar-light bg-white shadow-sm">
        <div className="d-flex flex-row bd-highlight mb-3">
          <Link className="nav-link" to="/">Home</Link>
        </div>
        <div className="d-flex bd-highlight">
          <AuthStatus />
          <PostModal postContext={postContext}>
            <button className="btn btn-primary">
              Tweet
            </button>
          </PostModal>
        </div>
    </nav>
  );
};

export default NavBar;
