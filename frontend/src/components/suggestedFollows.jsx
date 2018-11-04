import React from "react";
import {connect} from "react-redux";

import {fetchSuggestedFollows} from "../actions/suggestedFollowActions";
import {
  getSuggestedFollows,
  getIsFetchingSuggestedFollows,
} from "../reducers/selectors";

import Loading from "./loading";
import SuggestedFollowsListItem from "./suggestedFollowsListItem";

class SuggestedFollows extends React.Component {
  constructor(props) {
    super(props);
    this.generateFollows = this.generateFollows.bind(this);
  }

  componentWillMount() {
    const {fetchSuggestedFollows} = this.props;
    fetchSuggestedFollows();
  }

  generateFollows() {
    const {suggestedFollows} = this.props;
    const thing = suggestedFollows.map(user => (
      <SuggestedFollowsListItem user={user} key={user.id} />
    ));
    return thing;
  }

  render() {
    const {isFetching} = this.props;
    return isFetching ?
      <Loading/>
      :
      (
        <div className="mt-2 bg-white">
          <div>
            <h5 className="pt-3 px-2">
              Who to follow
            </h5>
          </div>
          <ul className="list-group list-group-flush">
            {this.generateFollows()}
          </ul>
        </div>
      );
  }
}

const mapStateToProps = state => (
  {
    isFetching: getIsFetchingSuggestedFollows(state),
    suggestedFollows: getSuggestedFollows(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchSuggestedFollows: () => dispatch(fetchSuggestedFollows()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedFollows);
