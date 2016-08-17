import React from 'react';
import { connect } from 'react-redux';
import {
  fetchTopics,
} from '../../actions/topics/';

import '../../../css/topics.scss';
import colors from '../../../../shared/js/constants/colors';

const style = {
  fab: {
    position: 'fixed',
    bottom: 50,
    right: 82,
    zIndex: 2,
  },
};

class Topics extends React.Component {
  componentWillMount() {
    this.props.fetchTopics();
  }
  render() {
    return (
      <div className="topics">

        <FloatingActionButton
          onTouchTap={ this.props.handleFABClick }
          style={ style.fab }
          backgroundColor={ colors.accent }
        >
          <AddIcon />
        </FloatingActionButton>

        <TopicList
          topics={ this.props.topics }
        />
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
