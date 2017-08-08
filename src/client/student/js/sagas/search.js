import { takeEvery, select, put } from 'redux-saga/effects';

import {
  REQUEST_SEARCH,

  requestSearch,
  recieveSearch,
  requestSearchError,
} from '../reducers/search';

import { fetchJson, formatError } from '../../../shared/js/utils';

function* onRequestSearch({ query }) {
  try {
    const searchResults = yield fetchJson(`/api/search/?q=${query}`);
    yield put(recieveSearch(searchResults));
  } catch (e) {
    yield put(requestSearchError(formatError(e)));
  }
}

export default function* watchSearch() {
  yield takeEvery(REQUEST_SEARCH, onRequestSearch);
}
