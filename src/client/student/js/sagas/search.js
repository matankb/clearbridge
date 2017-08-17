import { takeEvery, put } from 'redux-saga/effects';

import { fetchJson, formatError } from '~/shared/js/utils/fetch';

import {
  REQUEST_SEARCH,

  recieveSearch,
  requestSearchError,
} from '~/student/js/reducers/search';


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
