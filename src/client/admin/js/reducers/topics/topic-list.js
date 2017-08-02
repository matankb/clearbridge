import {
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  SELECT_TOPIC,
  RECEIVE_TOPIC_CREATION,
} from '../../actions/topics/';

const defaultState = {
  topics: [],
  selected: null,
};

function topicList(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_TOPICS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_TOPICS:
      return {
        ...state,
        isFetching: false,
        topics: action.topics,
      };
    case SELECT_TOPIC:
      return {
        ...state,
        selected: action.id,
      };
    case RECEIVE_TOPIC_CREATION:
      return {
        ...state,
        topics: [
          ...state.topics,
          action.topic,
        ],
      };
    default:
      return state;
  }
}

export default topicList;
