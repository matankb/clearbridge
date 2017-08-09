import React from 'react';
import PropTypes from 'prop-types';

import AppLink from '../../../shared/js/components/AppLink';

import '../../css/tile.less';

const TopicCard = props => (
  <AppLink
    to={ `/student/topic/${props.id}/` }
    className="tile"
    style={{ backgroundColor: props.color }}
  >
    <img src={ props.image } className="image" alt={ props.name } />
    <div className="name">{ props.name }</div>
  </AppLink>
);

TopicCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default TopicCard;
