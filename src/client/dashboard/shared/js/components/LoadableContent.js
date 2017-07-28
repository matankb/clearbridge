import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  wrapper: {
    marginTop: 80,
    textAlign: 'center',
  },
};

const LoadableContent = ({ isLoading, children }) => (
  <div>
    {
      isLoading ?
        <div style={ style.wrapper }>
          <CircularProgress thickness={ 5 } />
        </div> :
        children
    }
  </div>
);

export default LoadableContent;
