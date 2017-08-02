import React from 'react';
import { connect } from 'react-redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import TopicList from './TopicList/';
import CreateTopic from './CreateTopic/';
import TopicPage from './TopicPage/';
import {
  setCreationStatus,
  fetchTopics,
  selectTopic,
  toggleTopicPage,
  setTopicPageTab,
} from '../../actions/topics/';

import '../../../css/topics.less';
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
          setSelectedTopic={ this.props.setSelectedTopic }
          toggleTopicPage={ this.props.toggleTopicPage }
        />

        <TopicPage
          open={ this.props.topicPageOpen }
          tab={ this.props.topicPageTab }
          handleTabClick={ this.props.handleTabClick }
        />

        <CreateTopic
          open={ this.props.isCreating }
          stage={ this.props.createStage }
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isCreating: state.topics.create.isCreating,
    createStage: state.topics.create.stage,
    topics: state.topics.topicList.topics,
    topicPageOpen: state.topics.topicPage.open,
    topicPageTab: state.topics.topicPage.tab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleFABClick: () => dispatch(setCreationStatus(true)),
    fetchTopics: () => dispatch(fetchTopics()),
    setSelectedTopic: id => () => dispatch(selectTopic(id)),
    toggleTopicPage: () => dispatch(toggleTopicPage()),
    handleTabClick: index => () => dispatch(setTopicPageTab(index)),
  };
}

Topics = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Topics);

export default Topics;
export { TopicPage };
