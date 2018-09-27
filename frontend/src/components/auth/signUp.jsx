import React from "react";
import {connect} from "react-redux";

import {signUpUser, clearErrors} from "../../actions/authActions";
import {
  getUsernameErrors,
  getPasswordErrors,
  getNonFieldErrors,
} from "../../reducers/selectors";

import AuthErrors from "./authErrors";

class SignUp extends React.Component {
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
    this.props.signUpUser(username, password);
  }

  render() {
    const {username, password} = this.state;
    const {usernameErrors, passwordErrors, nonFieldErrors} = this.props;
    return (
      <div>
        <h1>
          sign up
        </h1>
        <form onSubmit={(e) => this.handleSubmit(e, username, password)}>
          <AuthErrors errors={nonFieldErrors} />
          <label>
            Username
            <input type="text" value={username}
              onChange={this.handleChange} name="username" />
            <AuthErrors errors={usernameErrors} />
          </label>
          <label>
            Password
            <input type="password" value={password}
              onChange={this.handleChange} name="password" />
              <AuthErrors errors={passwordErrors} />
          </label>
          <input type="submit" value="SignUp" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    signUpUser: (username, password) => dispatch(signUpUser(username, password)),
    clearErrors: () => dispatch(clearErrors()),
  }
);

const mapStateToProps = state => (
  {
    usernameErrors: getUsernameErrors(state),
    passwordErrors: getPasswordErrors(state),
    nonFieldErrors: getNonFieldErrors(state),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
