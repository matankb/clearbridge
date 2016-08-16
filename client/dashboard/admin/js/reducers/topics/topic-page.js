import {
  TOGGLE_TOPIC_PAGE,
  SET_TOPIC_PAGE_TAB,
  SET_EDITING_SECTION,
} from '../../actions/topics/';

const defaultState = {
  open: false,
  tab: 0,
  sections: {
    editing: '',
  },
};

function topicPage(state = defaultState, action) {
  switch (action.type) {
    case TOGGLE_TOPIC_PAGE:
      return {
        ...state,
        open: !state.open,
      };
    case SET_TOPIC_PAGE_TAB:
      return {
        ...state,
        tab: action.tab,
      };
    case SET_EDITING_SECTION:
      return {
        ...state,
        sections: {
          ...state.sections,
          editing: action._id,
        },
      };
    default:
      return state;
  }
}

export default topicPage;
