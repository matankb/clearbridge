import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

const AddSection = ({ handleAddClick }) => {
  return (
    <div className="add-section">
      <RaisedButton
        label="Add Section"
        primary
        onTouchTap={ handleAddClick }
      />
    </div>
  );
};

export default AddSection;
