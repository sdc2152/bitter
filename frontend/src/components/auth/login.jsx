import React from "react";
import {connect} from "react-redux";
import {Redirect, Link} from "react-router-dom";

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

  // TODO: change the onSubmit to just call handleSubmit with no username/pw
  render() {
    const {
      usernameErrors,
      passwordErrors,
      nonFieldErrors,
      isLoggedIn,
    } = this.props;
    const {username, password} = this.state;
    return isLoggedIn ?
    <Redirect to="/"/>
    :
    (
      <div className="m-3 border">
        <div className="bg-white p-5">
          <h4>
            Login to Bitter
          </h4>

          <form onSubmit={(e) => this.handleSubmit(e, username, password)}>

            <div className="form-group w-75">
              <AuthErrors errors={nonFieldErrors} />

              <input className="form-control"
                type="text" value={username} placeholder="username"
                onChange={this.handleChange} name="username"
              />
              <AuthErrors errors={usernameErrors} />
            </div>

            <div className="form-group w-75">
              <input className="form-control"
                type="password" value={password} placeholder="password"
                onChange={this.handleChange} name="password"
              />
              <AuthErrors errors={passwordErrors} />
            </div>

            <div className="pt-4">
              <input className="btn btn-primary px-4" type="submit"
                value="Login" />
            </div>
          </form>
        </div>

        <div className="bg-light p-5">
          <h5>
            New to Bitter?
            <Link className="text-primary pl-1" to="signup">Sign up now</Link>
          </h5>
        </div>
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
