import React from 'react';
import PropTypes from 'prop-types';

import AskForm from './AskForm';
import AskList from './AskList';

import '../../../../css/ask.less';

const ASKS = [
  {
    question: 'Who reads Torah on Mondays and Thursdays?',
    answer: 'Students read Torah during Mondays and Thursday services. When it\'s not a bar or bat mitzvah service, anyone can volunteer to read.',
    asker: {
      name: 'Jonathan Doe',
    },
    id: 123,
  },
  {
    question: 'Are there more than one mincha services?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pulvinar pretium nibh id sagittis. Sed in consequat nisl. Cras ornare volutpat odio at molestie. Ut vestibulum, felis vitae laoreet cursus, est tellus hendrerit ',
    id: 456,
  },
];

const TopicPageAsk = ({ name }) => (
  <div className="ask">
    <AskForm />
    <AskList
      asks={ ASKS }
    />
  </div>
);

TopicPageAsk.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TopicPageAsk;
