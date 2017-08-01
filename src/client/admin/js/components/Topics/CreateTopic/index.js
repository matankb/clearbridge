import React from 'react';

import Dialog from 'material-ui/Dialog';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';

import stages from './stages';
import Actions from './actions';

import '../../../../css/create-topic.less';
import { dialogTitle } from '../../../../../shared/js/constants/styles';

const style = {
  label: {
    fontSize: 16,
  },
  dialog: {
    width: '60%',
  },
  buttonWrap: {
    textAlign: 'right',
  },
  button: {
    marginRight: 10,
  },
};

let CreateTopic = props => {

  return (
    <Dialog
      open={ props.open }
      modal
      title="Create Topic"
      contentStyle={ style.dialog }
      titleStyle={ dialogTitle }
      autoScrollBodyContent
      className="create-topic"
    >
      <Stepper
        activeStep={ props.stage }
        orientation="vertical"
      >
        {
          stages.map((stage, index) => {
            return (
              <Step key={ index }>
                <StepLabel>{ stage.name }</StepLabel>
                <StepContent>
                  { stage.component }
                  <Actions stages={ stages.length } />
                </StepContent>
              </Step>
            );
          })
        }
      </Stepper>
    </Dialog>
  );
};

export default CreateTopic;
