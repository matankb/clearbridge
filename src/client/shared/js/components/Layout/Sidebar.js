import React from 'react';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import SidebarItemsPropType from './sidebar-items-prop-type';

const style = {
  list: {
    position: 'absolute',
    zIndex: 100,
    width: '15%',
    minWidth: 150,
    float: 'left',
    transition: 'left 200ms',
    backgroundColor: '#f4f4f4',
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  listItemSelected: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.0580392)',
  },
  link: {
    color: 'rgba(0, 0, 0, 0.870588)',
    textDecoration: 'none',
  },
  divider: {
    marginTop: 5,
    marginBottom: 5,
  },
};

const Sidebar = props => {

  return (
    <Drawer
      docked={ false }
      open={ props.open }
      onRequestChange={ props.onRequestChange }
    >
      {
          props.items.map((item, index) => {
            if (item === null) {
              return <Divider key={ index } style={ style.divider } />;
            } else {
              return (
                <Link
                  key={ index }
                  to={ item.url }
                  style={ style.link }
                >
                  <MenuItem
                    leftIcon={ item.icon }
                    style={
                      item.url === props.location.pathname ?
                                  style.listItemSelected :
                                  {}
                    }
                    onClick={ props.onItemClick }
                    onClick={ props.onItemClick }
                  >
                    { item.name }
                  </MenuItem>
                </Link>
              );
            }
          })
        }
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  items: SidebarItemsPropType.isRequired,
  onRequestChange: PropTypes.func.isRequired,
};

export default withRouter(Sidebar);
