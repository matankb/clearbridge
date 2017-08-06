import React from 'react';

import Paper from 'material-ui/Paper';

const style = {
  paper: {
    display: 'flex',
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    height: 180,
    maxWidth: '80%',
    width: 700,
    cursor: 'pointer',
  },
};

const ResultCard = ({ name, image, color, snippet, onClick }) => (
  <div className="search-result-card">
    <Paper style={ style.paper } onTouchTap={ onClick }>

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
              <span className={ part.type }>{ part.content }</span>
            ))
          }
        </div>

      </div>
    </Paper>
  </div>
);

export default ResultCard;
