import React from "react";
import {connect} from "react-redux";
import {Redirect, Link} from "react-router-dom";

import {signUpUser, clearErrors} from "../../actions/authActions";
import {
  getUsernameErrors,
  getPasswordErrors,
  getNonFieldErrors,
  isLoggedIn,
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

  handleSubmit(e) {
    const {username, password} = this.state;
    const {signUpUser} = this.props;
    e.preventDefault();
    signUpUser(username, password);
  }

  render() {
    const {username, password} = this.state;
    const {
      usernameErrors,
      passwordErrors,
      nonFieldErrors,
      isLoggedIn
    } = this.props;
    return isLoggedIn ?  <Redirect to="/" /> :
      (
        <div className="position-fixed w-100">
          <div className="bg-white h-100">
            <div className="center-signup p-5 mx-auto">
              <h4>
                Create your account
              </h4>

              <form onSubmit={this.handleSubmit}>
                <AuthErrors errors={nonFieldErrors} />

                <div className="form-group pt-3">
                  <input className="form-control border-top-0 border-right-0
                    border-left-0" type="text"
                    value={username} placeholder="username"
                    onChange={this.handleChange} name="username" />
                  <AuthErrors errors={usernameErrors} />
                </div>

                <div className="form-group pt-3">
                  <input className="form-control border-top-0 border-right-0
                    border-left-0" type="password"
                    value={password} placeholder="password"
                    onChange={this.handleChange} name="password" />
                  <AuthErrors errors={passwordErrors} />
                </div>

                <div className="d-flex flex-row-reverse pt-3">
                  <input className="btn btn-primary btn-md px-4" type="submit"
                    value="Sign Up"
                  />
                </div>

                <div className="text-center pt-5">
                  <h6>
                    Or if you already have an account
                    <Link className="pl-1" to="login">login here</Link>
                  </h6>
                </div>
              </form>
            </div>
          </div>
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
    isLoggedIn: isLoggedIn(state),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
