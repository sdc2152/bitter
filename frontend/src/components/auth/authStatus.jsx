import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";

import {isLoggedIn, getCurrentUser} from "../../reducers/selectors";
import {logoutUser} from "../../actions/authActions";

import LoggedInStatus from "./loggedInStatus";
import LoggedOutStatus from "./loggedOutStatus";

const AuthStatus = ({isLoggedIn, currentUser, logoutUser, location, }) => (
  isLoggedIn ?
  (
    <LoggedInStatus
      currentUser={currentUser}
      logoutUser={logoutUser}
    />
  )
  :
  (
    <LoggedOutStatus location={location} />
  )
);

const mapStateToProps = state => (
  {
    isLoggedIn: isLoggedIn(state),
    currentUser: getCurrentUser(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    logoutUser: () => dispatch(logoutUser()),
  }
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthStatus));
