import { takeEvery, put } from 'redux-saga/effects';

import {
  REQUEST_SEARCH,

  requestSearch,
  recieveSearch,
  requestSearchError,
} from '../reducers/search';

import { fetchJson, formatError } from '../../../shared/js/utils';

function* onRequestSearch(action) {
  try {
    const searchResults = yield fetchJson(`/api/search/?q=${action.query}`);
    yield put(recieveSearch(searchResults));
  } catch (e) {
    yield put(requestSearchError(formatError(e)));
  }
}

export default function* watchSearch() {
  yield takeEvery(REQUEST_SEARCH, onRequestSearch);
}
