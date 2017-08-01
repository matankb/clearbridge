import React from 'react';

const TopicPageContent = ({ content }) => (
  // Content is sanitized on server, so this is safe.
  <main dangerouslySetInnerHTML={{ __html: content }} /> // eslint-disable-line react/no-danger
);

export default TopicPageContent;
