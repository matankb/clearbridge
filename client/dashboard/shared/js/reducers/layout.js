const defaultState = {
  sidebar: {
    open: true,
  },
};

function layout(state = defaultState, action) {

  switch (action.type) {

    case 'TOGGLE_SIDEBAR_OPEN':
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          open: !state.sidebar.open,
        },
      };

    default:
      return state;

  }

}

export default layout;
