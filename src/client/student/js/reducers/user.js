export const REQUEST_USER = 'USER/REQUEST_USER';
export const RECEIVE_USER = 'USER/RECEIVE/USER';
export const REQUEST_USER_ERROR = 'USER/REQUEST_USER_ERROR';

const defaultState = {
  user: null,
  isFetching: false,
  error: null,
};

export default function user(state = defaultState, action) {
  switch (action.type) {

    case REQUEST_USER:
      return { ...state, isFetching: true, error: null };
    case RECEIVE_USER:
      return { ...state, isFetching: false, user: action.user };
    case REQUEST_USER_ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;

  }
}

export function requestUser() {
  return {
    type: REQUEST_USER,
  };
}

export function receiveUser(recievedUser) {
  return {
    type: RECEIVE_USER,
    user: recievedUser,
  };
}

export function requestUserError(error) {
  return {
    type: REQUEST_USER_ERROR,
    error,
  };
}
