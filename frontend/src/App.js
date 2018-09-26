import React, { Component } from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {getLoginStatus} from "./actions/authActions";
import {getInitialLogInComplete} from "./reducers/selectors";

import Login from "./components/auth/login";
import Logout from "./components/auth/logout";
import SignUp from "./components/auth/signUp";
import NavBar from "./components/navBar";
import Home from "./components/home";
import NotFound from "./components/notFound";

class App extends Component {
  componentWillMount() {
    this.props.getLoginStatus();
  }

  render() {
    const {initialLoginComplete} = this.props;
    return initialLoginComplete ?
    (
      <div className="App">
        <NavBar />
        <Router >
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUp} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    )
    :
    null;
  }
}

const mapDispatchToProps = dispatch => (
  {
    getLoginStatus: () => dispatch(getLoginStatus()),
  }
);

const mapStateToProps = state => (
  {
    initialLoginComplete: getInitialLogInComplete(state),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
