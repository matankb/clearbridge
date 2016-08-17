import {
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  SELECT_TOPIC,
  RECEIVE_TOPIC_CREATION,
  RECEIVE_SECTION_CREATION,
  RECEIVE_SECTION_UPDATING,
} from '../../actions/topics/';

const defaultState = {
  topics: [],
  selected: null,
};

function getTopicId(state, action) {
  return action.onCurrentTopic ? state.selected : action.topicId;
}

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
    case RECEIVE_SECTION_CREATION:

      return {
        ...state,
        topics: state.topics.map(topic => {
          if (topic._id === getTopicId(state, action)) {
            return { ...topic, sections: [...topic.sections, action.section] };
          } else {
            return topic;
          }
        }),
      };
    case RECEIVE_SECTION_UPDATING:
      return {
        ...state,
        topics: state.topics.map(topic => {
          if (topic._id === getTopicId(state, action)) {
            return {
              ...topic,
              sections: topic.sections.map(section => {
                if (section._id === action.sectionId) {
                  return action.data; // full section obj. is passed to reducer
                } else {
                  return section;
                }
              }),
            };
          } else {
            return topic;
          }
        }),
      };
    default:
      return state;
  }
}

export default topicList;
