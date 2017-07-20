import React from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import HeaderMenu from '../../../shared/js/components/Layout/Header/HeaderMenu';
import { colors } from '../../../shared/js/constants/';

import { toggleTopicPage } from '../actions';

function style(props) {
  let styles = {
    fontSize: '10px',
  };
  if (props.open) {
    styles.backgroundColor = props.color;
    styles.boxShadow = 'none';
  } else {
    styles.backgroundColor = colors.primary.dark;
    styles.boxShadow = 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px';
  }
  return styles;
}

function icon (props) {
  const iconStyle = {
    marginLeft: 10,
    width: 70,
    height: 70,
    paddingTop: 13,
    marginTop: -14,
  };
  if (props.open) {
    return (
        <IconButton
          style={ iconStyle }
          onClick={ props.onCloseClick }
        >
          <NavigationClose />
        </IconButton>
      );
  } else {
    return (<IconButton style={ iconStyle }><svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path
              fill="#ffffff"
              d="M7,14V10.91C6.28,10.58 5.61,10.18 5,9.71V14H7M5,18H3V16H1V14H3V7H5V8.43C6.8,10 9.27,11 12,11C14.73,11 17.2,10 19,8.43V7H21V14H23V16H21V18H19V16H5V18M17,10.91V14H19V9.71C18.39,10.18 17.72,10.58 17,10.91M16,14V11.32C15.36,11.55 14.69,11.72 14,11.84V14H16M13,14V11.96L12,12L11,11.96V14H13M10,14V11.84C9.31,11.72 8.64,11.55 8,11.32V14H10Z" />
            </svg></IconButton>);
  }
}
let Header = props => {
  return (
    <AppBar
      style={ style(props) }
      title="JCDS Bridge"
      iconElementLeft={ icon(props) }
      iconElementRight={ <HeaderMenu /> }
    />
  );
};

function getTopicById(_id, topics) {
  return topics.filter(topic => topic._id === _id)[0] || '';
}

function getHeaderColor(state) {
  let color;
  if (state.topics.topicPageOpen) {
    color = getTopicById(state.topics.selectedTopic, state.topics.topics).color;
  }
  return color;
}

function mapStateToProps(state) {
  return {
    open: state.topics.topicPageOpen,
    color: getHeaderColor(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onCloseClick: () => dispatch(toggleTopicPage()),
  };
}

Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default Header;
