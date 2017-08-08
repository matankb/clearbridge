import React from 'react';
import Paper from 'material-ui/Paper';

import AppLink from '../../../../../shared/js/components/AppLink';

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
};

const ResultCard = ({ id, name, image, color, snippet }) => (
  <div className="search-result-card">
    <AppLink to={`/student/topic/${id}/`} style={ style.appLink }>

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
            snippet.map(part => (
              <span className={ part.type } key={ part.type + part.content }>{ part.content }</span>
            ))
          }
          </div>

        </div>
      </Paper>

    </AppLink>
  </div>
);

export default ResultCard;
