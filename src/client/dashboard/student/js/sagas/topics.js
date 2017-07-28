import { takeEvery, put } from 'redux-saga/effects';
import fetch from 'fetch-reject';

import {
  REQUEST_TOPIC,
  REQUEST_TOPIC_LIST,
  receiveTopicList,
  receiveTopic,
} from '../actions';

import { fetchJson } from '../../../shared/js/utils';

function* fetchTopicList() {
  const topicList = yield fetchJson('/api/user/topics/');
  yield put(receiveTopicList(topicList));
}

function* fetchTopic(action) {
  const topic = yield fetchJson(`/api/topics/${action.id}`);
  yield put(receiveTopic(topic));
}

export default function* watchTopics() {
  yield takeEvery(REQUEST_TOPIC_LIST, fetchTopicList);
  yield takeEvery(REQUEST_TOPIC, fetchTopic);
}
