import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import HeaderMenu from '../../../shared/js/components/Layout/Header/HeaderMenu';
import { SearchBar } from './Search';

import colors from '../../../shared/js/constants/colors';
import studentColors from '../constants/colors';
import { getTextColor, goBack } from '../../../shared/js/utils';

function getAppBarStyle(props) {
  return {
    fontSize: '10px',
    flex: '0 0 auto',
    backgroundColor: props.color,
    boxShadow: props.hasBoxShadow ?
      'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px' :
      '',
  };
}

const buttonStyle = {
  icon: {
    marginLeft: 10,
    width: 70,
    height: 70,
    paddingTop: 13,
    marginTop: -14,
  },
  svg: {
    width: 24,
    height: 24,
  },
};


const BackButton = ({ onClick, color }) => (
  <IconButton
    style={ buttonStyle.icon }
    onClick={ onClick }
  >
    <IconArrowBack color={ color } />
  </IconButton>
);

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const BridgeIcon = ({ color }) => (
  <IconButton style={ buttonStyle.icon }>
    <svg style={ buttonStyle.svg } viewBox="0 0 24 24">
      <path
        fill={ color }
        d="M7,14V10.91C6.28,10.58 5.61,10.18 5,9.71V14H7M5,18H3V16H1V14H3V7H5V8.43C6.8,10 9.27,11 12,11C14.73,11 17.2,10 19,8.43V7H21V14H23V16H21V18H19V16H5V18M17,10.91V14H19V9.71C18.39,10.18 17.72,10.58 17,10.91M16,14V11.32C15.36,11.55 14.69,11.72 14,11.84V14H16M13,14V11.96L12,12L11,11.96V14H13M10,14V11.84C9.31,11.72 8.64,11.55 8,11.32V14H10Z"
      />
    </svg>
  </IconButton>
);

BridgeIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

const LeftIcon = ({ color, pathname, onGoBack }) => {
  if (pathname !== '/student/') {
    return <BackButton color={ color } onClick={ onGoBack } />;
  } else {
    return <BridgeIcon color={ color } />;
  }
};

LeftIcon.propTypes = {
  color: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  onGoBack: PropTypes.func.isRequired,
};

const Header = props => {
  const textColor = getTextColor(props.color);
  return (
    <AppBar
      style={ getAppBarStyle(props) }
      title={
        <Link to="/student/" style={{ color: textColor, textDecoration: 'none' }}>JCDS Bridge</Link>
      }
      iconElementLeft={
        <LeftIcon
          color={ textColor }
          pathname={ props.location.pathname }
          onGoBack={ () => goBack(props.location, props.history, '/student/')}
        />
      }
      iconElementRight={
        <div>
          <SearchBar color={ textColor } />
          <HeaderMenu iconColor={ textColor } />
        </div>
      }
    />
  );
};

Header.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,

  color: PropTypes.string.isRequired,
  // use in getAppBarStyles, but eslint can't detect
  hasBoxShadow: PropTypes.bool.isRequired, // eslint-disable-line react/no-unused-prop-types
};

function getTopicById(id, topics) {
  return topics.find(topic => topic.id === id);
}

function getHeaderColor(location, state) {

  const topicMatch = location.pathname.match(/^\/student\/topic\/([^/]+)/);

  if (topicMatch) {

    const topic = getTopicById(topicMatch[1], state.topics.topics);

    if (!topic) return studentColors.notLoadedTopic;
    return topic.data.color;

  } else if (location.pathname.startsWith('/student/search')) {

    return studentColors.searchColor;

  }
  return colors.primary.dark;
}
function shouldHaveBoxShadow(location) {
  return !location.pathname.startsWith('/student/topic/');
}


function mapStateToProps(state, { location }) {
  return {
    color: getHeaderColor(location, state),
    hasBoxShadow: shouldHaveBoxShadow(location),
  };
}

export default withRouter(connect(
  mapStateToProps,
)(Header));
