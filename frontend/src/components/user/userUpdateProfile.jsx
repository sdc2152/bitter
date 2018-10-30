import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {
  getCurrentUser,
  getProfileFormFields,
  isLoggedIn,
} from "../../reducers/selectors";

import {
  setInitialProfileForm,
  changeProfileField,
  updateUser,
} from "../../actions/profileFormActions";

class UserUpdateProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileFieldChange = this.handleProfileFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const {currentUser, setInitialProfileForm, isLoggedIn} = this.props;
    isLoggedIn && setInitialProfileForm(currentUser);
  }

  handleProfileFieldChange(e) {
    const {changeProfileField} = this.props;
    e.preventDefault();
    changeProfileField({[e.target.name]: e.target.value});
  }

  handleSubmit(e) {
    const {currentUser, updateUser, profileFormFields} = this.props;
    e.preventDefault();
    updateUser(profileFormFields, currentUser.id);
  }

  render() {
    const {profileFormFields, isLoggedIn} = this.props;
    const {
      username,
      first_name,
      last_name,
      email,
      slug,
      description,
    } = profileFormFields;

    return isLoggedIn ?
      (
      <div className="position-fixed w-100">
        <div className="bg-white h-100">

          <div className="p-5 w-50 m-auto">
            <h4>
              Edit profile information
            </h4>
            <form onSubmit={this.handleSubmit}>

              <div className="form-group">
                <label for="usernameInput">Username</label>
                <input className="form-control" type="text"
                  placeholder="username" name="username"
                  value={username} id="usernameInput"
                  onChange={this.handleProfileFieldChange}
                />
              </div>

              <div className="form-group">
                <div className="input-group-prepend">
                  <div className="input-group-text">@</div>
                  <input className="form-control" type="text"
                    placeholder="slug" name="slug"
                    value={slug}
                    onChange={this.handleProfileFieldChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label for="emailInput">Email</label>
                <input className="form-control" type="text"
                  placeholder="email" name="email"
                  value={email} id="emailInput"
                  onChange={this.handleProfileFieldChange}
                />
              </div>

              <div className="form-group">
                <label for="first_nameInput">First name</label>
                <input className="form-control" type="text"
                  placeholder="first name" name="first_name"
                  value={first_name} id="first_nameInput"
                  onChange={this.handleProfileFieldChange}
                />
              </div>

              <div className="form-group">
                <label for="last_nameInput">Last name</label>
                <input className="form-control" type="text"
                  placeholder="last name" name="last_name"
                  value={last_name} id="last_nameInput"
                  onChange={this.handleProfileFieldChange}
                />
              </div>

              <div className="form-group">
                <label for="descriptionInput">Description</label>
                <input className="form-control" type="text"
                  placeholder="description" name="description"
                  value={description} id="descriptionInput"
                  onChange={this.handleProfileFieldChange}
                />
              </div>

              <div className="form-group float-right">
                <input className="btn btn-primary" type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      )
      :
      (
      <Redirect to="/" />
      );
  }
}

const mapStateToProps = state => (
  {
    currentUser: getCurrentUser(state),
    profileFormFields: getProfileFormFields(state),
    isLoggedIn: isLoggedIn(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    setInitialProfileForm: currentUser => (
      dispatch(setInitialProfileForm(currentUser))
    ),
    changeProfileField: data => dispatch(changeProfileField(data)),
    updateUser: (data, id) => dispatch(updateUser(data, id)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdateProfile);
