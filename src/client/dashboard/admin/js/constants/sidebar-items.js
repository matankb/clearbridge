import React from 'react';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ClassIcon from 'material-ui/svg-icons/action/class';
import SubjectIcon from 'material-ui/svg-icons/action/subject';
import PersonIcon from 'material-ui/svg-icons/social/person';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import InfoIcon from 'material-ui/svg-icons/action/info';
import HelpIcon from 'material-ui/svg-icons/action/help';

const sidebarItems = [
  { name: 'Home', url: '/', icon: <HomeIcon /> },
  { name: 'Classes', url: '/classes/', icon: <ClassIcon /> },
  { name: 'Topics', url: '/topics/', icon: <SubjectIcon /> },
  { name: 'Users', url: '/users/', icon: <PersonIcon /> },
  { name: 'Settings', url: '/settings/', icon: <SettingsIcon /> },
  null, // divider
  { name: 'About', url: '/about/', icon: <InfoIcon /> },
  { name: 'Help', url: '/help/', icon: <HelpIcon /> },
];

export default sidebarItems;
