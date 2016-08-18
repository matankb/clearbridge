import React from 'react';

import TextField from 'material-ui/TextField';

const style = {
  name: {
    fontSize: 30,
    fontWeight: 300,
  },
  blurb: {
    width: '100%',
  },
  hiddenUnderline: {
    visibility: 'hidden',
  },
  shownUnderline: {
    visibility: 'visible',
  },
};

const Info = props => {
  return (
    <div className="info">
      <TextField
        value={ props.name }
        style={ style.name }
        underlineStyle={ style.hiddenUnderline }
        underlineFocusStyle={ style.shownUnderline }
      />
      <TextField
        multiLine
        rows={ 4 }
        rowsMax={ 4 }
        style={ style.blurb }
        underlineStyle={ style.hiddenUnderline }
        underlineFocusStyle={ style.shownUnderline }
        value={ props.blurb }
      />
    </div>
  );
};

export default Info;
