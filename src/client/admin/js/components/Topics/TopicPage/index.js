import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';

import DialogTitle from './DialogTitle';
import BasicInfo from './BasicInfo/';
import Content from './Content';
import Students from './Students';
import { colors } from '../../../../../shared/js/constants';
import '../../../../css/topic-page.less';

const style = {
  dialog: {
    container: {
      width: '60%',
      maxWidth: 1000000,
    },
    body: {
      padding: 10,
      backgroundColor: colors.background,
    },
  },
};

const TopicPage = props => {
  const tabs = [
    { name: 'Content', component: <Content topic={ props.topic } /> },
    { name: 'Students', component: <Students /> },
  ];
  return (
    <Dialog
      title={ <DialogTitle /> }
      open={ props.open }
      autoScrollBodyContent
      className="topic-page"
      contentStyle={ style.dialog.container }
      bodyStyle={ style.dialog.body }
    >
      <BasicInfo />
      <nav id="nav">
        {
          tabs.map((tab, index) => {
            return (
              <span
                key={ index }
                className={ props.tab === index ? 'current' : '' }
                onClick={ props.handleTabClick(index) }
              >
                { tab.name }
              </span>
            );
          })
        }
      </nav>
      {
        tabs.map((tab, index) => {
          return (
            <div
              key={ index }
              style={ props.tab === index ? { display: 'block' } : { display: 'none' }}
            >
              { tab.component }
            </div>
          );
        })
      }
    </Dialog>
  );
};

const findTopicById = (id, topicList) => topicList.find(t => t._id === id);

export default connect(
  state => ({
    topic: findTopicById(state.topics.topicList.selected, state.topics.topicList.topics),
  }),
)(TopicPage);
