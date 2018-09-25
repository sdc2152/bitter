import React from "react";
import {connect} from "react-redux";

import {loginUser} from "../actions/userActions";

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

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e, username, password) {
    e.preventDefault();
    this.props.loginUser(username, password);
  }

  render() {
    const {username, password} = this.state;
    return (
      <div>
        <h1>
          login
        </h1>
        <form onSubmit={(e) => this.handleSubmit(e, username, password)}>
          <label>
            Username
            <input type="text" value={username}
              onChange={this.handleChange} name="username" />
          </label>
          <label>
            Password
            <input type="password" value={password}
              onChange={this.handleChange} name="password" />
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
  }
);

export default connect(null, mapDispatchToProps)(Login);
