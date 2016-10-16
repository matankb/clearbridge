import { RESET_FEEDBACK } from './reset';

// ACTION TYPES

export const SEND_FEEDBACK = 'FEEDBACK/SEND_FEEDBACK';
export const FEEDBACK_SENT = 'FEEDBACK/FEEDBACK_SENT';
export const FEEDBACK_SENT_ERROR = 'FEEDBACK/FEEDBACK_SENT_ERROR';

// THE REDUCER

const defaultState = {
  status: 'WAITING', // one of four 'WAITING', 'SENDING', 'SENT', 'ERROR'
};

function feedback(state = defaultState, action) {
  switch (action.type) {
    case SEND_FEEDBACK:
      return {
        ...state,
        status: 'SENDING',
      };
    case FEEDBACK_SENT:
      return {
        ...state,
        status: 'SENT',
      };
    case FEEDBACK_SENT_ERROR:
      return {
        ...state,
        status: 'ERROR',
      };
    case RESET_FEEDBACK:
      return defaultState;
    default:
      return state;
  }
}

export default feedback;

// ACTION CREATORS

export function sendFeedback(data) {
  return {
    type: SEND_FEEDBACK,
    data,
  };
}

export function feedbackSent(status) {
  return {
    type: FEEDBACK_SENT,
    status,
  };
}

export function feedbackSentError(error) {
  return {
    type: FEEDBACK_SENT_ERROR,
    error,
  };
}
