import { normalizeDatabaseObject } from '~/shared/js/utils/db';

import {
  REQUEST_TOPIC_LIST,
  RECEIVE_TOPIC_LIST,
  FETCH_TOPIC,
  RECEIVE_TOPIC,
  ADD_ASK,
  DELETE_ASK,

  FETCH_TOPIC_LIST_ERROR,
  FETCH_TOPIC_ERROR,
} from '../actions';

const defaultState = {
  isFetchingTopicList: true,
  topicListError: null,
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
            blurb: '',
            content: '',
            asks: [],
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
            content: action.content,
            asks: action.asks.map(ask => normalizeDatabaseObject(ask)),
          },
        })),
      };

    case ADD_ASK:
      return {
        ...state,
        topics: changeTopic(state.topics, action.topicId, topic => ({
          ...topic,
          data: {
            ...topic.data,
            asks: [...topic.data.asks, normalizeDatabaseObject(action.ask)],
          },
        })),
      };

    case DELETE_ASK:
      return {
        ...state,
        topics: changeTopic(state.topics, action.topicId, topic => ({
          ...topic,
          data: {
            ...topic.data,
            asks: topic.data.asks.filter(ask => ask._id !== action.askId),
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

    default:
      return state;
  }
}

export default topics;
