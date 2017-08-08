import React from 'react';
import AppLink from '../../../shared/js/components/AppLink';

import '../../css/tile.less';

const TopicCard = props => (
  <AppLink
    to={ `/student/topic/${props.id}` }
    className="tile"
    style={{ backgroundColor: props.color }}
  >
    <img src={ props.image } className="image" alt={ props.name } />
    <div className="name">{ props.name }</div>
  </AppLink>
);

export default TopicCard;
