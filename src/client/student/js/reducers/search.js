export const REQUEST_SEARCH = 'SEARCH/REQUEST_SEARCH';
export const RECIEVE_SEARCH = 'SEARCH/RECIEVE_SEARCH';

export const REQUEST_SEARCH_ERROR = 'SEARCH/REQUEST_SEARCH_ERROR';

const defaultState = {
  query: '',
  results: [],
  isFetching: false,
  error: null,
  open: false,
};

export default function search(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_SEARCH:
      return { ...state, isFetching: true, error: null, results: [] };
    case RECIEVE_SEARCH:
      return { ...state, isFetching: false, error: null, results: action.results };
    case REQUEST_SEARCH_ERROR:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
}

export function requestSearch(query) {
  return {
    type: REQUEST_SEARCH,
    query,
  };
}
export function recieveSearch(results) {
  return {
    type: RECIEVE_SEARCH,
    results,
  };
}

export function requestSearchError(error) {
  return {
    type: REQUEST_SEARCH_ERROR,
    error,
  };
}
