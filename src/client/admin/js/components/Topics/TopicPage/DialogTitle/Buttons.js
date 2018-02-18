import React from 'react';

import IconButton from 'material-ui/IconButton';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
import TopicMenu from '../../TopicMenu';

import { colors } from '../../../../../../shared/js/constants';

const style = {
  title: {
    color: 'white',
    backgroundColor: colors.primary.dark,
    paddingBottom: 10,
    fontSize: 17,
  },
  text: {
    color: 'white',
  },
  icon: {
    top: 5,
    padding: 0,
  },
  menuWrap: {
    display: 'inline-block',
    position: 'relative',
    top: 6,
    left: '75%',
  },
};

const Buttons = props => {
  return (
    <div style={ style.title } className="hi" >
      <IconButton
        onClick={ props.handleClose }
        style={ style.icon }
      >
        <ArrowIcon style={ style.icon } color="white" />
      </IconButton>
      <span style={ style.text } >Edit Topic</span>
      <span style={ style.menuWrap }>
        <TopicMenu color="white" />
      </span>
    </div>
  );
};

export default Buttons;
