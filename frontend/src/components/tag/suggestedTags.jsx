import React from "react";
import {connect} from "react-redux";

import {fetchSuggestedTags} from "../../actions/suggestedTagActions";
import {
  getSuggestedTags,
  getIsFetchingSuggestedTags,
} from "../../reducers/selectors";

import Loading from "../loading";
import SuggestedTagsListItem from "./suggestedTagsListItem";

class SuggestedTags extends React.Component {
  constructor(props) {
    super(props);
    this.generateTags = this.generateTags.bind(this);
  }

  componentWillMount() {
    const {fetchSuggestedTags} = this.props;
    fetchSuggestedTags();
  }

  generateTags() {
    const {suggestedTags} = this.props;
    const thing = suggestedTags.map(tag => (
      <SuggestedTagsListItem tag={tag} key={tag.id} />
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
              See what people are talking about
            </h5>
          </div>
          <ul className="list-group list-group-flush">
            {this.generateTags()}
          </ul>
        </div>
      );
  }
}

const mapStateToProps = state => (
  {
    isFetching: getIsFetchingSuggestedTags(state),
    suggestedTags: getSuggestedTags(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetchSuggestedTags: () => dispatch(fetchSuggestedTags()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(SuggestedTags);
