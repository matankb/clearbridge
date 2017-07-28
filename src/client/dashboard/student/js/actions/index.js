export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const FETCH_TOPIC = 'FETCH_TOPIC';

export const REQUEST_TOPIC_LIST = 'REQUEST_TOPIC_LIST';
export const RECEIVE_TOPIC_LIST = 'RECEIVE_TOPIC_LIST';

export const SELECT_TOPIC = 'SELECT_TOPIC';
export const TOGGLE_TOPIC_PAGE = 'TOGGLE_TOPIC_PAGE';

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
    sections: topic.sections,
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

export function selectTopic(id) {
  return {
    type: SELECT_TOPIC,
    id,
  };
}
export function toggleTopicPage() {
  return {
    type: TOGGLE_TOPIC_PAGE,
  };
}
