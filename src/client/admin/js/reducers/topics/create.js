import {
  SELECT_CREATION_STAGE,
  NEXT_CREATION_STAGE,
  SET_CREATION_STATUS,
  SET_CREATION_DATA,
  RESET_CREATION_DATA,
  REQUEST_TOPIC_CREATION,
  RECEIVE_TOPIC_CREATION,
} from '../../actions/topics/';

const defaultState = {
  isCreating: false,
  stage: 0,
  isPutting: false,
  data: {
    name: '',
    blurb: '',
    pendingUsers: [{ name: 'Matan Kotler-Berkowitz' }], // users to be added after first section
    image: 'http://exchangedownloads.smarttech.com/public/content/e6/e6dc9c0f-2e1c-4d8a-9bc5-2dc288fc61c0/previews/medium/0001.png', // eslint ignore max-len
    color: '#e6e6e6',
  },
};


function create(state = defaultState, action) {
  switch (action.type) {
    case SELECT_CREATION_STAGE:
      return {
        ...state,
        stage: action.stage,
      };
    case NEXT_CREATION_STAGE:
      return {
        ...state,
        stage: state.stage + 1,
      };
    case SET_CREATION_STATUS:
      return {
        ...state,
        isCreating: action.isCreating,
      };
    case SET_CREATION_DATA:
      // override existing creation data,
      // e.g. name, blurb, users, etc.
      return {
        ...state,
        data: {
          ...state.data,
          ...action.data,
        },
      };
    case RESET_CREATION_DATA:
      return {
        ...state,
        data: defaultState.data,
      };
    case REQUEST_TOPIC_CREATION:
      return {
        ...state,
        isPutting: true,
      };
    case RECEIVE_TOPIC_CREATION:
      return {
        ...state,
        isPutting: false,
      };
    default:
      return state;
  }
}

export default create;
