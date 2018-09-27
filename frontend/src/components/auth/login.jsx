import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {loginUser, clearErrors} from "../../actions/authActions";
import {
  getUsernameErrors,
  getPasswordErrors,
  getNonFieldErrors,
  isLoggedIn,
} from "../../reducers/selectors";

import AuthErrors from "./authErrors";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e, username, password) {
    e.preventDefault();
    this.props.loginUser(username, password);
  }

  render() {
    const {usernameErrors, passwordErrors, nonFieldErrors, isLoggedIn} = this.props;
    const {username, password} = this.state;
    return isLoggedIn ?  <Redirect to="/"/> : (
      <div>
        <h1>
          login
        </h1>
        <form onSubmit={(e) => this.handleSubmit(e, username, password)}>
          <label>
            <AuthErrors errors={nonFieldErrors} />
            Username
            <input type="text" value={username}
              onChange={this.handleChange} name="username"
            />
            <AuthErrors errors={usernameErrors} />
          </label>
          <label>
            Password
            <input type="password" value={password}
              onChange={this.handleChange} name="password"
            />
            <AuthErrors errors={passwordErrors} />
          </label>
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    loginUser: (username, password) => dispatch(loginUser(username, password)),
    clearErrors: () => dispatch(clearErrors()),
  }
);

const mapStateToProps = state => (
  {
    usernameErrors: getUsernameErrors(state),
    passwordErrors: getPasswordErrors(state),
    nonFieldErrors: getNonFieldErrors(state),
    isLoggedIn: isLoggedIn(state),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
