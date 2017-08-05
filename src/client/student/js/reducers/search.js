export const REQUEST_SEARCH = 'SEARCH/REQUEST_SEARCH';
export const RECIEVE_SEARCH = 'SEARCH/RECIEVE_SEARCH';

export const REQUEST_SEARCH_ERROR = 'SEARCH/REQUEST_SEARCH_ERROR';

export const OPEN_SEARCH = 'SEARCH/OPEN_SEARCH';
export const CLOSE_SEARCH = 'SEARCH/CLOSE_SEARCH';

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
      return { ...state, isFetching: true, error: null, query: action.query, results: [] };
    case RECIEVE_SEARCH:
      return { ...state, isFetching: false, error: null, results: action.results };
    case REQUEST_SEARCH_ERROR:
      return { ...state, isFetching: false, error: action.error };
    case OPEN_SEARCH:
      return { ...state, open: true };
    case CLOSE_SEARCH:
      return { ...state, open: false };
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

export function openSearch() {
  return {
    type: OPEN_SEARCH,
  };
}
export function closeSearch() {
  return {
    type: CLOSE_SEARCH,
  };
}
