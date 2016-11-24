import fetch from 'fetch-reject';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { FETCH_TOPIC_LIST } from '../actions';
import { receiveTopicList } from '../reducers';

function* fetchTopicList() {
  let data = yield call(fetch, { credentials: 'same-origin' });
  put(receiveTopicList(data.json()));
}

function* watchFetchTopicList() {
  yield takeEvery(FETCH_TOPIC_LIST, fetchTopicList);
}

export default function* rootSaga() {
  yield [
    watchFetchTopicList(),
  ];
}
