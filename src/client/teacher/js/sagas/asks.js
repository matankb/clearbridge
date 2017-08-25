import { takeEvery, put } from 'redux-saga/effects';

import { fetchJson, formatError } from '~/shared/js/utils/fetch';

import {
  REQUEST_ASKS,

  receiveAsks,
  requestAsksError,
} from '~/teacher/js/reducers/asks';


function* onRequestAsks() {
  try {
    const asks = yield fetchJson('/api/asks/');
    yield put(receiveAsks(asks));
  } catch (e) {
    yield put(requestAsksError(formatError(e)));
  }
}

export default function* watchAsks() {
  yield takeEvery(REQUEST_ASKS, onRequestAsks);
}
