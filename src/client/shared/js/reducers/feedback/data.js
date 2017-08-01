import { RESET_FEEDBACK } from './reset';
import { SUGGESTION } from '../../report';

export const SET_TYPE = 'FEEDBACK/SET_TYPE';
export const SET_COMMENT = 'FEEDBACK/SET_COMMENT';

const defaultState = {
  type: SUGGESTION,
  comment: '',
};

export default function data(state = defaultState, action) {
  switch (action.type) {
    case SET_TYPE:
      return { ...state, type: action.feedbackType };
    case SET_COMMENT:
      return { ...state, comment: action.comment };
    case RESET_FEEDBACK:
      return defaultState;
    default:
      return state;
  }
}

export function setType(type) {
  return {
    type: SET_TYPE,
    feedbackType: type,
  };
}

export function setComment(comment) {
  return {
    type: SET_COMMENT,
    comment,
  };
}
