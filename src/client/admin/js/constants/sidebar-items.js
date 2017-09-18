import React from 'react';

import HomeIcon from 'material-ui/svg-icons/action/home';
import SubjectIcon from 'material-ui/svg-icons/action/subject';
import PersonIcon from 'material-ui/svg-icons/social/person';

const sidebarItems = [
  { name: 'Home', url: '/admin/', icon: <HomeIcon /> },
  { name: 'Topics', url: '/admin/topics/', icon: <SubjectIcon /> },
  { name: 'Asks', url: '/admin/asks/', icon: <PersonIcon />},
  { name: 'Users', url: '/admin/users/', icon: <PersonIcon /> },
];

export default sidebarItems;
