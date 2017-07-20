const defaultState = {
  selectedTopic: null,
  isFetchingTopicList: false,
  topicPageOpen: false,
  topics: [],
};

function topics(state = defaultState, action) {
  switch (action.type) {

    case 'REQUEST_TOPIC_LIST':
      return Object.assign({}, state, {
        isFetchingTopicList: true,
      });

    case 'RECEIVE_TOPIC_LIST':
      return {
        ...state,
        isFetchingTopicList: false,
        topics: action.topics.map(topic => {
          return {
            ...topic,
            isFetching: false,
            hasFull: false,
          };
        }),
      };

    case 'REQUEST_TOPIC':
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

    case 'RECEIVE_TOPIC':
      return {
        ...state,
        topics: state.topics.map(topic => {
          if (topic.id === action.id) {
            return {
              ...topic,
              isFetching: false,
              hasFull: true,
              blurb: action.blurb,
              sections: action.sections,
            };
          } else {
            return topic;
          }
        }),
      };

    case 'SELECT_TOPIC':
      return {
        ...state,
        selectedTopic: action.id,
      };

    case 'TOGGLE_TOPIC_PAGE':
      return {
        ...state,
        topicPageOpen: !state.topicPageOpen,
      };

    default:
      return state;
  }
}

export default topics;
