import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import LaunchIcon from 'material-ui/svg-icons/action/launch';

import AppLink from '~/shared/js/components/AppLink';
import ExternalLink from '~/shared/js/components/ExternalLink';

const style = {
  appLink: {
    display: 'block',
    marginRight: 'auto',
    marginLeft: 'auto',
    textDecoration: 'none',
    maxWidth: '80%',
    width: 700,
  },
  paper: {
    display: 'flex',
    marginTop: 30,
    marginLeft: 0,
    marginRight: 0,
    height: 180,
    width: '100%',
    cursor: 'pointer',
  },
  launchIcon: {
    position: 'relative',
    top: 30,
    right: 30,
    width: 30,
    height: 30,
  },
};

const ResultCard = ({
  id, name, image, color, snippet, external, externalLink,
}) => {

  const cardBody = (
    <Paper style={ style.paper }>
      <div className="image-wrap" style={{ background: color }}>
        <img src={ image } alt={ name } />
      </div>
      <div className="details-wrap">

        <div className="name">
          { name }
        </div>
        <div className="snippet">
          {
          snippet.map((part, index) => (
            // using index as key is ok because the parts never move around in array
            <span className={ part.type } key={ index }>{ part.content }</span> // eslint-disable-line
          ))
        }
        </div>

      </div>
      { external && <LaunchIcon style={ style.launchIcon } /> }
    </Paper>
  );

  return (
    <div className="search-result-card">
      {
        external ?
          <ExternalLink href={ externalLink } style={ style.appLink }>
            { cardBody }
          </ExternalLink> :
          <AppLink to={`/student/topic/${id}/`} style={ style.appLink }>
            { cardBody }
          </AppLink>
      }
    </div>
  );
};

ResultCard.propTypes = {

  id: PropTypes.string.isRequired,

  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,

  external: PropTypes.bool.isRequired,
  externalLink: PropTypes.string,

  snippet: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string,
  })).isRequired,

};

ResultCard.defaultProps = {
  externalLink: '#',
};

export default ResultCard;
