export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const FETCH_TOPIC = 'FETCH_TOPIC';

export const REQUEST_TOPIC_LIST = 'REQUEST_TOPIC_LIST';
export const RECEIVE_TOPIC_LIST = 'RECEIVE_TOPIC_LIST';

export const FETCH_TOPIC_LIST_ERROR = 'FETCH_TOPIC_LIST_ERROR';
export const FETCH_TOPIC_ERROR = 'FETCH_TOPIC_ERROR';

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const OPEN_TOPIC_PAGE = 'OPEN_TOPIC_PAGE';
export const CLOSE_TOPIC_PAGE = 'CLOSE_TOPIC_PAGE';

export function requestTopic(id) {
  return {
    type: REQUEST_TOPIC,
    id,
  };
}

export function fetchTopic(id) {
  return {
    type: FETCH_TOPIC,
    id,
  };
}

export function receiveTopic(topic) {
  return {
    type: RECEIVE_TOPIC,
    id: topic._id,
    blurb: topic.blurb,
    content: topic.content,
  };
}

export function receiveTopicList(topics) {
  return {
    type: RECEIVE_TOPIC_LIST,
    topics,
  };
}

export function requestTopicList() {
  return {
    type: REQUEST_TOPIC_LIST,
  };
}

export function fetchTopicListError(error) {
  return {
    type: FETCH_TOPIC_LIST_ERROR,
    error,
  };
}
export function fetchTopicError(id, error) {
  return {
    type: FETCH_TOPIC_ERROR,
    id,
    error,
  };
}

export function selectTopic(id) {
  return {
    type: SELECT_TOPIC,
    id,
  };
}
export function openTopicPage() {
  return {
    type: OPEN_TOPIC_PAGE,
  };
}
export function closeTopicPage() {
  return {
    type: CLOSE_TOPIC_PAGE,
  };
}
