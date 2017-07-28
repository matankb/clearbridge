import {
  REQUEST_TOPIC_LIST,
  RECEIVE_TOPIC_LIST,
  FETCH_TOPIC,
  RECEIVE_TOPIC,
  SELECT_TOPIC,
  TOGGLE_TOPIC_PAGE,
} from '../actions/';

const defaultState = {
  selectedTopic: null,
  isFetchingTopicList: false,
  topicPageOpen: false,
  topics: [],
};

function topics(state = defaultState, action) {
  switch (action.type) {

    case REQUEST_TOPIC_LIST:
      return {
        ...state,
        isFetchingTopicList: true,
      };

    case RECEIVE_TOPIC_LIST:
      return {
        ...state,
        isFetchingTopicList: false,
        topics: action.topics.map(topic => {
          return {
            ...topic,
            isFetching: false,
            hasContent: false,
          };
        }),
      };

    case FETCH_TOPIC:
      return {
        ...state,
        topics: state.topics.map(topic => {
          if (topic.id === action.id) {
            return { ...topic, isFetching: true };
          } else {
            return topic;
          }
        }),
      };

    case RECEIVE_TOPIC:
      return {
        ...state,
        topics: state.topics.map(topic => {
          if (topic.id === action.id) {
            return {
              ...topic,
              isFetching: false,
              hasContent: true,
              blurb: action.blurb,
              sections: action.sections,
            };
          } else {
            return topic;
          }
        }),
      };

    case SELECT_TOPIC:
      return {
        ...state,
        selectedTopic: action.id,
      };

    case TOGGLE_TOPIC_PAGE:
      return {
        ...state,
        topicPageOpen: !state.topicPageOpen,
      };

    default:
      return state;
  }
}

export default topics;
