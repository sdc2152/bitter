import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/main.css";

import React, { Component } from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {getLoginStatus} from "./actions/authActions";
import {getInitialLogInComplete} from "./reducers/selectors";

import NavBar from "./components/navBar";
import Home from "./components/home";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import UserProfile from "./components/user/userProfile";
import NotFound from "./components/notFound";

Modal.setAppElement("#root");

class App extends Component {
  componentWillMount() {
    this.props.getLoginStatus();
  }

  render() {
    const {initialLoginComplete} = this.props;
    return initialLoginComplete ?
    // TODO: not sure if Not Found will ever be called
    (
      <Router >
        <div className="App">
            <Route component={NavBar} />
            <div className="body mx-lg-5 mx-sm-3">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/:userSlug" component={UserProfile} />
                <Route component={NotFound} />
              </Switch>
            </div>
        </div>
      </Router>
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
