import { normalizeDatabaseObject } from '~/shared/js/utils/db';

export const REQUEST_ASKS = 'ASKS/REQUEST_ASKS';
export const RECEIVE_ASKS = 'ASKS/RECEIVE_ASKS';

export const REQUEST_ASKS_ERROR = 'ASKS/REQUEST_ASKS_ERROR';

const defaultState = {
  fetch: {
    isFetching: false,
    error: null,
  },
  asks: [],
};

export default function asks(state = defaultState, action) {
  switch (action.type) {

    case REQUEST_ASKS:
      return { ...state, fetch: { ...state.fetching, isFetching: true } };

    case RECEIVE_ASKS:
      return {
        ...state,
        fetch: { ...state.fetch, isFetching: false },
        asks: action.asks.map(normalizeDatabaseObject),
      };

    case REQUEST_ASKS_ERROR:
      return { ...state, fetch: { ...state.fetching, isFetching: false, error: action.error } };

    default:
      return state;

  }
}

export function requestAsks() {
  return {
    type: REQUEST_ASKS,
  };
}

export function receiveAsks(askList) {
  return {
    type: RECEIVE_ASKS,
    asks: askList,
  };
}

export function requestAsksError(error) {
  return {
    type: REQUEST_ASKS_ERROR,
    error,
  };
}
