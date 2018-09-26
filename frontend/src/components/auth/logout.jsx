import React from "react";
import {connect} from "react-redux";

import {logoutUser} from "../../actions/authActions";

const logout = ({logoutUser}) => (
  <div>
    <h1>
      logout
    </h1>
    <button onClick={() => logoutUser()}>
      logout
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => (
  {
    logoutUser: () => dispatch(logoutUser()),
  }
);

export default connect(null, mapDispatchToProps)(logout);
