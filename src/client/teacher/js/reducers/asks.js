import { normalizeDatabaseObject } from '~/shared/js/utils/db';

export const REQUEST_ASKS = 'ASKS/REQUEST_ASKS';
export const RECEIVE_ASKS = 'ASKS/RECEIVE_ASKS';

export const REQUEST_ASKS_ERROR = 'ASKS/REQUEST_ASKS_ERROR';

export const ANSWER_ASK = 'ASKS/ANSWER_ASK';
export const DELETE_ASK = 'ASKS/DELETE_ASK';

const defaultState = {
  fetch: {
    isFetching: false,
    error: null,
  },
  asks: [],
};

function modifyAsk(askList, id, reducer) {
  return askList.map(ask => {
    if (ask.id === id) {
      return reducer(ask);
    } else {
      return ask;
    }
  });
}

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

    case ANSWER_ASK:
      return {
        ...state,
        asks: modifyAsk(state.asks, action.id, ask => ({
          ...ask,
          answer: action.answer,
        })),
      };

    case DELETE_ASK:
      return {
        ...state,
        asks: state.asks.filter(ask => ask.id !== action.id),
      };

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

export function answerAsk(id, answer) {
  return {
    type: ANSWER_ASK,
    id,
    answer,
  };
}

export function deleteAsk(id) {
  return {
    type: DELETE_ASK,
    id,
  };
}
