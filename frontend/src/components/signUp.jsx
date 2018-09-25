import React from "react";
import {connect} from "react-redux";

import {signUpUser} from "../actions/userActions";

const signUp = ({signUpUser}) => (
  <div>
    <h1>
      signUp
    </h1>
    <button onClick={() => signUpUser("spencer", "otherperson")}>
      test
    </button>
  </div>
);

const mapDispatchToProps = (dispatch) => (
  {
    signUpUser: (username, password) => dispatch(signUpUser(username, password)),
  }
);

export default connect(null, mapDispatchToProps)(signUp);
