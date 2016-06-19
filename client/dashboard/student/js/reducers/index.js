const defaultState = {
  selectedTopic: null,
  isFetchingTopicList: null,
  topics: [],
};

function topics(state = defaultState, action) {
  switch (action.type) {

    case 'REQUEST_TOPIC_LIST':
      return Object.assign({}, state, {
        isFetchingTopicList: true,
      });

    case 'RECEIVE_TOPIC_LIST':
      return Object.assign({}, state, {
        isFetchingTopicList: false,
        topics: action.topics,
      });

    case 'REQUEST_TOPIC':
      return Object.assign({}, state, {
        topics: state.topics.map(topic => {
          if (topics.id === action.id) {
            return Object.assign({}, topic, { isFetching: true });
          } else {
            return topics;
          }
        }),
      });

    case 'RECEIVE_TOPIC':
      return Object.assign({}, state, {
        topics: state.topics.map(topic => {
          if (topic.id === action.id) {
            return Object.assign({}, topic, { isFetching: false });
          } else {
            return topic;
          }
        }),
      });

    default:
      return state;
  }
}

let rootReducer = topics;

export default rootReducer;
