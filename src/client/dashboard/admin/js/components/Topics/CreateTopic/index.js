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

import '../../../../css/create-topic.scss';
import { colors } from '../../../../../shared/js/constants/';

const style = {
  label: {
    fontSize: 16,
  },
  dialog: {
    width: '60%',
  },
  title: {
    color: 'white',
    backgroundColor: colors.primary.dark,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
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
      titleStyle={ style.title }
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
