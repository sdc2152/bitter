import React from "react";
import {connect} from "react-redux";

import {isLoggedIn} from "../reducers/selectors";
import UserHome from "./user/userHome";

const Home = ({isLoggedIn}) => (
  isLoggedIn ?
  <UserHome />
  :
  <div>Home</div>
);

const mapStateToProps = state => (
  {
    isLoggedIn: isLoggedIn(state),
  }
);

export default connect(mapStateToProps)(Home);
