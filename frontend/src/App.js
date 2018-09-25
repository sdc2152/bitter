import React, { Component } from "react";
import {Route, Switch} from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
