import { takeEvery, put, select } from 'redux-saga/effects';
import fetch from 'fetch-reject';

import {
  REQUEST_TOPIC_LIST,
  REQUEST_TOPIC,
  FETCH_TOPIC,

  receiveTopicList,
  receiveTopic,
  fetchTopic,
  fetchTopicListError,
  fetchTopicError,
} from '../actions';

import { fetchJson, formatError } from '../../../shared/js/utils';

// selectors
const getTopic = id => state => state.topics.topics.find(t => t.id === id);

// sagas
function* onFetchTopicList() {
  try {
    const topicList = yield fetchJson('/api/user/topics/?short=true');
    yield put(receiveTopicList(topicList));
  } catch (e) {
    yield put(fetchTopicListError(formatError(e)));
  }
}

function* onRequestTopic(action) {
  const topic = yield select(getTopic(action.id));
  // only fetch content if it hasn't been fetched
  if (!topic.hasContent && !topic.isFetching) {
    yield put(fetchTopic(action.id));
  }
}

function* onFetchTopic(action) {
  try {
    const topic = yield fetchJson(`/api/topics/${action.id}`);
    yield put(receiveTopic(topic));
  } catch (e) {
    yield put(fetchTopicError(formatError(action.id, e)));
  }
}

export default function* watchTopics() {
  yield takeEvery(REQUEST_TOPIC_LIST, onFetchTopicList);
  yield takeEvery(REQUEST_TOPIC, onRequestTopic);
  yield takeEvery(FETCH_TOPIC, onFetchTopic);
}
