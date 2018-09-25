import React from "react";
import {connect} from "react-redux";

import {loginUser} from "../actions/userActions";

const login = ({loginUser}) => (
  <div>
    <h1>
      login
    </h1>
    <button onClick={() => loginUser("spencer", "otherperson")}>
      test
    </button>
  </div>
);

const mapDispatchToProps = dispatch => (
  {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
  }
);

export default connect(null, mapDispatchToProps)(login);
