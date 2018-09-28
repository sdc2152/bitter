import React from "react";

class UserProfile extends React.Component {
  componentWillMount() {
    const {userSlug} = this.props.match.params;
    console.log(userSlug);
  }

  render() {
    return (
      <div>
        User
      </div>
    );
  }
}

export default UserProfile;
