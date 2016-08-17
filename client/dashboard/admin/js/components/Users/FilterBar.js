import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import { setVisibilityFilter } from '../../actions/users';
import { colors } from '../../../../shared/js/constants/';

const style = {
  tabs: props => {
    let styles;
    if (props.shown) {
      styles = {
        display: 'block',
      };
    } else {
      styles = {
        display: 'none',
      };
    }
    return styles;
  },
  tab: {
    backgroundColor: colors.primary.light,
  },
  ink: {
    backgroundColor: colors.accent,
  },
};

let FilterBar = props => {
  return (
    <Tabs
      style={ style.tabs(props) }
      inkBarStyle={ style.ink }
    >
      <Tab
        style={ style.tab }
        label="All"
        onActive={ () => props.setVisibilityFilter('ALL') }
      />
      <Tab
        style={ style.tab }
        label="Students"
        onActive={ () => props.setVisibilityFilter('STUDENTS') }
      />
      <Tab
        style={ style.tab }
        label="Teachers"
        onActive={ () => props.setVisibilityFilter('TEACHERS') }
      />
    </Tabs>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setVisibilityFilter: level => {
      dispatch(setVisibilityFilter(level));
    },
  };
}

FilterBar = connect(
  () => { return {}; },
  mapDispatchToProps
)(FilterBar);

export default FilterBar;
