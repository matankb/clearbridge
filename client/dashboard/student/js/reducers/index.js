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
      return Object.assign({}, state, {
        isFetchingTopicList: false,
        topics: action.topics.map(topic => {
          return Object.assign({}, topic, {
            isFetching: false,
            hasFull: false,
          });
        }),
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
            return Object.assign({}, topic, {
              isFetching: false,
              hasFull: true,
              blurb: action.blurb,
              sections: action.sections,
            });
          } else {
            return topic;
          }
        }),
      });

    case 'SELECT_TOPIC':
      return Object.assign({}, state, {
        selectedTopic: action.id,
      });

    case 'TOGGLE_TOPIC_PAGE':
      return Object.assign({}, state, {
        topicPageOpen: !state.topicPageOpen,
      });

    default:
      return state;
  }
}

let rootReducer = topics;

export default rootReducer;
