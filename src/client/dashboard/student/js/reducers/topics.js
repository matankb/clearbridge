import {
  REQUEST_TOPIC_LIST,
  RECEIVE_TOPIC_LIST,
  FETCH_TOPIC,
  RECEIVE_TOPIC,

  FETCH_TOPIC_LIST_ERROR,
  FETCH_TOPIC_ERROR,

  SELECT_TOPIC,
  OPEN_TOPIC_PAGE,
  CLOSE_TOPIC_PAGE,
} from '../actions/';

const defaultState = {
  selectedTopic: null,
  isFetchingTopicList: false,
  topicListError: null,
  topicPageOpen: false,
  topics: [],
};

function changeTopic(topicList, id, reducer) {
  return topicList.map(topic => {
    if (topic.id === id) {
      return reducer(topic);
    } else {
      return topic;
    }
  });
}

function topics(state = defaultState, action) {
  switch (action.type) {

    case REQUEST_TOPIC_LIST:
      return {
        ...state,
        isFetchingTopicList: true,
        topicListError: null,
      };

    case RECEIVE_TOPIC_LIST:
      return {
        ...state,
        isFetchingTopicList: false,
        topicListError: null,
        topics: action.topics.map(topic => ({
          data: {
            name: topic.name,
            color: topic.color,
            image: topic.image,
            sections: [],
            blurb: '',
          },
          error: null,
          id: topic._id,
          isFetching: false,
          hasContent: false,
        })),
      };

    case FETCH_TOPIC:
      return {
        ...state,
        topics: changeTopic(state.topics, action.id, topic => ({
          ...topic,
          error: null,
          isFetching: true,
        })),
      };

    case RECEIVE_TOPIC:
      return {
        ...state,
        topics: changeTopic(state.topics, action.id, topic => ({
          ...topic,
          isFetching: false,
          error: null,
          hasContent: true,
          data: {
            ...topic.data,
            blurb: action.blurb,
            sections: action.sections,
          },
        })),
      };

    case FETCH_TOPIC_LIST_ERROR:
      return {
        ...state,
        isFetchingTopicList: false,
        topicListError: action.error,
      };
    case FETCH_TOPIC_ERROR:
      return {
        ...state,
        topics: changeTopic(state.topics, action.id, topic => {
          return {
            ...topic,
            isFetching: false,
            error: action.error,
          };
        }),
      };

    case SELECT_TOPIC:
      return {
        ...state,
        selectedTopic: action.id,
      };

    case OPEN_TOPIC_PAGE:
      return {
        ...state,
        topicPageOpen: true,
      };
    case CLOSE_TOPIC_PAGE:
      return {
        ...state,
        topicPageOpen: false,
      };

    default:
      return state;
  }
}

export default topics;
