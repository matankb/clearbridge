import React from 'react';
import { connect } from 'react-redux';
class Topics extends React.Component {
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
  };
}
Topics = connect(
  mapStateToProps,
  mapDispatchToProps
)(Topics);

export default Topics;
