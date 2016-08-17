export const REQUEST_TOPICS = 'TOPICS/REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'TOPICS/RECEIVE_TOPICS';

export function requestTopics() {
  return {
    type: REQUEST_TOPICS,
  };
}

export function receiveTopics(topics) {
  return {
    type: RECEIVE_TOPICS,
    topics,
  };
}

export function fetchTopics() {
  return function(dispatch) {
    dispatch(requestTopics());
    fetch('/api/topics/?short=true', { credentials: 'same-origin' })
    .then(data => data.json())
    .then(topics => {
      dispatch(receiveTopics(topics));
    });
  };
}
