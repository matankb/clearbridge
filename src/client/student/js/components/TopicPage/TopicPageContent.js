import React from 'react';
import PropTypes from 'prop-types';

const TopicPageContent = ({ content }) => (
  // Content is sanitized on server, so this is safe.
  <main dangerouslySetInnerHTML={{ __html: content }} /> // eslint-disable-line react/no-danger
);

TopicPageContent.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TopicPageContent;
