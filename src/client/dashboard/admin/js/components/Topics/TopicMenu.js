import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import AddPersonIcon from 'material-ui/svg-icons/social/person-add';
import StarBorderIcon from 'material-ui/svg-icons/toggle/star-border';
import AddToGroupIcon from 'material-ui/svg-icons/social/group-add';
import DeleteIcon from 'material-ui/svg-icons/action/delete';

const TopicCardMenu = () => {

  const menuItems = [
    <MenuItem
      primaryText="Assign Students"
      leftIcon={ <AddPersonIcon /> }
      key={ 1 }
    />,
    <MenuItem
      primaryText="Add to Group"
      leftIcon={ <AddToGroupIcon /> }
      key={ 2 }
    />,
    <MenuItem
      primaryText="Bookmark"
      leftIcon={ <StarBorderIcon /> }
      key={ 3 }
    />,
    <MenuItem
      primaryText="Remove"
      leftIcon={ <DeleteIcon /> }
      key={ 4 }
    />,
  ];

  return (
    <div className="menu">
      <IconMenu
        iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        { menuItems }
      </IconMenu>
    </div>
  );
};

export default TopicCardMenu;
