import React from 'react';
import PropTypes from 'prop-types';

import LaunchIcon from 'material-ui/svg-icons/action/launch';

import AppLink from '~/shared/js/components/AppLink';
import ExternalLink from '~/shared/js/components/ExternalLink';

import '~/student/css/tile.less';

const style = {
  launchIcon: {
    position: 'absolute',
    top: 7,
    right: 7,
  },
};

const TopicCard = props => {

  const topicCardBody = (
    <div className="topic-card-body">
      <img src={ props.image } className="image" alt={ props.name } />
      <div className="name">
        { props.name }
        {
        props.external &&
        <LaunchIcon
          color="white"
          style={ style.launchIcon }
        />
      }
      </div>
    </div>
  );

  return props.external ?
    <ExternalLink
      className="tile"
      style={{ background: props.color }}
      href={ props.externalLink }
      children={ topicCardBody }
    /> :
    <AppLink
      to={ `/student/topic/${props.id}/` }
      className="tile"
      style={{ backgroundColor: props.color }}
      children={ topicCardBody }
    />;
};

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  external: PropTypes.bool.isRequired,
  externalLink: PropTypes.string,
};
const defaultProps = {
  externalLink: '#',
};

TopicCard.propTypes = propTypes;
TopicCard.defaultProps = defaultProps;

export default TopicCard;
