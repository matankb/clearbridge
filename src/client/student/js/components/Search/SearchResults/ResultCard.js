import React from 'react';

import Paper from 'material-ui/Paper';

const style = {
  paper: {
    display: 'flex',
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    height: 150,
    maxWidth: '80%',
    width: 680,
  },
};

const ResultCard = ({ name, image, color, onClick }) => (
  <div className="search-result-card">
    <Paper style={ style.paper }>
      <div className="image-wrap" style={{ background: color }}>
        <img src={ image } alt={ name } />
      </div>
      <div className="name">
        { name }
      </div>
    </Paper>
  </div>
);

export default ResultCard;
