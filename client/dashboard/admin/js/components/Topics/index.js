import React from 'react';
import { connect } from 'react-redux';
import {
  fetchTopics,
} from '../../actions/topics/';
class Topics extends React.Component {
  componentWillMount() {
    this.props.fetchTopics();
  }
  render() {
    return (
      <div className="topics">
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchTopics: () => dispatch(fetchTopics()),
  };
}

Topics = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topics);

export default Topics;
