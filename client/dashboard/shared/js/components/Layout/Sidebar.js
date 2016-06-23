import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import { Link } from 'react-router';

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
    height: 1,
    marginTop: 5,
    marginBottom: 5,
  },
};

const Sidebar = ({ open, items, location }) => {
  return (
    <List
      style = {{
        ...style.list,
        left: open ? '0' : '-15%', // hide sidebar if closed
      }}
    >
    {
      items.map(item => {
        if (item === null) {
          return <Divider style={ style.divider } />;
        } else {
          return (
            <Link to={ `/dashboard${item.url}` } style={ style.link }>
              <ListItem
                primaryText={ item.name }
                leftIcon={ item.icon }
                style={
                  location.pathname === `/dashboard${item.url}` ?
                  style.listItemSelected :
                  style.listItem
                }
              />
            </Link>
          );
        }
      })
    }
    </List>
  );
};

export default Sidebar;
