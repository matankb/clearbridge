import React from 'react';

const TopicPageNav = ({ sections }) => (
  <nav>
    <span>Sections</span>
    <ul>
      {
        sections.map(section => <li key={ section._id }>{ section.name }</li>)
      }
    </ul>
  </nav>
);

export default TopicPageNav;
