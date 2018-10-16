import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {isLoggedIn} from "../reducers/selectors";
import UserHome from "./user/userHome";

const Home = ({isLoggedIn}) => (
  isLoggedIn ?
  <UserHome />
  :
  <div className="pt-4 bg-white position-fixed w-100">
    <div className="center-home mx-auto">
      <div>
        <h2>See what's happening in the world right now</h2>
      </div>

      <div className="pt-4">
        <h5>Join Bitter today.</h5>
      </div>

      <div className="pt-1">
        <Link className="btn btn-primary btn-block" to="/signup">
          Sign Up
        </Link>
      </div>

      <div className="pt-3">
        <Link className="btn btn-outline-primary btn-block" to="/login">
          Login
        </Link>
      </div>
    </div>

    <div className="bg-primary mt-4 py-5">
      <div className="center-home mx-auto text-white">
        <div className="py-3">
          <h5>Follow your interests.</h5>
        </div>
        <div className="py-3">
          <h5>Hear what people are talking about.</h5>
        </div>
        <div className="py-3">
          <h5>Join the conversation.</h5>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => (
  {
    isLoggedIn: isLoggedIn(state),
  }
);

export default connect(mapStateToProps)(Home);
