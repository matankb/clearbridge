import React from 'react';

import List, { ListItem } from 'material-ui/List';

const PendingUserList = ({ users }) => {
  return (
    <List>
      {
        users.map(user => {
          return (
            <ListItem
              disableKeyboardFocus
            >
              { user.name }
            </ListItem>
          );
        })
      }
    </List>

  );
};

export default PendingUserList;
