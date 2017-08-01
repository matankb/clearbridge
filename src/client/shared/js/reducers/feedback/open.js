/*
Open/Close state is kept in redux store
so that multiple buttons can be used to
open or close the dialog.
*/

// ACTION TYPES
export const OPEN_FEEDBACK = 'FEEDBACK/OPEN_FEEDBACK';
export const CLOSE_FEEDBACK = 'FEEDBACK/CLOSE_FEEDBACK';

const defaultState = false;

// REDUCER

export default function open(state = defaultState, action) {
  switch (action.type) {
    case OPEN_FEEDBACK:
      return true;
    case CLOSE_FEEDBACK:
      return false;
    default:
      return state;
  }
}

export function openFeedback() {
  return {
    type: OPEN_FEEDBACK,
  };
}

export function closeFeedback() {
  return {
    type: CLOSE_FEEDBACK,
  };
}
