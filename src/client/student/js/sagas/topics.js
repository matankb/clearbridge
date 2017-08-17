import { takeEvery, put, select } from 'redux-saga/effects';

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

import { fetchJson, formatError } from '../../../shared/js/utils/fetch';
import { getTopicById } from '../../../shared/js/utils';

// selectors
const getTopic = id => state => getTopicById(state.topics.topics, id);

// sagas
function* onFetchTopicList() {
  try {
    const topicList = yield fetchJson('/api/user/topics/?select=name color image');
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
    const topic = yield fetchJson(`/api/topics/${action.id}/?select=blurb content`);
    topic.asks = yield fetchJson(`/api/topics/${action.id}/asks`);
    yield put(receiveTopic(topic));
  } catch (e) {
    yield put(fetchTopicError(action.id, formatError(e)));
  }
}

export default function* watchTopics() {
  yield takeEvery(REQUEST_TOPIC_LIST, onFetchTopicList);
  yield takeEvery(REQUEST_TOPIC, onRequestTopic);
  yield takeEvery(FETCH_TOPIC, onFetchTopic);
}
