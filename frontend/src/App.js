import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";

import Login from "./components/login";
import Logout from "./components/logout";
import SignUp from "./components/signUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
