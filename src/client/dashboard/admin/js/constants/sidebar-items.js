import React from 'react';

import HomeIcon from 'material-ui/svg-icons/action/home';
import SubjectIcon from 'material-ui/svg-icons/action/subject';
import PersonIcon from 'material-ui/svg-icons/social/person';

const sidebarItems = [
  { name: 'Home', url: '/', icon: <HomeIcon /> },
  { name: 'Topics', url: '/topics/', icon: <SubjectIcon /> },
  { name: 'Users', url: '/users/', icon: <PersonIcon /> },
];

export default sidebarItems;
