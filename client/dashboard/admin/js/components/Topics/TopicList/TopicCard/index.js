import React from 'react';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';

import TopicCardMenu from './TopicCardMenu';

import { colors } from '../../../../../../shared/js/constants';
import '../../../../../css/topic-card.scss';

const style = {
  paper: {
    padding: 0,
    height: 215,
    marginTop: 30,
  },
  actionButton: {
    width: '100%',
    height: '100%',
    textAlign: 'left',
    paddingLeft: 28,
    color: colors.accent,
    fontSize: 14,
  },
  link: {
    color: colors.gray,
    textDecoration: 'none',
  },
};

const TopicCard = props => {



  return (
    <div className="topic-card">
      <Paper style={ style.paper }>
        <div
          className="image-wrap"
          style={{ backgroundColor: props.color }}
        >
          <img
            src={ props.image }
          />
        </div>
        <main>
          <div className="content">
            <h4 className="name">
              { props.name }
            </h4>
            <div className="blurb">
              {
                // first ~sentence chars of blurb
                `${props.blurb.substr(0, 160)} ...`
              }
            </div>
          </div>
          <div className="action">
            <FlatButton
              style={ style.actionButton }
              label="Edit"
              onClick={ props.handleTopicClick }
            />
          </div>
          <TopicCardMenu />
        </main>
      </Paper>
    </div>
  );
};

export default TopicCard;
