import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  wrapper: {
    marginTop: 80,
    textAlign: 'center',
  },
};


const Throbber = () => (
  <div style={ style.wrapper }>
    <CircularProgress thickness={ 5 } />
  </div>
);

export default Throbber;
