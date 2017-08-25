import PropTypes from 'prop-types';

const topic = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
});

const error = PropTypes.shape({
  status: PropTypes.number,
  offline: PropTypes.bool,
});

const fetch = PropTypes.shape({
  isFetching: PropTypes.bool,
  error,
});

const ask = PropTypes.shape({
  id: PropTypes.string,
  asker: PropTypes.string,
  question: PropTypes.string,
  answer: PropTypes.string,
});

export default {
  topic,
  error,
  ask,
  fetch,
};
