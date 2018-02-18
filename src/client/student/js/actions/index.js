export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export const FETCH_TOPIC = 'FETCH_TOPIC';

export const REQUEST_TOPIC_LIST = 'REQUEST_TOPIC_LIST';
export const RECEIVE_TOPIC_LIST = 'RECEIVE_TOPIC_LIST';

export const ADD_ASK = 'ADD_ASK';
export const DELETE_ASK = 'DELETE_ASK';
export const EDIT_ASK = 'EDIT_ASK';

export const FETCH_TOPIC_LIST_ERROR = 'FETCH_TOPIC_LIST_ERROR';
export const FETCH_TOPIC_ERROR = 'FETCH_TOPIC_ERROR';

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
    asks: topic.asks,
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

export function addAsk(topicId, ask) {
  return {
    type: ADD_ASK,
    topicId,
    ask,
  };
}

export function deleteAsk(topicId, askId) {
  return {
    type: DELETE_ASK,
    topicId,
    askId,
  };
}

export function editAsk(topicId, askId, newAsk) {
  return {
    type: EDIT_ASK,
    topicId,
    askId,
    newAsk,
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
