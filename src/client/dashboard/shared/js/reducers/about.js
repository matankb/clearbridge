// ACTION TYPES
export const OPEN_ABOUT = 'ABOUT/OPEN_ABOUT';
export const CLOSE_ABOUT = 'ABOUT/CLOSE_ABOUT';

const defaultState = {
  open: false,
};

// REDUCER

export default function open(state = defaultState, action) {
  console.log(action);
  switch (action.type) {
    case OPEN_ABOUT:
      return { ...state, open: true };
    case CLOSE_ABOUT:
      return { ...state, open: false };
    default:
      return state;
  }
}

export function openAbout() {
  return {
    type: OPEN_ABOUT,
  };
}

export function closeAbout() {
  return {
    type: CLOSE_ABOUT,
  };
}
