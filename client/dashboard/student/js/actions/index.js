export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export function requestTopic(topic) {
  return {
    type: REQUEST_TOPIC,
    name: topic.name,
    id: topic.id,
  };
}

export const RECEIVE_TOPIC = 'RECEIVE_TOPIC';
export function receiveTopic(topic) {
  return {
    type: RECEIVE_TOPIC,
    name: topic.name,
    id: topic.id,
  };
}

export const REQUEST_TOPIC_LIST = 'REQUEST_TOPIC_LIST';
export function requestTopicList() {
  return {
    type: REQUEST_TOPIC_LIST,
  };
}

export const RECEIVE_TOPIC_LIST = 'RECEIVE_TOPIC_LIST';
export function receiveTopicList(topics) {
  return {
    type: RECEIVE_TOPIC_LIST,
    topics,
  };
}

export const FETCH_TOPIC_LIST = 'FETCH_TOPIC_LIST';
export function fetchTopicList(user) {

  return function(dispatch) {

    dispatch(requestTopicList());

    fetch(`/api/topics?user=${user}&short=true`, { credentials: 'same-origin' })
      .then(res => res.json())
      .then(topics => dispatch(receiveTopicList(topics)));

  };

}
