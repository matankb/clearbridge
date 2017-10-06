import { takeEvery, put } from 'redux-saga/effects';

import { fetchJson, formatError } from '~/shared/js/utils/fetch';

import {
  REQUEST_USER,

  receiveUser,
  requestUserError,
} from '~/student/js/reducers/user';


function* onRequestUser() {
  try {
    const user = yield fetchJson('/api/user/');
    yield put(receiveUser(user));
  } catch (e) {
    yield put(requestUserError(formatError(e)));
  }
}

export default function* watchSearch() {
  yield takeEvery(REQUEST_USER, onRequestUser);
}
