import React from "react";
import {connect} from "react-redux";

import {isLoggedIn, getCurrentUser} from "../../reducers/selectors";

const AuthStatus = ({isLoggedIn, currentUser}) => (
  isLoggedIn ?
  (<div>Logged In</div>)
  :
  (<div>Not Logged In</div>)
);

const mapStateToProps = state => (
  {
    isLoggedIn: isLoggedIn(state),
    currentUser: getCurrentUser(state),
  }
);

export default connect(mapStateToProps)(AuthStatus);
