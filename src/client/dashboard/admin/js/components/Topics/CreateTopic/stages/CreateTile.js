import React from 'react';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';

import { nextCreationStage, setCreationStatus, setCreationData } from '../../../../actions/topics';

const style = {
  buttonWrap: {
    textAlign: 'right',
  },
  button: {
    marginRight: 10,
  },
  textField: {
    display: 'inline-block',
    width: '70%',
  },
};

let CreateTile = props => {
  return (
    <div className="stage">
      <p>This is what students will see on their dashboard</p>
      <div className="tile-inputs">
        <label>
          Image URL:&nbsp;&nbsp;&nbsp;
          <TextField
            style={ style.textField }
            onChange={ props.handleImageChange }
          />
        </label><br />
        <label>
          Color:&nbsp;&nbsp;&nbsp;
            <input
              type="color"
              onChange={ props.handleColorChange }
            />
        </label>
      </div>
      <div
        className="tile-preview"
        style={{ backgroundColor: props.color }}
      >
        <img src={ props.image } />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    image: state.topics.create.data.image,
    color: state.topics.create.data.color,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleColorChange: e => {
      dispatch(setCreationData({ color: e.target.value }));
    },
    handleImageChange: e => {
      dispatch(setCreationData({ image: e.target.value }));
    },
    handleNextStage: () => dispatch(nextCreationStage()),
    handleCancel: () => dispatch(setCreationStatus(false)),
  };
}

CreateTile = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTile);

export default CreateTile;
