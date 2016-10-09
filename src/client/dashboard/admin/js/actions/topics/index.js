export const ADD_TOPIC = 'TOPICS/ADD_TOPIC';
export const SELECT_CREATION_STAGE = 'TOPICS/SELECT_CREATION_STAGE';
export const NEXT_CREATION_STAGE = 'TOPICS/NEXT_CREATION_STAGE';
export const SET_CREATION_STATUS = 'TOPICS/SET_CREATION_STATUS';
export const SET_CREATION_DATA = 'TOPICS/SET_CREATION_DATA';
export const RESET_CREATION_DATA = 'TOPICS/RESET_CREATION_DATA';
export const REQUEST_TOPICS = 'TOPICS/REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'TOPICS/RECEIVE_TOPICS';
export const SELECT_TOPIC = 'TOPICS/SELECT_TOPIC';
export const REQUEST_TOPIC_CREATION = 'TOPICs/REQUEST_TOPIC_CREATION';
export const RECEIVE_TOPIC_CREATION = 'TOPICs/RECEIVE_TOPIC_CREATION';
export const REQUEST_TOPIC_REMOVAL = 'TOPICS/REQUEST_TOPIC_REMOVAL';
export const RECEIVE_TOPIC_REMOVAL = 'TOPICS/RECEIVE_TOPIC_REMOVAL';

export function addTopic() {
  return {};
}

export function selectCreationStage(stage) {
  return {
    type: SELECT_CREATION_STAGE,
    stage,
  };
}

export function nextCreationStage() {
  return {
    type: NEXT_CREATION_STAGE,
  };
}

export function setCreationStatus(isCreating) {
  return {
    type: SET_CREATION_STATUS,
    isCreating,
  };
}

export function setCreationData(data) {
  return {
    type: SET_CREATION_DATA,
    data,
  };
}

export function resetCreationData() {
  return {
    type: RESET_CREATION_DATA,
  };
}

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

export function selectTopic(id) {
  return {
    type: SELECT_TOPIC,
    id,
  };
}

export function requestTopicCreation() {
  return {
    type: REQUEST_TOPIC_CREATION,
  };
}

export function receiveTopicCreation(topic) {
  return {
    type: RECEIVE_TOPIC_CREATION,
    topic,
  };
}

export function postTopic() {
  return function(dispatch, getState) {

    let state = getState();
    dispatch(requestTopicCreation());

    fetch('/api/topics/', {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        data: state.topics.create.data,
      }),
    })
      .then(data => data.json())
      .then(topic => dispatch(receiveTopicCreation(topic)));

  };
}

export function requestTopicRemoval(id) {
  return {
    type: REQUEST_TOPIC_REMOVAL,
    id,
  };
}

export function receiveTopicRemoval(id) {
  return {
    type: RECEIVE_TOPIC_REMOVAL,
    id,
  };
}

export function removeTopic(id) {
  return function(dispatch) {
    dispatch(requestTopicRemoval(id));
    fetch(`/api/topics/${id}/`, {
      credentials: 'same-origin',
      method: 'DELETE',
    })
    .then(() => dispatch(receiveTopicRemoval(id)));
  };
}

export * from './topic-page';
