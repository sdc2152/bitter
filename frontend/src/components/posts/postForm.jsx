import React from "react";
import {connect} from "react-redux";
import {createPost} from "../../actions/postsActions";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      body: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost(this.state.body);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {body} = this.state;
    return (
      <form onSubmit={(e) => this.handleSubmit(e, body)}>
        <label>
          Post
          <input type="text" value={body}
            onChange={this.handleChange} name="body"
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    createPost: body => dispatch(createPost(body)),
  }
);

export default connect(null, mapDispatchToProps)(PostForm);
